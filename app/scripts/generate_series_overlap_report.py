from __future__ import annotations

import csv
import json
import re
from collections import defaultdict
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
SONNIES_PATH = ROOT / "app" / "data" / "sonnies.json"
UNLINKED_ROWS_PATH = ROOT / "reconciliation" / "official_rows_unlinked.csv"
OUT_CSV_PATH = ROOT / "reconciliation" / "series_overlap_candidates.csv"
OUT_MD_PATH = ROOT / "reconciliation" / "series_overlap_candidates.md"


def normalize(text: str) -> str:
    text = text.lower().replace("’", "'")
    text = (
        text.replace("ladurée", "laduree")
        .replace("pâtisserie", "patisserie")
        .replace("saint-honoré", "saint honore")
        .replace("shiba inu", "shibainu")
        .replace("short hair", "shorthair")
        .replace("bull dog", "bulldog")
        .replace("lop ear", "lopear")
        .replace("raindeer", "reindeer")
        .replace("kockerel", "cockerel")
        .replace("dog 2018", "shibainu 2018")
    )
    text = re.sub(r"\([^)]*\)", " ", text)
    text = re.sub(r"[^a-z0-9]+", " ", text)
    return " ".join(text.split())


def name_key(text: str) -> str:
    return normalize(text).replace(" ", "")


def main() -> None:
    sonnies = json.loads(SONNIES_PATH.read_text())
    unlinked_rows = list(csv.DictReader(UNLINKED_ROWS_PATH.open()))

    local_names_by_series: dict[str, set[str]] = defaultdict(set)
    local_display_names_by_series: dict[str, list[str]] = defaultdict(list)
    for row in sonnies:
        series = row["series"]
        local_names_by_series[series].add(name_key(row["name"]))
        local_display_names_by_series[series].append(row["name"])

    official_names_by_series: dict[str, set[str]] = defaultdict(set)
    official_display_names_by_series: dict[str, list[str]] = defaultdict(list)
    for row in unlinked_rows:
        series = row["series"]
        official_names_by_series[series].add(name_key(row["name"]))
        official_display_names_by_series[series].append(row["name"])

    candidate_rows: list[dict[str, object]] = []
    markdown_lines = [
        "# Series Overlap Candidates",
        "",
        "For each official series with unlinked rows, this report shows local series with the strongest name overlap.",
        "",
    ]

    for official_series in sorted(official_names_by_series):
        official_names = official_names_by_series[official_series]
        scored = []
        for local_series, local_names in local_names_by_series.items():
            overlap = official_names & local_names
            if not overlap:
                continue
            score = len(overlap) / max(len(official_names), 1)
            scored.append((len(overlap), score, local_series, overlap))
        scored.sort(key=lambda item: (-item[0], -item[1], item[2]))

        markdown_lines.append(f"## {official_series}")
        markdown_lines.append("")
        markdown_lines.append(f"- Official unlinked names: `{len(official_names)}`")
        markdown_lines.append(f"- Examples: {', '.join(sorted(official_display_names_by_series[official_series])[:8])}")
        if not scored:
            markdown_lines.append("- No local series with overlapping normalized names")
            markdown_lines.append("")
            continue

        for overlap_count, score, local_series, overlap in scored[:5]:
            missing = sorted(official_names - local_names_by_series[local_series])
            candidate_rows.append(
                {
                    "official_series": official_series,
                    "official_name_count": len(official_names),
                    "local_series": local_series,
                    "local_name_count": len(local_names_by_series[local_series]),
                    "overlap_count": overlap_count,
                    "overlap_ratio": f"{score:.3f}",
                    "overlap_names": ", ".join(sorted(overlap)),
                    "official_names_missing_from_local": ", ".join(missing[:12]),
                }
            )
            markdown_lines.append(
                f"- `{local_series}`: overlap `{overlap_count}/{len(official_names)}`"
            )
        markdown_lines.append("")

    with OUT_CSV_PATH.open("w", newline="") as handle:
        writer = csv.DictWriter(
            handle,
            fieldnames=[
                "official_series",
                "official_name_count",
                "local_series",
                "local_name_count",
                "overlap_count",
                "overlap_ratio",
                "overlap_names",
                "official_names_missing_from_local",
            ],
        )
        writer.writeheader()
        writer.writerows(candidate_rows)

    OUT_MD_PATH.write_text("\n".join(markdown_lines) + "\n")


if __name__ == "__main__":
    main()
