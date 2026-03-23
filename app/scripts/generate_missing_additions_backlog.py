from __future__ import annotations

import csv
from collections import defaultdict
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
UNLINKED_ROWS_PATH = ROOT / "reconciliation" / "official_rows_unlinked.csv"
OVERLAP_PATH = ROOT / "reconciliation" / "series_overlap_candidates.csv"
OUT_CSV_PATH = ROOT / "reconciliation" / "missing_additions_backlog.csv"
OUT_MD_PATH = ROOT / "reconciliation" / "missing_additions_backlog.md"


def main() -> None:
    unlinked_rows = list(csv.DictReader(UNLINKED_ROWS_PATH.open()))
    overlap_rows = list(csv.DictReader(OVERLAP_PATH.open()))

    best_overlap_by_series: dict[str, dict] = {}
    for row in overlap_rows:
        current = best_overlap_by_series.get(row["official_series"])
        if current is None:
            best_overlap_by_series[row["official_series"]] = row
            continue
        current_overlap = int(current["overlap_count"])
        candidate_overlap = int(row["overlap_count"])
        current_ratio = float(current["overlap_ratio"])
        candidate_ratio = float(row["overlap_ratio"])
        if (candidate_overlap, candidate_ratio) > (current_overlap, current_ratio):
            best_overlap_by_series[row["official_series"]] = row

    rows_by_series: dict[str, list[dict]] = defaultdict(list)
    for row in unlinked_rows:
        rows_by_series[row["series"]].append(row)

    backlog_rows: list[dict[str, str]] = []
    markdown_lines = [
        "# Missing Additions Backlog",
        "",
        "This backlog lists official text rows that still do not have a matching local tracker entry.",
        "",
        "## Priority Buckets",
        "",
    ]

    buckets = {
        "likely_new_series": [],
        "likely_partial_series": [],
        "needs_review": [],
    }

    for series, rows in rows_by_series.items():
        best = best_overlap_by_series.get(series)
        overlap_count = int(best["overlap_count"]) if best else 0
        overlap_ratio = float(best["overlap_ratio"]) if best else 0.0
        closest_local_series = best["local_series"] if best else ""

        if overlap_count == 0:
            bucket = "likely_new_series"
        elif overlap_ratio >= 0.75:
            bucket = "likely_partial_series"
        else:
            bucket = "needs_review"

        buckets[bucket].append((series, rows, closest_local_series, overlap_count, overlap_ratio))

        for row in rows:
            backlog_rows.append(
                {
                    "bucket": bucket,
                    "official_series": series,
                    "official_name": row["name"],
                    "closest_local_series": closest_local_series,
                    "overlap_count": str(overlap_count),
                    "overlap_ratio": f"{overlap_ratio:.3f}",
                    "page_url": row["page_url"],
                    "image_url": row["image_url"],
                }
            )

    for bucket_name in ["likely_new_series", "likely_partial_series", "needs_review"]:
        markdown_lines.append(f"### {bucket_name}")
        markdown_lines.append("")
        series_rows = sorted(
            buckets[bucket_name],
            key=lambda item: (-len(item[1]), item[0]),
        )
        if not series_rows:
            markdown_lines.append("- none")
            markdown_lines.append("")
            continue
        for series, rows, closest_local_series, overlap_count, overlap_ratio in series_rows:
            markdown_lines.append(f"- `{series}`: `{len(rows)}` rows")
            if closest_local_series:
                markdown_lines.append(
                    f"  Closest local series: `{closest_local_series}` with overlap `{overlap_count}` (`{overlap_ratio:.3f}`)"
                )
            markdown_lines.append(f"  Names: {', '.join(row['name'] for row in rows[:12])}")
        markdown_lines.append("")

    with OUT_CSV_PATH.open("w", newline="") as handle:
        writer = csv.DictWriter(
            handle,
            fieldnames=[
                "bucket",
                "official_series",
                "official_name",
                "closest_local_series",
                "overlap_count",
                "overlap_ratio",
                "page_url",
                "image_url",
            ],
        )
        writer.writeheader()
        writer.writerows(
            sorted(
                backlog_rows,
                key=lambda row: (row["bucket"], row["official_series"], row["official_name"]),
            )
        )

    OUT_MD_PATH.write_text("\n".join(markdown_lines) + "\n")


if __name__ == "__main__":
    main()
