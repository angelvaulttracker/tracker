from __future__ import annotations

import csv
import json
import re
from collections import defaultdict, deque
from pathlib import Path

import numpy as np
from PIL import Image
from skimage.measure import label, regionprops
from skimage.morphology import (
    binary_closing,
    binary_opening,
    disk,
    remove_small_holes,
    remove_small_objects,
)


ROOT = Path(__file__).resolve().parents[2]
DATA_PATH = ROOT / "app" / "data" / "sonnies.json"
OUTPUT_ROOT = ROOT / "sonny_png_library"

CROP_W = 180
CROP_H = 300
PADDING = 20
TRIM_PAD = 4
BACKGROUND_DISTANCE = 55
BACKGROUND_BRIGHTNESS = 150
MIN_COMPONENT_SIZE = 400
SKIP_PAGES = {92, 93, 94, 95}

SERIES_RENAMES = {
    "Beoxonol sodes Scosonat Series": "Seasonal Collection Series",
    "ChinoiserieSeries InKev vow": "Chinoiserie Series",
    "CreaturesSeries - . . D": "Creatures Series",
    "Lite Series Lite Series aa": "Lite Series",
}

COLLAB_SERIES = {
    "Collaboration Series",
    "WAAC Collaboration",
    "Chinoiserie Series",
    "Creatures Series",
}


def slugify(text: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")


def clean_series_name(series: str) -> str:
    return SERIES_RENAMES.get(series, series)


def top_folder_for(series: str) -> str:
    if series in COLLAB_SERIES or "collaboration" in series.lower():
        return "collaboration"
    return "regulars" if is_regular_series(series) else "limited"


def is_regular_series(series: str) -> bool:
    series_l = series.lower()
    regular_keywords = (
        "animal series",
        "marine series",
        "flower series",
        "vegetable series",
        "fruit series",
        "sweets series",
        "unrefined",
        "hippers",
    )
    return any(keyword in series_l for keyword in regular_keywords)


def collection_folder_for(series: str) -> str:
    series_l = series.lower()
    if "animal" in series_l:
        return "animal-collections"
    if "marine" in series_l:
        return "marine-collections"
    if "flower" in series_l:
        return "flower-collections"
    if "vegetable" in series_l:
        return "vegetable-collections"
    if "fruit" in series_l:
        return "fruit-collections"
    if "sweets" in series_l:
        return "sweets-collections"
    if "hippers" in series_l:
        return "hippers-collections"
    if "birthday" in series_l:
        return "birthday-collections"
    if "sky color" in series_l:
        return "sky-color-collections"
    if "crown" in series_l:
        return "crown-collections"
    if "t-shirt" in series_l:
        return "t-shirt-collections"
    if "christmas" in series_l or "winter wonderland" in series_l:
        return "christmas-collections"
    if "seasonal events" in series_l:
        return "seasonal-event-collections"
    if "seasonal" in series_l:
        return "seasonal-collections"
    if "valentine" in series_l or "kiss kiss" in series_l or "message of love" in series_l:
        return "valentines-collections"
    if "chocolate" in series_l:
        return "chocolate-collections"
    if "easter" in series_l:
        return "easter-collections"
    if "cherry blossom" in series_l:
        return "cherry-blossom-collections"
    if "cactus" in series_l:
        return "cactus-collections"
    if "cold drinks" in series_l:
        return "cold-drinks-collections"
    if "adventure" in series_l:
        return "adventure-collections"
    if "circus" in series_l:
        return "circus-collections"
    if "anniversary" in series_l:
        return "anniversary-collections"
    if "prototype" in series_l:
        return "prototype-collections"
    if "limited edition" in series_l:
        return "limited-edition-collections"
    if "lite series" in series_l:
        return "lite-collections"
    if "cafe" in series_l:
        return "cafe-collections"
    if "collaboration" in series_l or series in COLLAB_SERIES:
        return "collaboration-collections"
    if "guide page" in series_l:
        return "unknown-collections"
    return "special-collections"


def connected_border_background(mask: np.ndarray) -> np.ndarray:
    height, width = mask.shape
    background = np.zeros((height, width), dtype=bool)
    queue: deque[tuple[int, int]] = deque()

    for row in range(height):
        for col in (0, width - 1):
            if mask[row, col] and not background[row, col]:
                background[row, col] = True
                queue.append((row, col))
    for col in range(width):
        for row in (0, height - 1):
            if mask[row, col] and not background[row, col]:
                background[row, col] = True
                queue.append((row, col))

    while queue:
        row, col = queue.popleft()
        for next_row, next_col in (
            (row - 1, col),
            (row + 1, col),
            (row, col - 1),
            (row, col + 1),
        ):
            if (
                0 <= next_row < height
                and 0 <= next_col < width
                and mask[next_row, next_col]
                and not background[next_row, next_col]
            ):
                background[next_row, next_col] = True
                queue.append((next_row, next_col))

    return background


def isolate_main_component(foreground: np.ndarray) -> np.ndarray:
    labels = label(foreground)
    regions = regionprops(labels)
    if not regions:
        return foreground

    center = np.array([foreground.shape[0] / 2, foreground.shape[1] / 2])
    best_label = regions[0].label
    best_score = float("inf")

    for region in regions:
        centroid = np.array(region.centroid)
        distance_score = float(np.square(centroid - center).sum())
        score = distance_score - (region.area * 0.2)
        if score < best_score:
            best_score = score
            best_label = region.label

    return labels == best_label


def remove_background(image: Image.Image) -> Image.Image:
    rgba = image.convert("RGBA")
    array = np.array(rgba)
    rgb = array[:, :, :3].astype(np.int16)
    border = np.concatenate(
        [rgb[0, :, :], rgb[-1, :, :], rgb[:, 0, :], rgb[:, -1, :]],
        axis=0,
    )
    reference = np.median(border, axis=0)
    distance = np.sqrt(np.square(rgb - reference).sum(axis=2))
    brightness = rgb.mean(axis=2)

    likely_background = (
        (distance < BACKGROUND_DISTANCE) & (brightness > BACKGROUND_BRIGHTNESS)
    )
    border_background = connected_border_background(likely_background)

    foreground = ~border_background
    foreground = binary_closing(foreground, disk(2))
    foreground = binary_opening(foreground, disk(1))
    foreground = remove_small_holes(foreground, area_threshold=100)
    foreground = remove_small_objects(foreground, min_size=MIN_COMPONENT_SIZE)
    foreground = isolate_main_component(foreground)

    array[:, :, 3] = (foreground * 255).astype(np.uint8)
    result = Image.fromarray(array)
    bbox = result.getchannel("A").getbbox()
    if bbox is None:
        return result

    left = max(0, bbox[0] - TRIM_PAD)
    top = max(0, bbox[1] - TRIM_PAD)
    right = min(result.width, bbox[2] + TRIM_PAD)
    bottom = min(result.height, bbox[3] + TRIM_PAD)
    return result.crop((left, top, right, bottom))


def crop_source_image(entry: dict, page_cache: dict[Path, Image.Image]) -> Image.Image:
    page_rel = entry["image"]["page"].replace("./assets/", "app/assets/")
    page_path = ROOT / page_rel
    if page_path not in page_cache:
        page_cache[page_path] = Image.open(page_path).convert("RGBA")

    page = page_cache[page_path]
    x = int(entry["image"]["x"])
    y = int(entry["image"]["y"])

    left = max(0, x - PADDING)
    top = max(0, y - PADDING)
    right = min(page.width, x + CROP_W + PADDING)
    bottom = min(page.height, y + CROP_H + PADDING)
    return page.crop((left, top, right, bottom))


def filtered_entries() -> list[dict]:
    entries = json.loads(DATA_PATH.read_text())
    cleaned = []
    for entry in entries:
        if entry["page"] in SKIP_PAGES:
            continue
        series = clean_series_name(entry["series"])
        if series.startswith("Guide Page 9"):
            continue
        entry = dict(entry)
        entry["series"] = series
        cleaned.append(entry)
    return cleaned


def write_manifest(rows: list[dict]) -> None:
    manifest_path = OUTPUT_ROOT / "manifest.csv"
    with manifest_path.open("w", newline="") as handle:
        writer = csv.DictWriter(
            handle,
            fieldnames=[
                "output_path",
                "top_folder",
                "collection_folder",
                "series",
                "name",
                "page",
                "source_page_image",
            ],
        )
        writer.writeheader()
        writer.writerows(rows)


def export() -> None:
    OUTPUT_ROOT.mkdir(parents=True, exist_ok=True)
    entries = filtered_entries()
    series_counts: defaultdict[str, int] = defaultdict(int)
    page_cache: dict[Path, Image.Image] = {}
    manifest_rows: list[dict] = []

    for entry in entries:
        series = entry["series"]
        name = entry["name"]
        top_folder = top_folder_for(series)
        collection_folder = collection_folder_for(series)
        series_folder = slugify(series) or f"page-{entry['page']:03d}"

        series_counts[series] += 1
        index = series_counts[series]
        filename = f"{index:02d}__{slugify(name) or 'unknown' }__page-{entry['page']:03d}.png"

        destination = (
            OUTPUT_ROOT / top_folder / collection_folder / series_folder / filename
        )
        destination.parent.mkdir(parents=True, exist_ok=True)

        cropped = crop_source_image(entry, page_cache)
        transparent = remove_background(cropped)
        transparent.save(destination)

        manifest_rows.append(
            {
                "output_path": str(destination.relative_to(ROOT)),
                "top_folder": top_folder,
                "collection_folder": collection_folder,
                "series": series,
                "name": name,
                "page": entry["page"],
                "source_page_image": entry["image"]["page"],
            }
        )

    for page in page_cache.values():
        page.close()

    write_manifest(manifest_rows)
    summary = {
        "total_exports": len(manifest_rows),
        "top_level_breakdown": {
            "regulars": sum(1 for row in manifest_rows if row["top_folder"] == "regulars"),
            "limited": sum(1 for row in manifest_rows if row["top_folder"] == "limited"),
            "collaboration": sum(
                1 for row in manifest_rows if row["top_folder"] == "collaboration"
            ),
        },
    }
    (OUTPUT_ROOT / "summary.json").write_text(json.dumps(summary, indent=2))
    print(json.dumps(summary, indent=2))


if __name__ == "__main__":
    export()
