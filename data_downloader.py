
import os
import sys
import ssl
import time
import urllib.request
import urllib.error
from datetime import datetime, timedelta
from concurrent.futures import ThreadPoolExecutor, as_completed
import threading

SSL_CTX = ssl.create_default_context()
SSL_CTX.check_hostname = False
SSL_CTX.verify_mode = ssl.CERT_NONE

MAP_KEY = "4f1b8a713ade0187ff306cc0af756769"
BASE_URL = "https://firms.modaps.eosdis.nasa.gov/api/area/csv"

THREADS = 40
CHUNK_DAYS = 5

SOURCES = {
    "MODIS_SP": {
        "start": datetime(2000, 11, 1),
        "end": datetime(2024, 12, 31),
        "label": "MODIS (Standard)",
    },
    "VIIRS_SNPP_SP": {
        "start": datetime(2012, 1, 20),
        "end": datetime(2024, 12, 31),
        "label": "VIIRS S-NPP (Standard)",
    },
}

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

OUTPUT_DIR = "raw_data"

lock = threading.Lock()
completed_count = 0
total_records = 0
error_count = 0
skipped_count = 0


def download_chunk(source, bbox, date_str, day_range, output_path, region_key, total_chunks):
    global completed_count, total_records, error_count, skipped_count

    url = f"{BASE_URL}/{MAP_KEY}/{source}/{bbox}/{day_range}/{date_str}"

    try:
        req = urllib.request.Request(url)
        req.add_header('User-Agent', 'FireAtlas-Hackathon/1.0')

        with urllib.request.urlopen(req, timeout=300, context=SSL_CTX) as response:
            data = response.read().decode('utf-8', errors='replace')

        if len(data) < 500 and ('error' in data.lower() or 'invalid' in data.lower()):
            with lock:
                error_count += 1
                completed_count += 1
                pct = (completed_count / total_chunks) * 100
            print(f"\r  [{pct:5.1f}%] {region_key} {source} {date_str} ERR: {data.strip()[:80]}", flush=True)
            return

        lines = data.strip().split('\n')
        num_records = len(lines) - 1

        if num_records <= 0:
            with open(output_path, 'w') as f:
                f.write("NO_DATA")
        else:
            with open(output_path, 'w') as f:
                f.write(data)

        with lock:
            completed_count += 1
            total_records += max(0, num_records)
            pct = (completed_count / total_chunks) * 100
        print(f"\r  [{pct:5.1f}%] {region_key} {source} {date_str} — {max(0, num_records):,} detections", end="", flush=True)

    except urllib.error.HTTPError as e:
        body = ""
        try:
            body = e.read().decode('utf-8', errors='replace')[:200]
        except:
            pass
        with lock:
            error_count += 1
            completed_count += 1
        print(f"\n  HTTP {e.code}: {region_key} {source} {date_str} — {body[:80]}", flush=True)

    except Exception as e:
        with lock:
            error_count += 1
            completed_count += 1
        print(f"\n  Error: {region_key} {source} {date_str} — {e}", flush=True)


def main():
    global completed_count, total_records, error_count, skipped_count

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
                print("  python3 fast_downloader.py                          # All regions + sensors")
                print("  python3 fast_downloader.py --region SAM_N           # One region")
                print("  python3 fast_downloader.py --source MODIS_SP        # One sensor")
                print()
                print("Regions:", ", ".join(REGIONS.keys()))
                print("Sources:", ", ".join(SOURCES.keys()))
                return
            else:
                i += 1

    print("=" * 60)
    print("FireAtlas — Fast FIRMS Downloader (40 threads)")
    print("=" * 60)
    print(f"Regions: {len(regions)}")
    print(f"Sources: {len(sources)}")
    print(f"Output: {OUTPUT_DIR}/")
    print()

    for key, cfg in sources.items():
        days = (cfg["end"] - cfg["start"]).days
        print(f"  {cfg['label']}: {cfg['start'].strftime('%Y-%m-%d')} -> {cfg['end'].strftime('%Y-%m-%d')} ({days} days)")
    print()

    for key, cfg in regions.items():
        print(f"  {key}: {cfg['label']} [{cfg['bbox']}]")
    print()

    input("Press Enter to start (Ctrl+C to cancel)... ")

    os.makedirs(OUTPUT_DIR, exist_ok=True)
    start_time = time.time()
    region_num = 0

    try:
        for region_key, region_config in regions.items():
            region_num += 1
            bbox = region_config["bbox"]
            label = region_config["label"]

            # Build tasks for THIS region only
            region_tasks = []
            region_skipped = 0
            for source_key, source_config in sources.items():
                current = source_config["start"]
                end = source_config["end"]
                while current <= end:
                    remaining = (end - current).days + 1
                    day_range = min(CHUNK_DAYS, remaining)
                    date_str = current.strftime("%Y-%m-%d")

                    folder = os.path.join(OUTPUT_DIR, source_key, region_key)
                    output_path = os.path.join(folder, f"{date_str}.csv")

                    skip = False
                    if os.path.exists(output_path):
                        try:
                            if os.path.getsize(output_path) > 10:
                                with open(output_path, 'r') as f:
                                    first = f.read(10)
                                if first and first != "NO_DATA":
                                    skip = True
                                    region_skipped += 1
                                    skipped_count += 1
                        except:
                            pass

                    if not skip:
                        os.makedirs(folder, exist_ok=True)
                        region_tasks.append((source_key, bbox, date_str, day_range, output_path, region_key))

                    current += timedelta(days=day_range)

            total_for_region = len(region_tasks) + region_skipped
            print(f"\n[{region_num}/{len(regions)}] === {label} ({region_key}) === {len(region_tasks)} to download, {region_skipped} skipped")

            if len(region_tasks) == 0:
                print(f"  ✓ Already complete!")
                continue

            region_start = completed_count
            region_total = len(region_tasks)

            with ThreadPoolExecutor(max_workers=THREADS) as pool:
                futures = []
                for task in region_tasks:
                    source_key, bbox, date_str, day_range, output_path, rk = task
                    futures.append(
                        pool.submit(download_chunk, source_key, bbox, date_str, day_range, output_path, rk, region_total)
                    )

                for f in as_completed(futures):
                    pass

            region_done = completed_count - region_start
            print(f"\n  ✓ {label} done — {region_done} chunks downloaded")

    except KeyboardInterrupt:
        print(f"\n\nStopped by user.")

    elapsed = time.time() - start_time
    print(f"\n{'=' * 60}")
    print(f"Done! {total_records:,} total detections downloaded")
    print(f"New chunks downloaded: {completed_count}")
    print(f"Previously skipped: {skipped_count:,}")
    print(f"Errors: {error_count}")
    print(f"Time: {elapsed / 60:.1f} minutes")
    print(f"Data: {OUTPUT_DIR}/")
    print(f"{'=' * 60}")
    if error_count > 0:
        print(f"\nGot errors? Wait ~10 min and rerun — it skips completed files.")


if __name__ == "__main__":
    main()