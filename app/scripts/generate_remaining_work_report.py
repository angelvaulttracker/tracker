from __future__ import annotations

import csv
import json
from collections import Counter, defaultdict
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
SONNIES_PATH = ROOT / "app" / "data" / "sonnies.json"
IMAGE_MAP_PATH = ROOT / "app" / "data" / "sonny_image_map.json"
OUT_DIR = ROOT / "reconciliation"
OUT_CSV_PATH = OUT_DIR / "remaining_work_classification.csv"
OUT_MD_PATH = OUT_DIR / "remaining_work_report.md"

# These are the best next sourcing targets: real figure series where missing
# images are likely discoverable and worth continued web sourcing.
REAL_SERIES = {
    "11th Anniversary Series",
    "12th Anniversary Series",
    "Animal Series Ver. 1 Special Color",
    "Animal Series Ver. 2 Special Color",
    "Cactus Series",
    "Chocolate Series 2016",
    "Christmas Ornament Series 2014",
    "Christmas Series 2011",
    "Christmas Series 2012",
    "Christmas Series 2013",
    "Christmas Series 2014",
    "Christmas Series 2015",
    "Collaboration Kamawanu",
    "Crown Series",
    "Dashin Socks Child of the Stars",
    "Decoppin Animal Series Ver. 1",
    "Dog Time Series",
    "Halloween Series 2014",
    "H Family Series",
    "MODI Collaboration Series 2014",
    "MODI Collaboration Series 2015",
    "Sonny Angel Cafe Series",
    "Special Color 2014",
    "Special Color 2016",
    "Strong Current Series",
    "Summer Series Huntington Beach Version 2014",
    "T-Shirt Series",
    "T-shirt Series 1300K Version",
    "Valentine's Day Series 2015",
}

# These are either not standard figure-series work, are obviously OCR-noisy,
# or are likely to waste time until the text is corrected first.
SUS_SERIES = {
    "6 University Series Prototype",
    "Alphabet Key Chain",
    "Collector's Trophy",
    "Complete Guide Book Exclusive Figures",
    "Dreams Inc. New Year Card Figures",
    "Francfranc 20th Anniversary",
    "Francfranc Lucky Bag 2007",
    "ISETAN Display Special Color",
    "Limited",
    "Mini Figure Strap Animal Version",
    "NYLON 10th Anniversary Series",
    "Prototypes",
    "Rabbit Popularity Poll 2024",
    "Sonny Angel Live-Eye Doll Costume",
    "Special Color 2007",
    "Sticker Pack Series1",
    "Sticker Pack Series2",
    "Valentine Event Shenzhen Limited",
    "Valentine's Day Series",
    "Workshop Event",
    "Easter Series",
}

# Separate side pile for assets that already exist or likely need image quality
# fixes rather than first-time sourcing.
REFINE_SERIES = {
    "Animal Series Refine",
}


def classify_series(series: str) -> str:
    if series in REAL_SERIES:
        return "real"
    if series in SUS_SERIES:
        return "sus"
    if series in REFINE_SERIES:
        return "refine"

    lowered = series.lower()
    if any(
        keyword in lowered
        for keyword in [
            "poll",
            "prototype",
            "display",
            "trophy",
            "doll costume",
            "key chain",
            "lucky bag",
            "sticker pack",
        ]
    ):
        return "sus"
    if any(
        keyword in lowered
        for keyword in [
            "christmas series",
            "halloween series",
            "valentine",
            "summer series",
            "special color",
            "cafe",
            "cactus",
            "crown",
            "kamawanu",
            "dog time",
            "anniversary",
        ]
    ):
        return "real"
    return "sus"


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    sonnies = json.loads(SONNIES_PATH.read_text())
    image_map = json.loads(IMAGE_MAP_PATH.read_text())

    unmatched = [row for row in sonnies if row["id"] not in image_map]
    bucketed_series: dict[str, list[dict]] = defaultdict(list)
    csv_rows: list[dict[str, str]] = []

    for row in unmatched:
        bucket = classify_series(row["series"])
        bucketed_series[bucket].append(row)
        csv_rows.append(
            {
                "bucket": bucket,
                "series": row["series"],
                "name": row["name"],
                "id": row["id"],
                "page": str(row["page"]),
            }
        )

    series_counts_by_bucket: dict[str, Counter[str]] = {
        bucket: Counter(row["series"] for row in rows)
        for bucket, rows in bucketed_series.items()
    }

    summary_lines = [
        "# Remaining Work Report",
        "",
        f"Unmatched tracker entries: `{len(unmatched)}`",
        "",
        "This is a first-pass triage of the remaining tracker gaps.",
        "",
        "## Bucket Summary",
        "",
    ]

    for bucket in ["real", "refine", "sus"]:
        rows = bucketed_series.get(bucket, [])
        summary_lines.append(f"- `{bucket}`: `{len(rows)}` entries")
    summary_lines.append("")

    for bucket in ["real", "refine", "sus"]:
        summary_lines.append(f"## {bucket.title()} Bucket")
        summary_lines.append("")
        series_counter = series_counts_by_bucket.get(bucket, Counter())
        if not series_counter:
            summary_lines.append("- none")
            summary_lines.append("")
            continue

        for series, count in series_counter.most_common(25):
            summary_lines.append(f"- `{series}`: `{count}`")
            names = [
                row["name"]
                for row in unmatched
                if row["series"] == series and classify_series(row["series"]) == bucket
            ]
            summary_lines.append(f"  Names: {', '.join(names[:12])}")
        summary_lines.append("")

    summary_lines.extend(
        [
            "## Suggested Next Steps",
            "",
            "1. Work the `real` bucket first, starting from the largest series groups.",
            "2. Keep `refine` separate so quality swaps do not get mixed into missing-asset sourcing.",
            "3. Treat `sus` as text-cleanup / validation work before spending more web time.",
            "",
        ]
    )

    with OUT_CSV_PATH.open("w", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=["bucket", "series", "name", "id", "page"])
        writer.writeheader()
        writer.writerows(
            sorted(
                csv_rows,
                key=lambda row: (row["bucket"], row["series"], int(row["page"]), row["name"]),
            )
        )

    OUT_MD_PATH.write_text("\n".join(summary_lines) + "\n")


if __name__ == "__main__":
    main()
