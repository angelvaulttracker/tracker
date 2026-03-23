from __future__ import annotations

import csv
import re
from collections import Counter, defaultdict
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
UNLINKED_ROWS_PATH = ROOT / "reconciliation" / "official_rows_unlinked.csv"
OUT_MD_PATH = ROOT / "reconciliation" / "guidebook_gap_report.md"
OUT_GUIDEBOOK_CSV = ROOT / "reconciliation" / "guidebook_relevant_unlinked.csv"
OUT_POSTBOOK_CSV = ROOT / "reconciliation" / "post_guidebook_unlinked.csv"
GUIDEBOOK_CUTOFF_YEAR = 2024


def extract_year(image_url: str) -> int | None:
    match = re.search(r"/uploads/(\d{4})/", image_url)
    return int(match.group(1)) if match else None


def main() -> None:
    rows = list(csv.DictReader(UNLINKED_ROWS_PATH.open()))
    guidebook_rows = []
    postbook_rows = []
    unknown_rows = []

    for row in rows:
        year = extract_year(row["image_url"])
        row["asset_year"] = "" if year is None else str(year)
        if year is None:
            unknown_rows.append(row)
        elif year <= GUIDEBOOK_CUTOFF_YEAR:
            guidebook_rows.append(row)
        else:
            postbook_rows.append(row)

    for path, subset in [
        (OUT_GUIDEBOOK_CSV, guidebook_rows),
        (OUT_POSTBOOK_CSV, postbook_rows),
    ]:
        with path.open("w", newline="") as handle:
            writer = csv.DictWriter(
                handle,
                fieldnames=[
                    "series",
                    "name",
                    "asset_year",
                    "page_url",
                    "image_url",
                    "output_path",
                    "top_folder",
                    "collection_folder",
                ],
            )
            writer.writeheader()
            writer.writerows(subset)

    def top_series(rows_subset: list[dict]) -> list[tuple[str, int, str]]:
        by_series: dict[str, list[str]] = defaultdict(list)
        for row in rows_subset:
            by_series[row["series"]].append(row["name"])
        return [
            (series, len(names), ", ".join(names[:6]))
            for series, names in sorted(by_series.items(), key=lambda item: (-len(item[1]), item[0]))
        ]

    guidebook_top = top_series(guidebook_rows)
    postbook_top = top_series(postbook_rows)
    year_counts = Counter(row["asset_year"] or "unknown" for row in rows)

    lines = [
        "# Guidebook Gap Report",
        "",
        f"Guidebook cutoff year used: `{GUIDEBOOK_CUTOFF_YEAR}`",
        "",
        "This report separates official-site unlinked rows into:",
        f"- guidebook-relevant rows with asset years `<= {GUIDEBOOK_CUTOFF_YEAR}`",
        f"- post-guidebook rows with asset years `> {GUIDEBOOK_CUTOFF_YEAR}`",
        "",
        "## Counts",
        "",
        f"- Total unlinked official rows: `{len(rows)}`",
        f"- Guidebook-relevant unlinked rows: `{len(guidebook_rows)}`",
        f"- Post-guidebook unlinked rows: `{len(postbook_rows)}`",
        f"- Unknown-year unlinked rows: `{len(unknown_rows)}`",
        "",
        "## Unlinked Rows By Asset Year",
        "",
    ]

    for year, count in sorted(year_counts.items()):
        lines.append(f"- `{year}`: `{count}`")

    lines.extend(
        [
            "",
            "## Guidebook-Relevant Series",
            "",
        ]
    )

    for series, count, examples in guidebook_top:
        lines.append(f"- `{series}`: `{count}`")
        lines.append(f"  Examples: {examples}")

    lines.extend(
        [
            "",
            "## Post-Guidebook Series",
            "",
        ]
    )

    for series, count, examples in postbook_top:
        lines.append(f"- `{series}`: `{count}`")
        lines.append(f"  Examples: {examples}")

    lines.extend(
        [
            "",
            "## Files",
            "",
            f"- [{OUT_GUIDEBOOK_CSV.relative_to(ROOT)}]({OUT_GUIDEBOOK_CSV})",
            f"- [{OUT_POSTBOOK_CSV.relative_to(ROOT)}]({OUT_POSTBOOK_CSV})",
        ]
    )

    OUT_MD_PATH.write_text("\n".join(lines) + "\n")


if __name__ == "__main__":
    main()
