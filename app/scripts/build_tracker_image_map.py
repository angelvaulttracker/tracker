from __future__ import annotations

import csv
import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
SONNIES_PATH = ROOT / "app" / "data" / "sonnies.json"
MANIFEST_PATH = ROOT / "sonny_png_library" / "manifest.csv"
LIBRARY_DIR = ROOT / "sonny_png_library"
OUTPUT_JSON = ROOT / "app" / "data" / "sonny_image_map.json"
OUTPUT_JS = ROOT / "app" / "data" / "sonny_image_map.js"

MANUAL_ID_MATCHES = {
    "page-37-01-french": ("Valentine Series (2020)", "Chocolate French Bulldog"),
    "page-37-07-ff-sc": ("Valentine Series (2020)", "Chocolate Rabbit"),
    "page-37-02-cheasinte": ("Valentine Series (2020)", "Chocolate Elephant"),
    "page-37-04-cat": ("Valentine Series (2020)", "Chocolate Cat"),
    "page-37-05-toy": ("Valentine Series (2020)", "Chocolate Toy Poodle"),
    "page-37-06-robby-checolate-ange": ("Valentine Series (2020)", "Chocolate Robby Angel"),
    "page-41-01-witch": ("Halloween Series(2021)", "Witch"),
    "page-41-02-pumpkin": ("Halloween Series(2021)", "Pumpkin"),
    "page-41-03-shest": ("Halloween Series(2021)", "Ghost"),
    "page-41-04-owi": ("Halloween Series(2021)", "Owl"),
    "page-41-11-bat": ("Halloween Series(2021)", "Bat"),
    "page-41-12-cat": ("Halloween Series(2021)", "Cat"),
    "page-41-07-rabbit-pumpkin-orange": ("Halloween Series 2021 Additional Secret", "Rabbit Pumpkin Orange"),
    "page-41-08-rabbit-pumpkin-purple": ("Halloween Series 2021 Additional Secret", "Rabbit Pumpkin Purple"),
    "page-41-09-rabbit-pumpkin-green": ("Halloween Series 2021 Additional Secret", "Rabbit Pumpkin Green"),
    "page-41-10-pumpkin-pants-robby-angel-orange": ("Halloween Series 2021 Additional Secret", "Pumpkin Pants Robby Angel Orange"),
    "page-41-11-pumpkin-pants-robby-angel-purple": ("Halloween Series 2021 Additional Secret", "Pumpkin Pants Robby Angel Purple"),
    "page-41-12-pumpkin-pants-robby-angel-green": ("Halloween Series 2021 Additional Secret", "Pumpkin Pants Robby Angel Green"),
    "page-41-13-pumpkin-pants-robby-angel-pink": ("Halloween Series 2021 Additional Secret", "Pumpkin Pants Robby Angel Pink"),
    "page-62-01-broadway-at": ("NewYork Series", "Broadway"),
    "page-62-02-bid": ("NewYork Series", "BigApple"),
    "page-62-03-statue-of-liherty": ("NewYork Series", "Statue of Liberty"),
    "page-62-04-yatiow": ("NewYork Series", "YellowCab"),
    "page-62-24-time-break-fora": ("Seoul Series", "Time For A Break"),
    "page-62-26-sweets-love-hellc": ("Seoul Series", "Love Sweets"),
    "page-62-25-cafe-robby": ("Seoul Series", "Cafe Time"),
    "page-11-11-reindeer": ("Animal Series Ver. 2", "Reindeer"),
    "page-71-01-ispahan-jardin": ("Christmas Ornament Ladurée Patisseries Collection", "Ispahan Jardin Bleu"),
    "page-71-02-mini-honor": ("Ladurée Pâtisserie Collection", "Saint-Honoré Rose Framboise"),
    "page-71-04-jordin": ("Christmas Ornament Ladurée Patisseries Collection", "Macaron Jardin Bleu"),
    "page-71-05-antoinelie": ("Christmas Ornament Ladurée Patisseries Collection", "Mini Marie-Antoinette"),
    "page-71-08-cessis": ("Ladurée Pâtisserie Collection", "Religieuse Cassis Violette"),
    "page-71-09-rouges": ("Ladurée Pâtisserie Collection", "Macaron Fruits Rouges"),
    "page-71-10-pistache": ("Ladurée Pâtisserie Collection", "Macaron Pistache"),
    "page-71-18-mocarsn-rose": ("Ladurée Pâtisserie Collection", "Macaron Rose"),
    "page-71-19-mini-menthe-glacigie": ("Ladurée Pâtisserie Collection", "Macaron Menthe Glaclale"),
    "page-71-13-mini-marie-antoinette": ("Ladurée Pâtisserie Collection", "Mini Marie-Antoinette"),
    "page-71-20-mini-marie-antoinette": ("Christmas Ornament Ladurée Patisseries Collection", "Mini Marie-Antoinette"),
    "page-30-03-reindeer": ("Winter Wonderland(2023)", "Raindeer"),
    "page-31-05-kittens": ("Christmas Presents from Sonny Angel (2020)", "Mittens"),
    "page-34-17-lop-ear-rabbit": ("Sonny Angel Christmas Ornament 2023", "Rabbit"),
}

SERIES_ALIASES = {
    "animal series ver 1": ["animal series 1"],
    "animal series ver 2": ["animal series 2"],
    "animal series ver 3": ["animal series 3"],
    "animal series ver 4": ["animal series 4"],
    "animal series ver 2 special color": ["animal series ver 3 special color"],
    "animal series ver 3 special color": ["animal series ver 3 special color"],
    "unrefined animal series ver 1": ["animal series 1"],
    "unrefined animal series ver 2": ["animal series 2"],
    "unrefined animal series ver 3": ["animal series 3"],
    "unrefined animal series ver 4": ["animal series 4"],
    "unrefined flower series": ["flower series"],
    "unrefined vegetable series": ["vegetable series"],
    "unrefined fruit series": ["fruit series"],
    "unrefined marine series": ["marine series"],
    "flower gift": ["flower gift"],
    "birthday gift": ["birthday gift"],
    "birthday gift bear": ["birthday gift bear"],
    "hippers animal series": ["hippers"],
    "hippers harvest series": ["hippers harverst series", "harvest series"],
    "hippers dreaming series": ["hippers dreaming series"],
    "hippers looking back series": ["hippers looking back series"],
    "dreams inc new year card figures": ["new year card"],
    "afternoon tea series": ["afternoon tea", "afternoon tea 2023"],
    "candy store series": ["charm candy store 2023"],
    "circus series join the circus edition": ["circus series join the circus editon 2022"],
    "collaboration with kangyong cai": ["collaboration with cai"],
    "dinosaur series": ["dinosaur 2024"],
    "gifts of love series": ["gifts of love 2024"],
    "home sweet home series": ["home sweet home 2024"],
    "japanese good luck series": ["japanese good luck 2021"],
    "laduree patisseries collection": ["laduree patisserie collection"],
    "christmas ornament laduree patisseries collection": ["christmas ornament laduree patisseries collection"],
    "laduree patisserie collection": ["ladur e p tisserie collection"],
    "christmas ornament laduree patisseries collection": [
        "christmas ornament laduree patisseries collection",
        "christmas ornament ladur e patisseries collection",
    ],
    "cherry blossom series night version": ["cherry blossom night version 2021"],
    "cherry blossom series peaceful spring edition": ["cherry blossom peaceful spring edition 2022"],
    "animal series ver 1": ["animal series 1", "animal series 1 2018"],
    "animal series ver 2": ["animal series 2", "animal series 2 2018"],
    "animal series ver 3": ["animal series 3", "animal series 3 2018"],
    "animal series ver 4": ["animal series 4", "animal series 4 2018"],
    "flower series": ["flower series 2019"],
    "fruit series": ["fruit series 2019"],
    "marine series": ["marine series 2019"],
    "vegetable series": ["vegetable series 2019"],
    "sweets series": ["sweets series 2018"],
    "christmas dinner series": ["christmas dinner"],
    "winter wonderland series": ["winter wonderland"],
    "christmas series 2021 dreaming christmas": ["dreaming christmas"],
    "christmas series 2020 presents from": ["christmas presents from"],
    "christmas series 2019": ["christmas series"],
    "christmas series 2018": ["christmas series 2018"],
    "christmas series 2017": ["christmas series 2017"],
    "christmas series 2016": ["christmas series 2016"],
    "summer series": ["summer series 2018"],
    "summer vacation series": ["summer vacation series 2017"],
    "sky color series": ["sky color series"],
    "cactus series": ["cactus series"],
    "adventure series": ["in space adventure series"],
    "dog time series": ["dog time"],
    "cat life series": ["cat life"],
    "cat life": ["cat life 2023"],
    "afternoon tea": ["afternoon tea 2023"],
    "charm candy store": ["charm candy store 2023"],
    "love the music": ["love the music"],
    "refreshing cold drinks": ["refreshing cold drinks", "refreshing cold drinks 2022"],
    "cherry blossom series": ["cherry blossom series"],
    "valentine s day series": ["valentine s day series", "valentine s day series 2019"],
    "halloween series 2012": ["halloween series"],
    "halloween series 2007": ["halloween pumpkin"],
    "sonny angel cafe series": ["snack series"],
    "message of love": ["message of love 2022"],
    "bugs world": ["bug s world 2022", "bugs world 2022"],
    "christmas series 2020 presents from": ["christmas presents from 2020"],
    "terrace ishigaki limited": ["terrace ishigaki"],
    "anniversary series": ["15th anniversary cake"],
    "pet treats": ["pet treats"],
    "creaturesseries d": ["creatures series"],
    "seasonal events series": ["christmas ornament"],
    "seasonal series": ["christmas ornament"],
    "japanese good luck": ["japanese good luck 2021"],
    "sonny angel christmas ornament": ["sonny angel christmas ornament 2022"],
    "sonny angel in space adventure series": ["sonny angel in space adventure series 2020"],
    "sonny angel in wonderland series": ["sonny angel in wonderland series 2020"],
    "the town musicians": ["the town musicians 2021"],
}

NAME_ALIASES = {
    "american shorthair": "american short hair",
    "bee": "bumblebee",
    "bok choy": "bokchoy",
    "cherry blossom": "cherry blossoms",
    "french bull dog": "french bulldog",
    "green pepper": "greenpepper",
    "lesser panda": "red panda",
    "lop ear rabbit": "lop eared rabbit",
    "patissier": "patissiere",
    "shiitake": "mushroom",
    "sonny angel wooden christmas tree": "wooden christmas tree",
    "toy poodle": "poodle",
    "white bear": "polar bear",
    "morning glory": "morningglory",
    "lily bell": "lilybell",
    "ice cream": "ice creams",
    "chocolates": "chocolate",
}


def normalize(text: str) -> str:
    text = text.lower().replace("’", "'")
    text = (
        text.replace("ladurée", "laduree")
        .replace("pâtisserie", "patisserie")
        .replace("honoré", "honore")
        .replace("bug's", "bugs")
        .replace("kockerel", "cockerel")
        .replace("rabiit", "rabbit")
        .replace("koara", "koala")
        .replace("dalmation", "dalmatian")
        .replace("fennec fox", "fennec")
        .replace("ice creams", "ice cream")
        .replace("grapes", "grape")
        .replace("pimento", "green pepper")
        .replace("santa clause", "santa claus")
        .replace("carico", "calico")
        .replace("glaclale", "glaciale")
        .replace("saint honore", "saint-honore")
        .replace("newyork", "new york")
        .replace("it’s", "it s")
    )
    text = re.sub(r"\([^)]*\)", "", text)
    text = re.sub(r"\bsonny angel\b", "", text)
    text = re.sub(r"[^a-z0-9]+", " ", text)
    return " ".join(text.split())


def normalize_series(series: str) -> str:
    return normalize(series)


def normalize_name(name: str) -> str:
    cleaned = normalize(name)
    return NAME_ALIASES.get(cleaned, cleaned)


def name_candidates(name: str) -> set[str]:
    cleaned = normalize(name)
    candidates = {cleaned}
    aliased = NAME_ALIASES.get(cleaned)
    if aliased:
        candidates.add(aliased)
    if cleaned == "robby angel":
        candidates.add("secret")
    return {candidate for candidate in candidates if candidate}


def compact(text: str) -> str:
    return normalize(text).replace(" ", "")


def titleize_slug(text: str) -> str:
    words = [part for part in re.split(r"[-_]+", text) if part]
    titled = []
    for word in words:
        if word.lower() in {"waac", "fnac", "modi", "nylon", "log", "on"}:
            titled.append(word.upper())
        elif len(word) == 1 and word.isalpha():
            titled.append(word.upper())
        else:
            titled.append(word.capitalize())
    return " ".join(titled)


def synthetic_rows_from_library() -> list[dict[str, str]]:
    rows: list[dict[str, str]] = []
    for path in LIBRARY_DIR.rglob("*.png"):
        rel = path.relative_to(ROOT).as_posix()
        parts = path.relative_to(LIBRARY_DIR).parts
        if len(parts) < 2:
            continue
        series_slug = path.parent.name
        stem = path.stem
        name_slug = stem.split("__", 1)[1] if "__" in stem else stem
        rows.append(
            {
                "output_path": rel,
                "series": titleize_slug(series_slug),
                "name": titleize_slug(name_slug),
            }
        )
    return rows


def build_asset_lookup(rows: list[dict]) -> tuple[dict[tuple[str, str], dict], dict[str, list[dict]]]:
    lookup: dict[tuple[str, str], dict] = {}
    by_name: dict[str, list[dict]] = {}
    for row in rows:
        output_path = row["output_path"].replace("sonny_png_library_web/", "sonny_png_library/")
        series_variants = {normalize_series(row["series"]), compact(row["series"])}
        raw_name_variants = name_candidates(row["name"])
        name_variants = set(raw_name_variants)
        name_variants |= {candidate.replace(" ", "") for candidate in raw_name_variants}
        for series_key in series_variants:
            for name_key in name_variants:
                lookup.setdefault(
                    (series_key, name_key),
                    {
                        "path": f"./{output_path}",
                        "catalog_name": row["name"],
                        "catalog_series": row["series"],
                    },
                )
        for name_key in name_variants:
            by_name.setdefault(name_key, []).append(row)
    return lookup, by_name


def manual_match_for(item_id: str, asset_lookup: dict[tuple[str, str], dict]) -> dict | None:
    target = MANUAL_ID_MATCHES.get(item_id)
    if not target:
        return None
    series, name = target
    series_key = normalize_series(series)
    series_candidates = {series_key, compact(series), *SERIES_ALIASES.get(series_key, [])}
    series_candidates |= {candidate.replace(" ", "") for candidate in list(series_candidates)}
    for series_key in series_candidates:
        for name_key in name_candidates(name) | {compact(name)}:
            matched = asset_lookup.get((series_key, name_key))
            if matched:
                return matched
    return None


def main() -> None:
    sonnies = json.loads(SONNIES_PATH.read_text())
    rows = list(csv.DictReader(MANIFEST_PATH.open()))
    rows.extend(synthetic_rows_from_library())
    asset_lookup, assets_by_name = build_asset_lookup(rows)

    image_map = {}
    matched = 0

    for item in sonnies:
        manual_match = manual_match_for(item["id"], asset_lookup)
        if manual_match:
            matched += 1
            image_map[item["id"]] = {
                "path": manual_match["path"],
                "source": "official-web",
                "catalogName": manual_match["catalog_name"],
                "catalogSeries": manual_match["catalog_series"],
            }
            continue

        series_key = normalize_series(item["series"])
        series_candidates = {series_key, compact(item["series"]), *SERIES_ALIASES.get(series_key, [])}
        series_candidates |= {candidate.replace(" ", "") for candidate in list(series_candidates)}
        item_name_candidates = name_candidates(item["name"]) | {compact(item["name"])}

        image_path = None
        matched_record = None
        for series_candidate in series_candidates:
            for name_candidate in item_name_candidates:
                matched_record = asset_lookup.get((series_candidate, name_candidate))
                if matched_record:
                    image_path = matched_record["path"]
                    break
            if image_path:
                break

        if not image_path:
            fallback_rows = []
            for name_candidate in item_name_candidates:
                fallback_rows.extend(assets_by_name.get(name_candidate, []))
            unique_assets = {
                (
                    normalize_series(row["series"]),
                    normalize_name(row["name"]),
                    row["output_path"],
                )
                for row in fallback_rows
            }
            if len(unique_assets) == 1:
                (catalog_series, catalog_name, output_path), = unique_assets
                image_path = f"./{output_path.replace('sonny_png_library_web/', 'sonny_png_library/')}"
                matched_record = {
                    "path": image_path,
                    "catalog_name": catalog_name,
                    "catalog_series": catalog_series,
                }

        if image_path:
            matched += 1
            image_map[item["id"]] = {
                "path": image_path,
                "source": "official-web",
                "catalogName": matched_record["catalog_name"] if matched_record else item["name"],
                "catalogSeries": matched_record["catalog_series"] if matched_record else item["series"],
            }

    OUTPUT_JSON.write_text(json.dumps(image_map, indent=2))
    OUTPUT_JS.write_text(f"window.SONNY_IMAGE_MAP = {json.dumps(image_map)};\n")
    print(f"Matched {matched} of {len(sonnies)} Sonny entries")


if __name__ == "__main__":
    main()
