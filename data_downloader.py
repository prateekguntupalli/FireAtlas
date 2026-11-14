import os
import sys
import time
import ssl
import urllib.request
import urllib.error
from datetime import datetime, timedelta

# Bypass SSL verification (FIRMS cert chain issue)
SSL_CTX = ssl.create_default_context()
SSL_CTX.check_hostname = False
SSL_CTX.verify_mode = ssl.CERT_NONE

MAP_KEY = "3239081b0a89816bb9b3351cffa69820"
BASE_URL = "https://firms.modaps.eosdis.nasa.gov/api/area/csv"

# ── Sources and date ranges ──────────────────────────────────
SOURCES = {
    "MODIS_SP": {
        "start": datetime(2000, 11, 1),
        "end": datetime(2024, 12, 31),
        "label": "MODIS (Standard)"
    },
    "VIIRS_SNPP_SP": {
        "start": datetime(2012, 1, 20),
        "end": datetime(2024, 12, 31),
        "label": "VIIRS S-NPP (Standard)"
    },
    "VIIRS_NOAA20_NRT": {
        "start": datetime(2020, 1, 1),
        "end": datetime(2024, 12, 31),
        "label": "VIIRS NOAA-20"
    },
    "VIIRS_NOAA21_NRT": {
        "start": datetime(2023, 3, 1),
        "end": datetime(2024, 12, 31),
        "label": "VIIRS NOAA-21"
    },
}

# ── World regions as bounding boxes ──────────────────────────
# Split the world into manageable regions to avoid massive responses.
# Format: "west,south,east,north"
REGIONS = {
    # South America (split into 2 — huge fire activity)
    "SAM_N": {"bbox": "-82,-5,-34,15", "label": "South America North"},
    "SAM_S": {"bbox": "-82,-60,-34,-5", "label": "South America South"},
    # Central America & Caribbean
    "CAM": {"bbox": "-120,5,-60,35", "label": "Central America & Caribbean"},
    # North America
    "NAM_W": {"bbox": "-170,25,-100,72", "label": "North America West"},
    "NAM_E": {"bbox": "-100,25,-50,72", "label": "North America East"},
    # Europe
    "EUR_W": {"bbox": "-15,35,20,72", "label": "Europe West"},
    "EUR_E": {"bbox": "20,35,50,72", "label": "Europe East"},
    # Africa (split into 3 — massive fire activity)
    "AFR_N": {"bbox": "-20,5,55,38", "label": "Africa North"},
    "AFR_S": {"bbox": "10,-35,55,5", "label": "Africa South"},
    "AFR_W": {"bbox": "-20,-10,10,5", "label": "Africa West"},
    # Middle East
    "MDE": {"bbox": "25,10,65,45", "label": "Middle East"},
    # Central Asia & Russia
    "RUS_W": {"bbox": "30,45,90,75", "label": "Russia West"},
    "RUS_E": {"bbox": "90,45,180,75", "label": "Russia East"},
    # South Asia
    "SAS": {"bbox": "60,5,100,40", "label": "South Asia"},
    # Southeast Asia
    "SEA": {"bbox": "90,-12,140,25", "label": "Southeast Asia"},
    # East Asia
    "EAS": {"bbox": "100,18,150,55", "label": "East Asia"},
    # Oceania
    "OCE": {"bbox": "110,-50,180,-10", "label": "Oceania"},
}

CHUNK_DAYS = 5  # API max is 5 for area queries
OUTPUT_DIR = "raw_data"
DELAY = 0.2  # seconds between requests

transaction_count = 0
window_start = time.time()


def rate_limit():
    global transaction_count, window_start
    elapsed = time.time() - window_start
    if elapsed > 600:
        transaction_count = 0
        window_start = time.time()
        return
    if transaction_count >= 4000:
        wait_time = 600 - elapsed + 5
        print(f"\n⏳ Rate limit approaching. Waiting {wait_time:.0f}s...")
        time.sleep(wait_time)
        transaction_count = 0
        window_start = time.time()


def download_chunk(source, bbox, date_str, day_range, output_path):
    global transaction_count

    url = f"{BASE_URL}/{MAP_KEY}/{source}/{bbox}/{day_range}/{date_str}"

    try:
        rate_limit()
        req = urllib.request.Request(url)
        req.add_header('User-Agent', 'FireAtlas-Hackathon/1.0')

        with urllib.request.urlopen(req, timeout=300, context=SSL_CTX) as response:
            data = response.read().decode('utf-8', errors='replace')

        transaction_count += day_range

        # Check for errors
        if len(data) < 500 and ('error' in data.lower() or 'invalid' in data.lower()):
            print(f" ERR: {data.strip()[:100]}")
            return 0

        lines = data.strip().split('\n')
        num_records = len(lines) - 1

        if num_records <= 0:
            # Write header-only marker so we know we tried
            with open(output_path, 'w') as f:
                f.write("NO_DATA")
            return 0

        with open(output_path, 'w') as f:
            f.write(data)

        return num_records

    except urllib.error.HTTPError as e:
        if e.code == 429:
            print(f"\n⏳ Rate limited (429). Waiting 120s...")
            time.sleep(120)
            transaction_count = 0
            window_start = time.time()
            return download_chunk(source, bbox, date_str, day_range, output_path)
        body = ""
        try:
            body = e.read().decode('utf-8', errors='replace')[:200]
        except:
            pass
        print(f" HTTP {e.code}: {body}")
        return -1
    except Exception as e:
        print(f" Error: {e}")
        return -1


def download_region_source(source_key, source_config, region_key, region_config):
    folder = os.path.join(OUTPUT_DIR, source_key, region_key)
    os.makedirs(folder, exist_ok=True)

    bbox = region_config["bbox"]
    start = source_config["start"]
    end = source_config["end"]
    current = start
    total_records = 0
    chunks_done = 0
    errors = 0

    total_days = (end - start).days
    total_chunks = (total_days // CHUNK_DAYS) + 1

    while current <= end:
        remaining = (end - current).days + 1
        day_range = min(CHUNK_DAYS, remaining)
        date_str = current.strftime("%Y-%m-%d")

        filename = f"{date_str}.csv"
        output_path = os.path.join(folder, filename)

        # Skip if already downloaded (but not empty markers from failed runs)
        if os.path.exists(output_path):
            with open(output_path, 'r') as f:
                first = f.read(10)
            if first and first != "NO_DATA":
                current += timedelta(days=day_range)
                chunks_done += 1
                continue

        chunks_done += 1
        pct = (chunks_done / total_chunks) * 100
        print(f"\r  [{pct:5.1f}%] {region_key} {source_key} {date_str}", end="", flush=True)

        result = download_chunk(source_key, bbox, date_str, day_range, output_path)

        if result < 0:
            errors += 1
            if errors > 10:
                print(f"\n  Too many errors for {region_key}/{source_key}, skipping rest")
                return total_records, errors
        else:
            total_records += result

        current += timedelta(days=day_range)
        time.sleep(DELAY)

    print(f"\r  ✓ {region_key} {source_key}: {total_records:,} detections ({chunks_done} chunks, {errors} errors)     ")
    return total_records, errors


def main():
    regions = dict(REGIONS)
    sources = dict(SOURCES)

    # Parse args
    if len(sys.argv) > 1:
        i = 1
        while i < len(sys.argv):
            if sys.argv[i] == "--region" and i + 1 < len(sys.argv):
                key = sys.argv[i + 1].upper()
                if key in REGIONS:
                    regions = {key: REGIONS[key]}
                else:
                    print(f"Unknown region: {key}")
                    print(f"Available: {', '.join(REGIONS.keys())}")
                    return
                i += 2
            elif sys.argv[i] == "--source" and i + 1 < len(sys.argv):
                key = sys.argv[i + 1].upper()
                if key in SOURCES:
                    sources = {key: SOURCES[key]}
                else:
                    print(f"Unknown source: {key}")
                    print(f"Available: {', '.join(SOURCES.keys())}")
                    return
                i += 2
            elif sys.argv[i] == "--help":
                print("Usage:")
                print("  python download_firms.py                          # All regions + sensors")
                print("  python download_firms.py --region SAM_N           # One region")
                print("  python download_firms.py --source MODIS_SP        # One sensor")
                print("  python download_firms.py --region SAM_S --source VIIRS_SNPP_SP")
                print()
                print("Regions:", ", ".join(REGIONS.keys()))
                print("Sources:", ", ".join(SOURCES.keys()))
                return
            else:
                i += 1

    print("=" * 60)
    print("FireAtlas — FIRMS Data Downloader")
    print("=" * 60)
    print(f"Regions: {len(regions)}")
    print(f"Sources: {len(sources)}")
    print(f"Output: {OUTPUT_DIR}/")
    print()

    total_requests = 0
    for s in sources.values():
        days = (s["end"] - s["start"]).days
        chunks = (days // CHUNK_DAYS) + 1
        total_requests += chunks * len(regions)

    est_minutes = total_requests * DELAY / 60
    print(f"Estimated requests: ~{total_requests:,}")
    print(f"Estimated time: ~{est_minutes:.0f} minutes ({est_minutes / 60:.1f} hours)")
    print()

    for key, cfg in sources.items():
        days = (cfg["end"] - cfg["start"]).days
        print(f"  {cfg['label']}: {cfg['start'].strftime('%Y-%m-%d')} → {cfg['end'].strftime('%Y-%m-%d')} ({days} days)")
    print()

    for key, cfg in regions.items():
        print(f"  {key}: {cfg['label']} [{cfg['bbox']}]")
    print()

    input("Press Enter to start (Ctrl+C to cancel)... ")

    os.makedirs(OUTPUT_DIR, exist_ok=True)
    start_time = time.time()
    grand_total = 0

    for ri, (region_key, region_config) in enumerate(regions.items()):
        print(f"\n[{ri + 1}/{len(regions)}] === {region_config['label']} ===")
        for source_key, source_config in sources.items():
            records, _ = download_region_source(source_key, source_config, region_key, region_config)
            grand_total += records

    elapsed = time.time() - start_time
    print(f"\n{'=' * 60}")
    print(f"Done! {grand_total:,} total detections downloaded")
    print(f"Time: {elapsed / 60:.1f} minutes")
    print(f"Data: {OUTPUT_DIR}/")
    print(f"{'=' * 60}")


if __name__ == "__main__":
    main()