from __future__ import annotations

import csv
import json
import re
from collections import Counter, defaultdict
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
SONNIES_PATH = ROOT / "app" / "data" / "sonnies.json"
IMAGE_MAP_PATH = ROOT / "app" / "data" / "sonny_image_map.json"
MANIFEST_PATH = ROOT / "sonny_png_library" / "manifest.csv"
OUT_DIR = ROOT / "reconciliation"
SUMMARY_PATH = OUT_DIR / "text_reconciliation_summary.md"
NAME_DIFFS_PATH = OUT_DIR / "official_name_diffs.csv"
SERIES_GAPS_PATH = OUT_DIR / "official_series_gaps.csv"
UNLINKED_OFFICIAL_ROWS_PATH = OUT_DIR / "official_rows_unlinked.csv"


def normalize(text: str) -> str:
    text = text.lower().replace("’", "'")
    text = (
        text.replace("ladurée", "laduree")
        .replace("pâtisserie", "patisserie")
        .replace("honoré", "honore")
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
        .replace("bokchoy", "bok choy")
        .replace("greenpepper", "green pepper")
        .replace("morningglory", "morning glory")
    )
    text = re.sub(r"\([^)]*\)", "", text)
    text = re.sub(r"\bsonny angel\b", "", text)
    text = re.sub(r"[^a-z0-9]+", " ", text)
    return " ".join(text.split())


def slug(text: str) -> str:
    return normalize(text).replace(" ", "")


def path_key(text: str) -> str:
    return text.removeprefix("./").replace("sonny_png_library_web/", "sonny_png_library/")


def write_csv(path: Path, rows: list[dict], fieldnames: list[str]) -> None:
    with path.open("w", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)


def name_candidates(text: str) -> set[str]:
    base = normalize(text)
    candidates = {base}
    candidates.add(base.replace(" ", ""))
    if base == "robby angel":
        candidates.add("secret")
    return {candidate for candidate in candidates if candidate}


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    sonnies = json.loads(SONNIES_PATH.read_text())
    image_map = json.loads(IMAGE_MAP_PATH.read_text())
    official_rows = list(csv.DictReader(MANIFEST_PATH.open()))

    official_by_path = {path_key(row["output_path"]): row for row in official_rows}
    local_by_id = {row["id"]: row for row in sonnies}
    local_text_keys: dict[tuple[str, str], list[dict]] = defaultdict(list)
    for row in sonnies:
        series_key = slug(row["series"])
        for candidate in name_candidates(row["name"]):
            local_text_keys[(series_key, candidate)].append(row)

    linked_official_paths: set[str] = set()
    linked_official_text_keys: set[tuple[str, str]] = set()
    linked_local_ids: set[str] = set()
    name_diffs: list[dict] = []
    linked_series_pairs: set[tuple[str, str]] = set()

    for item_id, match in image_map.items():
        item = local_by_id.get(item_id)
        if not item:
            continue
        official = official_by_path.get(path_key(match["path"]))
        if not official:
            continue

        linked_official_paths.add(path_key(match["path"]))
        linked_official_text_keys.add((slug(official["series"]), slug(official["name"])))
        linked_local_ids.add(item_id)
        linked_series_pairs.add((slug(item["series"]), slug(official["series"])))

        local_name = item["name"]
        official_name = official["name"]
        local_series = item["series"]
        official_series = official["series"]

        exact_name_match = local_name == official_name
        exact_series_match = local_series == official_series
        normalized_name_match = normalize(local_name) == normalize(official_name)
        normalized_series_match = normalize(local_series) == normalize(official_series)

        if not (exact_name_match and exact_series_match):
            name_diffs.append(
                {
                    "id": item_id,
                    "page": item["page"],
                    "local_series": local_series,
                    "official_series": official_series,
                    "local_name": local_name,
                    "official_name": official_name,
                    "exact_name_match": exact_name_match,
                    "normalized_name_match": normalized_name_match,
                    "exact_series_match": exact_series_match,
                    "normalized_series_match": normalized_series_match,
                    "page_url": official["page_url"],
                    "image_url": official["image_url"],
                }
            )

    for row in official_rows:
        series_key = slug(row["series"])
        matched_locals = []
        for candidate in name_candidates(row["name"]):
            matched_locals.extend(local_text_keys.get((series_key, candidate), []))
        if matched_locals:
            linked_official_text_keys.add((series_key, slug(row["name"])))
            for local in matched_locals:
                linked_local_ids.add(local["id"])

    unlinked_official_rows = []
    official_series_counts: Counter[str] = Counter()
    linked_series_counts: Counter[str] = Counter()

    for row in official_rows:
        official_series_counts[row["series"]] += 1
        if path_key(row["output_path"]) in linked_official_paths or (
            slug(row["series"]),
            slug(row["name"]),
        ) in linked_official_text_keys:
            linked_series_counts[row["series"]] += 1
        else:
            unlinked_official_rows.append(row)

    series_gaps: list[dict] = []
    for series, total in sorted(official_series_counts.items(), key=lambda item: (-item[1], item[0])):
        linked = linked_series_counts[series]
        if linked != total:
            series_gaps.append(
                {
                    "official_series": series,
                    "official_row_count": total,
                    "linked_to_local_count": linked,
                    "missing_from_linked_count": total - linked,
                }
            )

    unlinked_by_series: dict[str, list[str]] = defaultdict(list)
    for row in unlinked_official_rows:
        unlinked_by_series[row["series"]].append(row["name"])

    top_unlinked_examples = []
    for series, names in sorted(unlinked_by_series.items(), key=lambda item: (-len(item[1]), item[0]))[:20]:
        top_unlinked_examples.append((series, len(names), ", ".join(names[:6])))

    write_csv(
        NAME_DIFFS_PATH,
        sorted(name_diffs, key=lambda row: (row["page"], row["local_series"], row["local_name"])),
        [
            "id",
            "page",
            "local_series",
            "official_series",
            "local_name",
            "official_name",
            "exact_name_match",
            "normalized_name_match",
            "exact_series_match",
            "normalized_series_match",
            "page_url",
            "image_url",
        ],
    )
    write_csv(
        SERIES_GAPS_PATH,
        series_gaps,
        [
            "official_series",
            "official_row_count",
            "linked_to_local_count",
            "missing_from_linked_count",
        ],
    )
    write_csv(
        UNLINKED_OFFICIAL_ROWS_PATH,
        sorted(unlinked_official_rows, key=lambda row: (row["series"], row["name"])),
        ["series", "name", "page_url", "image_url", "output_path", "top_folder", "collection_folder"],
    )

    linked_local_count = len(linked_local_ids)

    summary_lines = [
        "# Text Reconciliation Summary",
        "",
        "Generated from:",
        f"- `{SONNIES_PATH.relative_to(ROOT)}`",
        f"- `{IMAGE_MAP_PATH.relative_to(ROOT)}`",
        f"- `{MANIFEST_PATH.relative_to(ROOT)}`",
        "",
        "## Coverage",
        "",
        f"- Local tracker entries: `{len(sonnies)}`",
        f"- Official web text rows in manifest: `{len(official_rows)}`",
        f"- Local entries linked to official-web rows: `{linked_local_count}`",
        f"- Official-web rows linked to local entries: `{len(linked_official_paths)}`",
        f"- Official-web rows still unlinked: `{len(unlinked_official_rows)}`",
        "",
        "## Audit files",
        "",
        f"- [{NAME_DIFFS_PATH.relative_to(ROOT)}]({NAME_DIFFS_PATH})",
        f"- [{SERIES_GAPS_PATH.relative_to(ROOT)}]({SERIES_GAPS_PATH})",
        f"- [{UNLINKED_OFFICIAL_ROWS_PATH.relative_to(ROOT)}]({UNLINKED_OFFICIAL_ROWS_PATH})",
        "",
        "## Top official series with unlinked rows",
        "",
    ]

    for series, count, examples in top_unlinked_examples:
        summary_lines.append(f"- `{series}`: `{count}` unlinked")
        summary_lines.append(f"  Examples: {examples}")

    summary_lines.extend(
        [
            "",
            "## How to use this",
            "",
            "- Start with `official_name_diffs.csv` to catch rows where the local text disagrees with a matched official row.",
            "- Use `official_series_gaps.csv` to find official series that are underrepresented in the current tracker.",
            "- Use `official_rows_unlinked.csv` to locate official text rows that have no linked local entry yet.",
        ]
    )

    SUMMARY_PATH.write_text("\n".join(summary_lines) + "\n")


if __name__ == "__main__":
    main()
