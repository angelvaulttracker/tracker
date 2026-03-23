from __future__ import annotations

import csv
import io
import json
import re
import subprocess
from dataclasses import dataclass
from pathlib import Path

from PIL import Image, ImageEnhance


ROOT = Path(__file__).resolve().parents[2]
PAGES_DIR = ROOT / "extracted"
OUTPUT = ROOT / "app" / "data" / "sonnies.json"
JS_OUTPUT = ROOT / "app" / "data" / "sonnies.js"
IMAGE_OUTPUT = ROOT / "app" / "assets" / "pages"
START_PAGE = 10
SERIES_ALIASES = [
    ("unrefined", "Unrefined Regular Series"),
    ("regular", "Regular Series"),
    ("flower series", "Flower Series"),
    ("vegetable series", "Vegetable Series"),
    ("flower gift", "Flower Gift"),
    ("birthday gift", "Birthday Gift"),
    ("sky color", "Sky Color Series"),
    ("tshirt", "T-Shirt Series"),
    ("grown", "Grown Series"),
    ("hippers harvest", "Hippers Harvest Series"),
    ("hippers animal", "Hippers Animal Series"),
    ("christmas dinner", "Christmas Dinner Series"),
    ("christmas", "Christmas Series"),
    ("seasonal events", "Seasonal Events Series"),
    ("season", "Seasonal Series"),
    ("valentine", "Valentine's Day Series"),
    ("chocolate", "Chocolate Series"),
    ("easter", "Easter Series"),
    ("cherry blossom", "Cherry Blossom Series"),
    ("bugsworld", "Bugs World"),
    ("cactus", "Cactus Series"),
    ("colddrinks", "Refreshing Cold Drinks"),
    ("summer", "Summer Series"),
    ("adventure", "Adventure Series"),
    ("circus", "Circus Series"),
    ("artist collection", "Artist Collection"),
    ("fruit series", "Fruit Series"),
    ("animal bakery", "Animal Bakery"),
    ("marine", "Marine Series"),
    ("sweets", "Sweets Series"),
    ("cat life", "Cat Life Series"),
    ("enjoy the moment", "Enjoy the Moment"),
    ("kiss kiss", "Kiss Kiss Series"),
    ("message of love", "Message of Love"),
    ("minifigure charms", "Mini Figure Charms"),
    ("candy store", "Candy Store Series"),
    ("home sweet home", "Home Sweet Home"),
    ("japanese good luck", "Japanese Good Luck Series"),
    ("new york", "New York Series"),
    ("love the music", "Love the Music"),
    ("terrace", "Sonny Angel Terrace"),
    ("kewpie", "Sonny Angel Kewpie"),
    ("cafe", "Sonny Angel Cafe Series"),
    ("jeju", "Jeju Color Series"),
    ("laduree", "Laduree Patisseries Collection"),
    ("waac", "WAAC Collaboration"),
    ("dashin", "Dashin Socks Guild Collaboration"),
    ("donna wilson", "Donna Wilson Series"),
    ("anniversary", "Anniversary Series"),
    ("prototype", "Prototypes"),
    ("collaboration", "Collaboration Series"),
    ("limited edition", "Limited Editions"),
]


@dataclass
class Token:
    text: str
    left: int
    top: int
    width: int
    height: int
    conf: float


def normalized(text: str) -> str:
    text = re.sub(r"[^A-Za-z0-9.&+' -]+", "", text).strip()
    text = re.sub(r"\s+", " ", text)
    return text


def normalize_series_title(title: str, page_number: int) -> str:
    compact = re.sub(r"[^a-z0-9]+", "", title.lower())
    for needle, clean in SERIES_ALIASES:
        if needle.replace(" ", "") in compact:
            return clean
    if len(title) > 42 or not re.search(r"[A-Za-z]{4}", title):
        return f"Guide Page {page_number}"
    return title


def ocr_tsv(image_path: Path) -> list[Token]:
    out = subprocess.check_output(
        ["tesseract", str(image_path), "stdout", "--psm", "11", "tsv"],
        text=True,
    )
    rows = csv.DictReader(io.StringIO(out), delimiter="\t")
    tokens = []
    for row in rows:
        text = normalized(row["text"])
        if not text:
            continue
        conf = row["conf"].strip()
        if conf in {"", "-1"}:
            continue
        confidence = float(conf)
        if confidence < 55:
            continue
        if len(text) == 1 and not text.isalpha():
            continue
        tokens.append(
            Token(
                text=text,
                left=int(row["left"]),
                top=int(row["top"]),
                width=int(row["width"]),
                height=int(row["height"]),
                conf=confidence,
            )
        )
    return tokens


def extract_series_title(page_path: Path) -> str:
    out = subprocess.check_output(
        ["tesseract", str(page_path), "stdout", "--psm", "6"],
        text=True,
    )
    lines = [normalized(line) for line in out.splitlines()]
    lines = [line for line in lines if line]
    if not lines:
        return f"Guide Page {page_path.stem.split('-')[-1]}"
    candidates = [line for line in lines[:6] if "Series" in line or "Anniversary" in line]
    return candidates[0] if candidates else lines[0]


def prepare_label_image(page_path: Path) -> Path:
    image = Image.open(page_path)
    crop = image.crop((0, int(image.height * 0.32), image.width, image.height))
    crop = crop.resize((crop.width * 3, crop.height * 3))
    crop = ImageEnhance.Sharpness(crop).enhance(2.5)
    crop = ImageEnhance.Contrast(crop).enhance(1.5)
    target = page_path.with_name(f"{page_path.stem}-labels.png")
    crop.save(target)
    return target


def group_name_tokens(tokens: list[Token]) -> list[Token]:
    label_tokens = [
        token
        for token in tokens
        if token.top > 280 and token.top < 1750 and token.text[0].isalpha()
    ]
    label_tokens.sort(key=lambda t: (round(t.top / 60), t.left))

    groups: list[list[Token]] = []
    for token in label_tokens:
        matched = None
        for group in groups:
            anchor = group[0]
            same_row = abs(anchor.top - token.top) < 45
            close_x = token.left - (group[-1].left + group[-1].width) < 105
            if same_row and close_x:
                matched = group
                break
        if matched is None:
            groups.append([token])
        else:
            matched.append(token)

    results = []
    for group in groups:
        text = normalized(" ".join(token.text for token in group))
        if len(text) < 3:
            continue
        if any(
            banned in text.lower()
            for banned in ["limited editions", "guide book", "complete", "anniversary"]
        ):
            continue
        left = min(token.left for token in group)
        top = min(token.top for token in group)
        right = max(token.left + token.width for token in group)
        bottom = max(token.top + token.height for token in group)
        results.append(
            Token(
                text=text,
                left=left,
                top=top,
                width=right - left,
                height=bottom - top,
                conf=min(token.conf for token in group),
            )
        )
    return results


def build_entries() -> list[dict]:
    IMAGE_OUTPUT.mkdir(parents=True, exist_ok=True)
    entries = []

    for page_path in sorted(PAGES_DIR.glob("page-*.png")):
        if "labels" in page_path.stem:
            continue
        page_number = int(page_path.stem.split("-")[-1])
        if page_number < START_PAGE:
            continue

        label_image = prepare_label_image(page_path)
        title = normalize_series_title(extract_series_title(page_path), page_number)
        tokens = group_name_tokens(ocr_tsv(label_image))
        if len(tokens) < 3:
            continue

        page_copy = IMAGE_OUTPUT / page_path.name
        if not page_copy.exists():
            page_copy.write_bytes(page_path.read_bytes())

        original = Image.open(page_path)
        label_offset = int(original.height * 0.32)

        for index, token in enumerate(tokens, start=1):
            center_x = int((token.left + token.width / 2) / 3)
            label_y = int(token.top / 3) + label_offset
            crop_w = 180
            crop_h = 300
            x = max(0, center_x - crop_w // 2)
            y = max(0, label_y - crop_h - 24)
            if x + crop_w > original.width:
                x = original.width - crop_w
            if y + crop_h > original.height:
                y = original.height - crop_h

            slug = re.sub(r"[^a-z0-9]+", "-", token.text.lower()).strip("-")
            entries.append(
                {
                    "id": f"page-{page_number}-{index:02d}-{slug}",
                    "name": token.text,
                    "series": title,
                    "page": page_number,
                    "image": {
                        "page": f"./assets/pages/{page_path.name}",
                        "pageWidth": original.width,
                        "pageHeight": original.height,
                        "x": x,
                        "y": y,
                    },
                }
            )
    return entries


def main() -> None:
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    entries = build_entries()
    OUTPUT.write_text(json.dumps(entries, indent=2))
    JS_OUTPUT.write_text(f"window.SONNIES_DATA = {json.dumps(entries)};\n")
    print(f"Wrote {len(entries)} Sonny entries to {OUTPUT}")


if __name__ == "__main__":
    main()
