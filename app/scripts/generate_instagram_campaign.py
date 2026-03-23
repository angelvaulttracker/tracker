#!/usr/bin/env python3

from __future__ import annotations

import base64
from pathlib import Path
from textwrap import wrap


ROOT = Path(__file__).resolve().parents[2]
OUTPUT_DIR = ROOT / "campaign" / "instagram"

ASSET_PATHS = {
    "rabbit": ROOT / "sonny_png_library_web/regulars/animal-collections/animal-series-1/01__rabbit.png",
    "panda": ROOT / "sonny_png_library_web/regulars/animal-collections/animal-series-1/03__panda.png",
    "strawberry": ROOT / "sonny_png_library_web/regulars/fruit-collections/fruit-series/05__strawberry.png",
    "dolphin": ROOT / "sonny_png_library_web/regulars/marine-collections/marine-series/03__dolphin.png",
}

SLIDES = [
    {
        "slug": "01-collection-tracker",
        "kicker": "Collection Tracker",
        "title": "See your whole Sonny shelf in one sweet place.",
        "body": "Browse the catalog, search by name or series, and mark each Sonny as Have, Missing, ISO, or DISO.",
        "highlights": ["Search + filters", "Status buttons", "Saved in browser"],
        "palette": ("#fff7ef", "#f6d9c9", "#f1b9ad", "#6f4b3d"),
        "mock": ["Catalog grid", "Progress stats", "Status legend"],
        "art": ["rabbit", "panda", "strawberry"],
    },
    {
        "slug": "02-insights",
        "kicker": "Insights",
        "title": "Turn collecting progress into a page that actually motivates you.",
        "body": "The insights view highlights completion depth, strongest sets, and which series are closest to done.",
        "highlights": ["Completion cards", "Series ranking", "Closest-to-finish view"],
        "palette": ("#f5fbff", "#cde8f7", "#9fcbe5", "#35556d"),
        "mock": ["Insight cards", "Series browser", "Completion bars"],
        "art": ["dolphin", "rabbit", "panda"],
    },
    {
        "slug": "03-iso-diso",
        "kicker": "ISO / DISO Board",
        "title": "Keep your most wanted Sonnies front and center.",
        "body": "This page separates ISO and DISO picks so your hunt list feels organized and easy to share.",
        "highlights": ["ISO + DISO columns", "Wishlist filters", "Series sorting"],
        "palette": ("#fff6fb", "#f7d3e6", "#eba7ca", "#6e3f58"),
        "mock": ["ISO column", "DISO column", "Wishlist filters"],
        "art": ["strawberry", "rabbit", "dolphin"],
    },
    {
        "slug": "04-iso-maker",
        "kicker": "ISO Maker",
        "title": "Build a ready-to-post wishlist layout in a few taps.",
        "body": "Select the Sonnies you want, choose a background and lineup style, and make a shareable ISO board.",
        "highlights": ["Selection step", "Background themes", "Custom lineup controls"],
        "palette": ("#fffaf2", "#f2dfb8", "#dfc08f", "#6f5836"),
        "mock": ["Selection grid", "Layout controls", "Shareable canvas"],
        "art": ["rabbit", "strawberry", "panda"],
    },
    {
        "slug": "05-collected",
        "kicker": "Collected",
        "title": "Give the Sonny babies you already own their own cozy gallery.",
        "body": "Collected view turns your saved figures into a calmer shelf with search, sorting, and notes.",
        "highlights": ["Collected shelf", "Notes field", "Compact or shelf view"],
        "palette": ("#f8fff7", "#d7eed0", "#abd29d", "#476042"),
        "mock": ["Gallery cards", "Collected summary", "Notes panel"],
        "art": ["panda", "rabbit", "strawberry"],
    },
    {
        "slug": "06-tracker-settings",
        "kicker": "Tracker Settings",
        "title": "Tidy the tracker without losing your saved progress.",
        "body": "Hide whole series or single Sonnies so the tracker only shows what matters to you right now.",
        "highlights": ["Hide manager", "Series controls", "Reset saved progress"],
        "palette": ("#f8f7ff", "#dcd8f5", "#b9b3e8", "#4d4676"),
        "mock": ["Search manager", "Hidden counters", "Bulk actions"],
        "art": ["dolphin", "panda", "rabbit"],
    },
    {
        "slug": "07-stock-shelf",
        "kicker": "Stock Shelf",
        "title": "Run your selling inventory like a real little Sonny storefront.",
        "body": "Add stock from the catalog, set pricing and status, then switch between roomy cards and a shelf-style image view.",
        "highlights": ["Add stock form", "Inventory cards", "Shelf display toggle"],
        "palette": ("#fff7f4", "#f4d4cf", "#eba79c", "#70473d"),
        "mock": ["Catalog preview", "Stock cards", "Summary tiles"],
        "art": ["strawberry", "dolphin", "rabbit"],
    },
    {
        "slug": "08-sonny-fund",
        "kicker": "Sonny Fund",
        "title": "See the money side of collecting without leaving the app.",
        "body": "Track money in and money out, edit transactions inline, and filter the fund history by time range.",
        "highlights": ["Fund entries", "Running balance", "7/30/90 day filters"],
        "palette": ("#f5fffb", "#cfeee5", "#96d7c4", "#2f6458"),
        "mock": ["Balance list", "Movement form", "Range filter"],
        "art": ["rabbit", "panda", "dolphin"],
    },
    {
        "slug": "09-shipments",
        "kicker": "Shipments",
        "title": "Plan incoming boxes before a single Sonny hits the shelf.",
        "body": "Create shipment plans, price each figure for selling or keeping, and watch the totals update automatically.",
        "highlights": ["Shipment planner", "Sell vs keep totals", "Move into stock"],
        "palette": ("#fff9f3", "#f3dec8", "#e2be95", "#6d5131"),
        "mock": ["Shipment list", "Planner rows", "Result metrics"],
        "art": ["dolphin", "strawberry", "rabbit"],
    },
    {
        "slug": "10-activity-backups",
        "kicker": "Activity + Backups",
        "title": "Every change stays traceable, exportable, and easy to restore.",
        "body": "The activity page tracks updates across stock, fund, shipments, and system actions while backup tools keep everything safe.",
        "highlights": ["Activity log", "CSV export", "JSON backup + restore"],
        "palette": ("#f6f8ff", "#d6ddf7", "#aebde9", "#43557d"),
        "mock": ["Recent actions", "Category filter", "Backup buttons"],
        "art": ["panda", "rabbit", "strawberry"],
    },
    {
        "slug": "11-stock-settings",
        "kicker": "Stock Settings",
        "title": "Control how your stock totals behave behind the scenes.",
        "body": "Adjust trade-value rules and reset this view whenever you want the stock math to go back to default.",
        "highlights": ["Trade-value toggles", "Preference cards", "Reset view"],
        "palette": ("#fbf8ff", "#e0d7f0", "#c0afe3", "#55416f"),
        "mock": ["Settings cards", "Toggle states", "Reset action"],
        "art": ["rabbit", "dolphin", "panda"],
    },
]


def png_data_uri(path: Path) -> str:
    encoded = base64.b64encode(path.read_bytes()).decode("ascii")
    return f"data:image/png;base64,{encoded}"


EMBEDDED_ASSETS = {name: png_data_uri(path) for name, path in ASSET_PATHS.items()}


def svg_text_lines(text: str, width: int) -> list[str]:
    return wrap(text, width=width, break_long_words=False)


def text_block(lines: list[str], x: int, y: int, size: int, line_height: int, color: str, weight: int = 500, opacity: float = 1.0) -> str:
    spans = []
    for index, line in enumerate(lines):
        dy = "0" if index == 0 else str(line_height)
        spans.append(
            f'<tspan x="{x}" dy="{dy}">{escape_xml(line)}</tspan>'
        )
    return (
        f'<text x="{x}" y="{y}" font-size="{size}" font-weight="{weight}" fill="{color}" '
        f'opacity="{opacity}" font-family="Helvetica, Arial, sans-serif">{"".join(spans)}</text>'
    )


def escape_xml(text: str) -> str:
    return (
        text.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
    )


def pill(x: int, y: int, label: str, fill: str, text_color: str) -> str:
    width = max(152, 34 + len(label) * 12)
    return (
        f'<rect x="{x}" y="{y}" rx="28" ry="28" width="{width}" height="52" fill="{fill}" opacity="0.95" />'
        f'<text x="{x + 26}" y="{y + 33}" font-size="24" font-weight="700" fill="{text_color}" '
        f'font-family="Helvetica, Arial, sans-serif">{escape_xml(label)}</text>'
    )


def build_mock_window(slide: dict, top_y: int, text_color: str) -> str:
    blocks = []
    x = 74
    y = top_y
    card_width = 932
    blocks.append(f'<rect x="{x}" y="{y}" width="{card_width}" height="720" rx="34" fill="#ffffff" opacity="0.72" stroke="#ffffff" stroke-opacity="0.92" />')
    blocks.append(f'<rect x="{x}" y="{y}" width="{card_width}" height="76" rx="34" fill="#ffffff" opacity="0.86" />')
    blocks.append(f'<circle cx="118" cy="{y + 38}" r="9" fill="#ff8f86" />')
    blocks.append(f'<circle cx="148" cy="{y + 38}" r="9" fill="#ffd36f" />')
    blocks.append(f'<circle cx="178" cy="{y + 38}" r="9" fill="#7cd992" />')
    blocks.append(
        f'<text x="216" y="{y + 47}" font-size="24" font-weight="700" fill="{text_color}" opacity="0.78" '
        'font-family="Helvetica, Arial, sans-serif">Page Preview</text>'
    )

    label_y = y + 108
    for idx, label in enumerate(slide["mock"]):
        blocks.append(
            f'<rect x="{92 + idx * 294}" y="{label_y}" width="268" height="58" rx="18" fill="#ffffff" opacity="0.92" />'
        )
        blocks.append(
            f'<text x="{112 + idx * 294}" y="{label_y + 36}" font-size="24" font-weight="700" '
            f'fill="{text_color}" opacity="0.82" font-family="Helvetica, Arial, sans-serif">{escape_xml(label)}</text>'
        )

    card_y = y + 196
    for idx in range(3):
        cx = 92 + idx * 294
        blocks.append(f'<rect x="{cx}" y="{card_y}" width="268" height="220" rx="28" fill="#ffffff" opacity="0.88" />')
        blocks.append(f'<rect x="{cx + 20}" y="{card_y + 22}" width="104" height="104" rx="24" fill="#ffffff" opacity="0.96" />')
        art_key = slide["art"][idx % len(slide["art"])]
        blocks.append(f'<image href="{EMBEDDED_ASSETS[art_key]}" x="{cx + 28}" y="{card_y + 24}" width="88" height="96" preserveAspectRatio="xMidYMid meet" />')
        blocks.append(f'<rect x="{cx + 142}" y="{card_y + 34}" width="92" height="20" rx="10" fill="{text_color}" opacity="0.10" />')
        blocks.append(f'<rect x="{cx + 142}" y="{card_y + 66}" width="76" height="20" rx="10" fill="{text_color}" opacity="0.08" />')
        blocks.append(f'<rect x="{cx + 20}" y="{card_y + 152}" width="228" height="16" rx="8" fill="{text_color}" opacity="0.08" />')
        blocks.append(f'<rect x="{cx + 20}" y="{card_y + 184}" width="{164 - idx * 22}" height="16" rx="8" fill="{text_color}" opacity="0.06" />')

    footer_y = y + 450
    blocks.append(f'<rect x="92" y="{footer_y}" width="556" height="232" rx="28" fill="#ffffff" opacity="0.86" />')
    blocks.append(f'<rect x="674" y="{footer_y}" width="314" height="232" rx="28" fill="#ffffff" opacity="0.86" />')
    blocks.append(
        f'<text x="118" y="{footer_y + 44}" font-size="22" font-weight="700" fill="{text_color}" opacity="0.56" '
        'font-family="Helvetica, Arial, sans-serif">What this page does</text>'
    )
    blocks.append(
        f'<text x="700" y="{footer_y + 44}" font-size="22" font-weight="700" fill="{text_color}" opacity="0.56" '
        'font-family="Helvetica, Arial, sans-serif">Standout features</text>'
    )
    body_lines = svg_text_lines(slide["body"], 40)
    blocks.append(text_block(body_lines, 118, footer_y + 88, 34, 44, text_color, 600, 0.90))

    for idx, label in enumerate(slide["highlights"]):
        py = footer_y + 78 + idx * 64
        blocks.append(f'<rect x="700" y="{py}" width="242" height="44" rx="22" fill="{text_color}" opacity="0.08" />')
        blocks.append(
            f'<text x="720" y="{py + 29}" font-size="22" font-weight="700" fill="{text_color}" opacity="0.82" '
            f'font-family="Helvetica, Arial, sans-serif">{escape_xml(label)}</text>'
        )

    return "".join(blocks)


def build_slide(slide: dict) -> str:
    bg_top, bg_mid, bg_accent, text_color = slide["palette"]
    title_lines = svg_text_lines(slide["title"], 24)
    body_lines = svg_text_lines(slide["body"], 48)
    body_y = 236 + max(0, len(title_lines) - 1) * 74 + 62
    pills_y = body_y + len(body_lines) * 40 + 42
    mock_y = pills_y + 88
    pills = []
    x_cursor = 74
    for label in slide["highlights"]:
        pills.append(pill(x_cursor, pills_y, label, "#ffffff", text_color))
        x_cursor += max(172, 54 + len(label) * 12)
        x_cursor += 16

    art_markup = []
    art_positions = [(816, 84, 190), (908, 214, 124), (714, 236, 134)]
    for (x, y, size), art_name in zip(art_positions, slide["art"]):
        art_markup.append(
            f'<circle cx="{x + size / 2}" cy="{y + size / 2}" r="{size / 2 + 20}" fill="#ffffff" opacity="0.28" />'
        )
        art_markup.append(
            f'<image href="{EMBEDDED_ASSETS[art_name]}" x="{x}" y="{y}" width="{size}" height="{size}" preserveAspectRatio="xMidYMid meet" />'
        )

    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
  <rect width="1080" height="1350" fill="{bg_top}" />
  <rect x="0" y="780" width="1080" height="570" fill="{bg_mid}" opacity="0.34" />
  <circle cx="946" cy="132" r="138" fill="{bg_accent}" opacity="0.18" />
  <circle cx="168" cy="1214" r="168" fill="{bg_accent}" opacity="0.14" />
  <circle cx="782" cy="322" r="122" fill="#ffffff" opacity="0.26" />
  <circle cx="312" cy="164" r="184" fill="#ffffff" opacity="0.18" />
  <rect x="74" y="72" width="168" height="42" rx="21" fill="#ffffff" opacity="0.75" />
  <text x="98" y="99" font-size="21" font-weight="700" fill="{text_color}" font-family="Helvetica, Arial, sans-serif">Instagram carousel</text>
  <text x="74" y="170" font-size="30" font-weight="800" fill="{text_color}" opacity="0.72" font-family="Helvetica, Arial, sans-serif">{escape_xml(slide["kicker"])}</text>
  {text_block(title_lines, 74, 236, 64, 74, text_color, 800)}
  {text_block(body_lines, 74, body_y, 29, 40, text_color, 500, 0.94)}
  {"".join(pills)}
  {"".join(art_markup)}
  {build_mock_window(slide, mock_y, text_color)}
</svg>
"""


def write_caption_guide() -> None:
    lines = [
        "# Instagram Campaign Slides",
        "",
        "Portrait slides generated for the Sonny tracker and stock app.",
        "",
    ]
    for slide in SLIDES:
        lines.append(f"## {slide['slug']}")
        lines.append(f"**Page:** {slide['kicker']}")
        lines.append(f"**What it does:** {slide['body']}")
        lines.append(f"**Suggested caption:** {slide['title']} {slide['body']}")
        lines.append("")
    (OUTPUT_DIR / "captions.md").write_text("\n".join(lines))


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    for slide in SLIDES:
        (OUTPUT_DIR / f"{slide['slug']}.svg").write_text(build_slide(slide))
    write_caption_guide()
    print(f"Generated {len(SLIDES)} SVG slides in {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
