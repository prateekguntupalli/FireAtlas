import argparse
import json
import os
import sys
import time
import gc
from pathlib import Path
from collections import defaultdict

import pandas as pd
import geopandas as gpd

SOURCE_INFO = {
    "MODIS_SP":          {"sensor": "MODIS",  "platform": "Terra/Aqua"},
    "VIIRS_SNPP_SP":     {"sensor": "VIIRS",  "platform": "Suomi NPP"},
    "VIIRS_NOAA20_NRT":  {"sensor": "VIIRS",  "platform": "NOAA-20"},
    "VIIRS_NOAA21_NRT":  {"sensor": "VIIRS",  "platform": "NOAA-21"},
}

# Only keep columns we need — saves ~60% memory
KEEP_COLS = ["latitude", "longitude", "acq_date", "confidence", "frp"]


def load_countries(geojson_path):
    """Load country boundaries once."""
    print(f"🌍 Loading country boundaries...")
    countries = gpd.read_file(geojson_path)
    if countries.crs is None:
        countries = countries.set_crs("EPSG:4326")
    else:
        countries = countries.to_crs("EPSG:4326")

    # Find name/iso columns
    name_col = None
    for col in ["ADMIN", "name", "NAME", "admin", "NAME_LONG"]:
        if col in countries.columns:
            name_col = col
            break
    iso_col = None
    for col in ["ISO_A3", "iso_a3", "ISO3", "iso3"]:
        if col in countries.columns:
            iso_col = col
            break

    if name_col is None:
        name_col = countries.columns[0]

    print(f"  {len(countries)} countries loaded (name: '{name_col}', iso: '{iso_col}')")

    # Keep only what we need
    keep = [name_col, "geometry"]
    if iso_col:
        keep.insert(1, iso_col)
    countries = countries[keep]

    return countries, name_col, iso_col


def normalize_confidence(series):
    """Normalize confidence to 0-100."""
    numeric = pd.to_numeric(series, errors="coerce")
    mask = numeric.isna()
    if mask.any():
        viirs_map = {"l": 30, "low": 30, "n": 60, "nominal": 60, "h": 90, "high": 90}
        numeric[mask] = series[mask].astype(str).str.strip().str.lower().map(viirs_map).fillna(50)
    return numeric.astype(float)


def process_region(source_name, region_dir, countries, name_col, iso_col):
    """Process one source/region folder — load CSVs, spatial join, aggregate.
    Returns a list of dicts: [{country, iso, date, source, sensor, count, avg_frp, high_conf}]
    """
    csv_files = sorted(region_dir.glob("*.csv"))
    if not csv_files:
        return []

    region_name = region_dir.name
    sensor = SOURCE_INFO[source_name]["sensor"]
    print(f"\n  📂 {source_name}/{region_name}: {len(csv_files)} files")

    # Load CSVs in batches, keeping only needed columns
    frames = []
    total_rows = 0
    for csv_file in csv_files:
        try:
            df = pd.read_csv(csv_file, usecols=lambda c: c in KEEP_COLS or c in ["latitude", "longitude", "acq_date", "confidence", "frp"], low_memory=False)
            if len(df) > 0:
                # Only keep the columns we need
                available = [c for c in KEEP_COLS if c in df.columns]
                df = df[available]
                frames.append(df)
                total_rows += len(df)
        except Exception as e:
            pass  # Skip bad files silently

    if not frames:
        print(f"    ⚠ No data")
        return []

    df = pd.concat(frames, ignore_index=True)
    del frames
    gc.collect()
    print(f"    {total_rows:,} detections loaded")

    if total_rows == 0:
        return []

    # Normalize confidence
    df["conf_normalized"] = normalize_confidence(df["confidence"])
    df.drop(columns=["confidence"], inplace=True)

    # Spatial join in chunks
    chunk_size = 250_000  # Smaller chunks for 8GB RAM
    results = []
    t0 = time.time()

    for i in range(0, len(df), chunk_size):
        chunk = df.iloc[i:i+chunk_size]
        geometry = gpd.points_from_xy(chunk["longitude"], chunk["latitude"])
        fire_gdf = gpd.GeoDataFrame(chunk, geometry=geometry, crs="EPSG:4326")

        joined = gpd.sjoin(fire_gdf, countries, how="left", predicate="within")

        # Drop geometry immediately to free memory
        joined = pd.DataFrame(joined.drop(columns=["geometry"]))
        results.append(joined)

        done = min(i + chunk_size, len(df))
        elapsed = time.time() - t0
        print(f"    [{done:,}/{len(df):,}] {elapsed:.1f}s", flush=True)

        del fire_gdf, joined
        gc.collect()

    result = pd.concat(results, ignore_index=True)
    del results, df
    gc.collect()

    # Drop unmatched
    result = result.dropna(subset=[name_col])

    # Aggregate: per country, per date
    agg_rows = []
    for (country, date), grp in result.groupby([name_col, "acq_date"]):
        iso = grp[iso_col].iloc[0] if iso_col and iso_col in grp.columns else "UNK"
        agg_rows.append({
            "country": str(country),
            "iso": str(iso),
            "date": str(date),
            "source": source_name,
            "sensor": sensor,
            "count": int(len(grp)),
            "avg_frp": round(float(grp["frp"].mean()), 2) if "frp" in grp.columns else 0,
            "max_frp": round(float(grp["frp"].max()), 2) if "frp" in grp.columns else 0,
            "high_conf": int((grp["conf_normalized"] >= 70).sum()),
        })

    del result
    gc.collect()

    elapsed = time.time() - t0
    print(f"    ✅ Done: {len(agg_rows):,} country-day records in {elapsed:.1f}s")
    return agg_rows


def export_data(all_records, output_dir):
    """Build per-country JSON files from aggregated records."""
    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)

    print(f"\n📊 Building country files...")

    # Group by country
    by_country = defaultdict(list)
    for rec in all_records:
        by_country[(rec["country"], rec["iso"])].append(rec)

    harmonization = {}
    countries_summary = []

    for (country, iso), records in sorted(by_country.items()):
        country_slug = country.lower().replace(" ", "_").replace("'", "")

        # Build daily dict
        daily = {}
        for r in records:
            d = r["date"]
            if d not in daily:
                daily[d] = {}
            daily[d][r["source"]] = {
                "count": r["count"],
                "avg_frp": r["avg_frp"],
                "max_frp": r["max_frp"],
                "high_conf": r["high_conf"],
            }

        # Monthly aggregation
        monthly = defaultdict(lambda: defaultdict(lambda: {"count": 0, "frp_sum": 0, "frp_n": 0}))
        for r in records:
            month = r["date"][:7]  # YYYY-MM
            s = r["sensor"]
            monthly[month][s]["count"] += r["count"]
            monthly[month][s]["frp_sum"] += r["avg_frp"] * r["count"]
            monthly[month][s]["frp_n"] += r["count"]

        monthly_dict = {}
        for month, sensors in monthly.items():
            monthly_dict[month] = {}
            for s, vals in sensors.items():
                monthly_dict[month][s] = {
                    "count": vals["count"],
                    "avg_frp": round(vals["frp_sum"] / vals["frp_n"], 2) if vals["frp_n"] > 0 else 0,
                }

        # Yearly aggregation
        yearly = defaultdict(lambda: defaultdict(int))
        for r in records:
            yr = r["date"][:4]
            yearly[yr][r["sensor"]] += r["count"]
        yearly_dict = {yr: dict(sensors) for yr, sensors in yearly.items()}

        # Harmonization: overall VIIRS/MODIS ratio across overlap period
        h = None
        total_modis_overlap = 0
        total_viirs_overlap = 0
        overlap_months = 0
        for month, sensors in monthly_dict.items():
            if "MODIS" in sensors and "VIIRS" in sensors:
                mc = sensors["MODIS"]["count"]
                vc = sensors["VIIRS"]["count"]
                if mc > 0 and vc > 0:
                    total_modis_overlap += mc
                    total_viirs_overlap += vc
                    overlap_months += 1

        if overlap_months >= 6 and total_modis_overlap > 0:
            ratio = total_viirs_overlap / total_modis_overlap
            h = {
                "viirs_modis_ratio": round(ratio, 4),
                "overlap_months": overlap_months,
            }
            harmonization[country] = h

        total = sum(r["count"] for r in records)
        dates = [r["date"] for r in records]

        country_data = {
            "country": country,
            "iso": iso,
            "daily": daily,
            "monthly": monthly_dict,
            "yearly": yearly_dict,
            "harmonization": h,
            "date_range": {"start": min(dates), "end": max(dates)},
            "total_detections": total,
        }

        filepath = output_path / f"{country_slug}.json"
        with open(filepath, "w") as f:
            json.dump(country_data, f)

        countries_summary.append({
            "country": country,
            "iso": iso,
            "slug": country_slug,
            "total_detections": total,
            "date_range": country_data["date_range"],
            "has_harmonization": h is not None,
            "sources": list(set(r["source"] for r in records)),
        })

        print(f"    ✅ {country}: {total:,} detections")

    countries_summary.sort(key=lambda x: x["total_detections"], reverse=True)

    summary = {
        "generated_at": pd.Timestamp.now().isoformat(),
        "total_countries": len(countries_summary),
        "total_detections": sum(c["total_detections"] for c in countries_summary),
        "sources": ["MODIS_SP", "VIIRS_SNPP_SP"],
        "harmonization_ratios": harmonization,
        "countries": countries_summary,
    }

    with open(output_path / "summary.json", "w") as f:
        json.dump(summary, f, indent=2)

    print(f"\n✅ Exported {len(countries_summary)} country files + summary.json")
    print(f"   Total detections: {summary['total_detections']:,}")

    print(f"\n🔥 Top 5 countries:")
    for c in countries_summary[:5]:
        h = harmonization.get(c["country"])
        ratio = f" (VIIRS/MODIS ratio: {h['viirs_modis_ratio']})" if h else ""
        print(f"   {c['country']}: {c['total_detections']:,}{ratio}")


def main():
    parser = argparse.ArgumentParser(description="FireAtlas FIRMS Parser v2 (memory-efficient)")
    parser.add_argument("--raw-data", default="./raw_data")
    parser.add_argument("--geojson", default="./countries.geojson")
    parser.add_argument("--output", default="./processed_data")
    args = parser.parse_args()

    print("🔥 FireAtlas FIRMS Parser v2 (memory-efficient)")
    print("=" * 50)

    if not Path(args.raw_data).exists():
        print(f"❌ raw_data not found: {args.raw_data}")
        sys.exit(1)
    if not Path(args.geojson).exists():
        print(f"❌ GeoJSON not found: {args.geojson}")
        sys.exit(1)

    # Load countries once
    countries, name_col, iso_col = load_countries(args.geojson)

    # Process each source/region one at a time
    all_records = []
    raw_path = Path(args.raw_data)

    for source_dir in sorted(raw_path.iterdir()):
        if not source_dir.is_dir() or source_dir.name not in SOURCE_INFO:
            continue

        for region_dir in sorted(source_dir.iterdir()):
            if not region_dir.is_dir():
                continue

            records = process_region(source_dir.name, region_dir, countries, name_col, iso_col)
            all_records.extend(records)
            gc.collect()

    if not all_records:
        print("❌ No data processed!")
        sys.exit(1)

    print(f"\n📊 Total: {len(all_records):,} country-day records across all sources")

    # Export
    export_data(all_records, args.output)
    print("\n🎉 Done! Dashboard data is ready.")


if __name__ == "__main__":
    main()