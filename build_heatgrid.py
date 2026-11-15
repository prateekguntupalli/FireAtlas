import argparse
import csv
import json
import os
import sys
from collections import defaultdict

YEARS = list(range(2000, 2025))  # 2000-2024
YEAR_INDEX = {y: i for i, y in enumerate(YEARS)}
NUM_YEARS = len(YEARS)

def bin_coord(val, resolution=0.1):
    """Bin a coordinate to the nearest grid cell center."""
    return round(round(val / resolution) * resolution, 1)

def extract_year(filename):
    """Extract year from a filename like '2000-11-01.csv'."""
    base = os.path.splitext(filename)[0]
    try:
        return int(base[:4])
    except (ValueError, IndexError):
        return None

def is_modis_source(source_dir):
    """Check if a source directory is MODIS (vs VIIRS)."""
    return 'MODIS' in source_dir.upper()

def process_csv(filepath, grid_total, grid_modis, grid_total_hc, grid_modis_hc, year_idx, is_modis):
    """Read a single CSV and accumulate counts (all + high-confidence)."""
    count = 0
    # Pre-resolve for speed — avoid per-row function calls on 50M rows
    _bin = bin_coord
    _float = float
    try:
        with open(filepath, 'r') as f:
            reader = csv.DictReader(f)
            if is_modis:
                for row in reader:
                    try:
                        key = (_bin(_float(row['latitude'])), _bin(_float(row['longitude'])))
                        grid_total[key][year_idx] += 1
                        grid_modis[key][year_idx] += 1
                        # MODIS: numeric confidence >= 80
                        c = row.get('confidence', '')
                        if c and int(c) >= 80:
                            grid_total_hc[key][year_idx] += 1
                            grid_modis_hc[key][year_idx] += 1
                        count += 1
                    except (ValueError, KeyError):
                        continue
            else:
                for row in reader:
                    try:
                        key = (_bin(_float(row['latitude'])), _bin(_float(row['longitude'])))
                        grid_total[key][year_idx] += 1
                        # VIIRS: categorical confidence == 'h'
                        if row.get('confidence', '') == 'h':
                            grid_total_hc[key][year_idx] += 1
                        count += 1
                    except (ValueError, KeyError):
                        continue
    except Exception as e:
        print(f"  Warning: could not read {filepath}: {e}", file=sys.stderr)
    return count

def main():
    parser = argparse.ArgumentParser(description='Build fire heatgrid from FIRMS CSVs')
    parser.add_argument('--raw-data', required=True, help='Path to raw_data directory')
    parser.add_argument('--output', required=True, help='Output JSON file path')
    parser.add_argument('--resolution', type=float, default=0.1, help='Grid resolution in degrees')
    args = parser.parse_args()

    grid_total = defaultdict(lambda: [0] * NUM_YEARS)
    grid_modis = defaultdict(lambda: [0] * NUM_YEARS)
    grid_total_hc = defaultdict(lambda: [0] * NUM_YEARS)  # high-confidence total
    grid_modis_hc = defaultdict(lambda: [0] * NUM_YEARS)  # high-confidence MODIS
    total_files = 0
    total_points = 0

    for source_dir in sorted(os.listdir(args.raw_data)):
        source_path = os.path.join(args.raw_data, source_dir)
        if not os.path.isdir(source_path):
            continue

        modis = is_modis_source(source_dir)
        print(f"Processing source: {source_dir} ({'MODIS' if modis else 'VIIRS'})")

        for region_dir in sorted(os.listdir(source_path)):
            region_path = os.path.join(source_path, region_dir)
            if not os.path.isdir(region_path):
                continue

            csv_files = sorted([f for f in os.listdir(region_path) if f.endswith('.csv')])
            print(f"  Region {region_dir}: {len(csv_files)} files")

            for i, csv_file in enumerate(csv_files):
                filepath = os.path.join(region_path, csv_file)

                if os.path.getsize(filepath) < 50:
                    continue

                year = extract_year(csv_file)
                if year is None or year not in YEAR_INDEX:
                    continue

                year_idx = YEAR_INDEX[year]
                points = process_csv(filepath, grid_total, grid_modis,
                                     grid_total_hc, grid_modis_hc,
                                     year_idx, modis)
                total_points += points
                total_files += 1

                if (i + 1) % 100 == 0:
                    print(f"    Processed {i+1}/{len(csv_files)} files ({total_points:,} total points)")

    print(f"\nDone! {total_files} files, {total_points:,} fire detections")
    print(f"Grid cells: {len(grid_total):,}")

    # Build output: [lat, lon, total, y0..y24, m0..m24, h0..h24, hm0..hm24]
    cells = []
    for (lat, lon), year_counts in grid_total.items():
        total = sum(year_counts)
        modis_counts = grid_modis.get((lat, lon), [0] * NUM_YEARS)
        hc_counts = grid_total_hc.get((lat, lon), [0] * NUM_YEARS)
        hc_modis_counts = grid_modis_hc.get((lat, lon), [0] * NUM_YEARS)
        cells.append([lat, lon, total] + year_counts + modis_counts + hc_counts + hc_modis_counts)

    cells.sort(key=lambda x: x[2], reverse=True)

    total_modis = sum(sum(grid_modis[k]) for k in grid_modis)
    total_viirs = total_points - total_modis
    total_hc = sum(sum(grid_total_hc[k]) for k in grid_total_hc)
    print(f"\nMODIS total: {total_modis:,}")
    print(f"VIIRS total: {total_viirs:,}")
    print(f"High-conf total: {total_hc:,} ({100*total_hc/total_points:.1f}%)")

    print("\nTop 5 hotspots:")
    for c in cells[:5]:
        print(f"  lat={c[0]}, lon={c[1]}: {c[2]:,} total")

    print("\nPer-year totals (total / modis / viirs / high-conf):")
    for yi, year in enumerate(YEARS):
        yt = sum(c[3 + yi] for c in cells)
        ym = sum(c[3 + NUM_YEARS + yi] for c in cells)
        yv = yt - ym
        yhc = sum(c[3 + 3*NUM_YEARS + yi] for c in cells) if len(cells[0]) > 3 + 2*NUM_YEARS else 0
        if yt > 0:
            print(f"  {year}: {yt:>10,} total | {ym:>10,} MODIS | {yv:>10,} VIIRS | {yhc:>10,} high-conf")

    output = {
        "resolution": args.resolution,
        "total_detections": total_points,
        "total_cells": len(cells),
        "years": YEARS,
        "num_years": NUM_YEARS,
        "cells": cells
    }

    os.makedirs(os.path.dirname(args.output) or '.', exist_ok=True)
    with open(args.output, 'w') as f:
        json.dump(output, f)

    file_size = os.path.getsize(args.output)
    print(f"\nOutput: {args.output} ({file_size / 1024 / 1024:.1f} MB)")

if __name__ == '__main__':
    main()
