from __future__ import annotations

import csv
import json
import re
import urllib.request
from collections import defaultdict, deque
from concurrent.futures import ThreadPoolExecutor, as_completed
from io import BytesIO
from pathlib import Path

import numpy as np
from bs4 import BeautifulSoup, Tag
from PIL import Image


ROOT = Path(__file__).resolve().parents[2]
OUTPUT_ROOT = ROOT / "sonny_png_library_web"

CATEGORY_URLS = {
    "regulars": [
        "https://www.sonnyangel.com/products/",
        "https://www.sonnyangel.com/products/mini-figure-hippers/",
    ],
    "limited": [
        "https://www.sonnyangel.com/products/mini-figure-gift/",
        "https://www.sonnyangel.com/products/mini-figure-limited/",
        "https://www.sonnyangel.com/products/others/",
    ],
    "collaboration": [
        "https://www.sonnyangel.com/products/artist-collection/",
    ],
}

IGNORED_HEADINGS = {
    "PRODUCTS",
    "CONTENTS",
    "OFFICIAL STORE",
    "SHARE",
}

WHITE_THRESHOLD = 245
WHITE_SPREAD = 18


def bleed_transparent_edges(rgba: Image.Image, passes: int = 8) -> Image.Image:
    array = np.array(rgba.convert("RGBA"))
    rgb = array[:, :, :3].astype(np.float32)
    alpha = array[:, :, 3]
    known = alpha > 0

    # Fill transparent RGB with nearby visible colors to avoid dark halos when scaled in the browser.
    for _ in range(passes):
        changed = False
        next_rgb = rgb.copy()
        next_known = known.copy()
        for row in range(alpha.shape[0]):
            for col in range(alpha.shape[1]):
                if known[row, col]:
                    continue
                neighbors: list[np.ndarray] = []
                for next_row, next_col in (
                    (row - 1, col),
                    (row + 1, col),
                    (row, col - 1),
                    (row, col + 1),
                    (row - 1, col - 1),
                    (row - 1, col + 1),
                    (row + 1, col - 1),
                    (row + 1, col + 1),
                ):
                    if 0 <= next_row < alpha.shape[0] and 0 <= next_col < alpha.shape[1] and known[next_row, next_col]:
                        neighbors.append(rgb[next_row, next_col])
                if not neighbors:
                    continue
                next_rgb[row, col] = np.mean(neighbors, axis=0)
                next_known[row, col] = True
                changed = True
        rgb = next_rgb
        known = next_known
        if not changed:
            break

    array[:, :, :3] = np.clip(rgb, 0, 255).astype(np.uint8)
    array[alpha == 0, :3] = 255
    return Image.fromarray(array, mode="RGBA")


def slugify(text: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")


def clean_heading(text: str) -> str:
    text = " ".join(text.split())
    text = text.replace("&#8211;", "-")
    return text


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
    if "christmas" in series_l or "advent calendar" in series_l or "winter wonderland" in series_l:
        return "christmas-collections"
    if "valentine" in series_l or "kiss kiss" in series_l or "love" in series_l:
        return "valentines-collections"
    if "cherry blossom" in series_l:
        return "cherry-blossom-collections"
    if "cactus" in series_l:
        return "cactus-collections"
    if "circus" in series_l:
        return "circus-collections"
    if "adventure" in series_l or "space" in series_l:
        return "adventure-collections"
    if "bug" in series_l or "creatures" in series_l or "dog time" in series_l:
        return "animal-collections"
    if "candy" in series_l:
        return "sweets-collections"
    if "cold drinks" in series_l or "tea" in series_l:
        return "drink-collections"
    if "sky color" in series_l:
        return "sky-color-collections"
    if "cafe" in series_l or "snack" in series_l:
        return "cafe-collections"
    if "anniversary" in series_l:
        return "anniversary-collections"
    if "ladur" in series_l:
        return "collaboration-collections"
    if "artist" in series_l or "collaboration" in series_l:
        return "collaboration-collections"
    if "bobbing head" in series_l or "plush" in series_l or "pet treats" in series_l:
        return "other-collections"
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


def remove_background(image: Image.Image) -> Image.Image:
    rgba = image.convert("RGBA")
    alpha = np.array(rgba.getchannel("A"))
    # Keep native transparency when the source asset already has a proper alpha mask.
    if np.count_nonzero(alpha < 250) > 0:
        bbox = rgba.getchannel("A").getbbox()
        result = rgba.crop(bbox) if bbox else rgba
        return bleed_transparent_edges(result)

    array = np.array(rgba)
    rgb = array[:, :, :3].astype(np.int16)
    brightness = rgb.mean(axis=2)
    spread = rgb.max(axis=2) - rgb.min(axis=2)
    near_white = (brightness >= WHITE_THRESHOLD) & (spread <= WHITE_SPREAD)
    background = connected_border_background(near_white)
    array[:, :, 3] = np.where(background, 0, 255).astype(np.uint8)
    result = Image.fromarray(array)
    bbox = result.getchannel("A").getbbox()
    if bbox is None:
        return bleed_transparent_edges(result)
    return bleed_transparent_edges(result.crop(bbox))


def parse_category_page(url: str, top_folder: str) -> list[dict]:
    html = urllib.request.urlopen(url, timeout=30).read()
    soup = BeautifulSoup(html, "html.parser")
    container = soup.select_one("main") or soup.body
    current_series: str | None = None
    records: list[dict] = []

    for element in container.descendants:
        if not isinstance(element, Tag):
            continue

        if element.name == "h2":
            heading = clean_heading(element.get_text(" ", strip=True))
            if (
                heading
                and heading not in IGNORED_HEADINGS
                and "Mini Figure" not in heading
                and "ソニー エンジェル" not in heading
            ):
                current_series = heading
            continue

        if element.name != "img" or "fg-image" not in (element.get("class") or []):
            continue

        title = element.get("title")
        image_url = element.get("data-src-fg")
        anchor = element.find_parent("a")
        original_url = anchor.get("href") if anchor else None
        if not (title and image_url and current_series):
            continue

        records.append(
            {
                "top_folder": top_folder,
                "series": current_series,
                "name": title.strip(),
                "image_url": original_url or image_url,
                "page_url": url,
            }
        )

    return records


def download_image(url: str) -> Image.Image:
    request = urllib.request.Request(
        url,
        headers={
            "User-Agent": "Mozilla/5.0",
        },
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        data = response.read()
    return Image.open(BytesIO(data))


def export_one(record: dict) -> dict:
    image = download_image(record["image_url"])
    transparent = remove_background(image)
    destination = Path(record["destination"])
    destination.parent.mkdir(parents=True, exist_ok=True)
    transparent.save(destination)
    return {
        "output_path": str(destination.relative_to(ROOT)),
        "top_folder": record["top_folder"],
        "collection_folder": record["collection_folder"],
        "series": record["series"],
        "name": record["name"],
        "image_url": record["image_url"],
        "page_url": record["page_url"],
    }


def export() -> None:
    OUTPUT_ROOT.mkdir(parents=True, exist_ok=True)
    records: list[dict] = []
    for top_folder, urls in CATEGORY_URLS.items():
        for url in urls:
            records.extend(parse_category_page(url, top_folder))

    series_counts: defaultdict[tuple[str, str], int] = defaultdict(int)
    for record in records:
        series = record["series"]
        name = record["name"]
        top_folder = record["top_folder"]
        collection_folder = collection_folder_for(series)
        series_folder = slugify(series)
        series_key = (top_folder, series)

        series_counts[series_key] += 1
        index = series_counts[series_key]
        filename = f"{index:02d}__{slugify(name)}.png"
        destination = OUTPUT_ROOT / top_folder / collection_folder / series_folder / filename

        record["collection_folder"] = collection_folder
        record["destination"] = str(destination)

    manifest_rows: list[dict] = []
    with ThreadPoolExecutor(max_workers=12) as executor:
        futures = [executor.submit(export_one, record) for record in records]
        for future in as_completed(futures):
            manifest_rows.append(future.result())

    with (OUTPUT_ROOT / "manifest.csv").open("w", newline="") as handle:
        writer = csv.DictWriter(
            handle,
            fieldnames=[
                "output_path",
                "top_folder",
                "collection_folder",
                "series",
                "name",
                "image_url",
                "page_url",
            ],
        )
        writer.writeheader()
        writer.writerows(manifest_rows)

    summary = {
        "total_exports": len(manifest_rows),
        "top_level_breakdown": {
            folder: sum(1 for row in manifest_rows if row["top_folder"] == folder)
            for folder in CATEGORY_URLS
        },
        "series_count": len({row["series"] for row in manifest_rows}),
    }
    (OUTPUT_ROOT / "summary.json").write_text(json.dumps(summary, indent=2))
    print(json.dumps(summary, indent=2))


if __name__ == "__main__":
    export()
