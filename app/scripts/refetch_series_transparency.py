from __future__ import annotations

import csv
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
MANIFEST_PATH = ROOT / "sonny_png_library" / "manifest.csv"
sys.path.insert(0, str(ROOT / "app" / "scripts"))

from export_official_web_sonnies import download_image, remove_background

DEFAULT_TARGET_SERIES = {
    "Winter Wonderland(2023)",
    "Christmas Presents from Sonny Angel (2020)",
}


def main() -> None:
    target_series = set(sys.argv[1:]) or DEFAULT_TARGET_SERIES
    rows = list(csv.DictReader(MANIFEST_PATH.open()))
    updated = 0
    for row in rows:
        if row["series"] not in target_series:
            continue
        destination = ROOT / row["output_path"].replace("sonny_png_library_web/", "sonny_png_library/")
        destination.parent.mkdir(parents=True, exist_ok=True)
        image = download_image(row["image_url"])
        cleaned = remove_background(image)
        cleaned.save(destination)
        updated += 1
        print(f"updated {destination}")
    print(f"rewrote {updated} files")


if __name__ == "__main__":
    main()
