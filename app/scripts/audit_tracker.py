from __future__ import annotations

import json
from collections import Counter
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
DATA_PATH = ROOT / "app" / "data" / "sonnies.json"

# Verified by manually checking the guidebook spreads.
VERIFIED_EXPECTED_COUNTS = {
    31: 28,  # Christmas Series 2020 / 2018 / 2019 / 2017
    43: 11,  # Halloween Series 2012 + Halloween Series 2007 + Rabbit Poll page
    44: 17,  # Rabbit popularity poll continuation
    56: 14,  # Cat Life Series
    57: 14,  # Dog Time Series
    60: 11,  # Love the Music / Pet Treats / Afternoon Tea Series
    64: 26,  # Animal Series Ver. 2 / Ver. 3 Special Color
}


def main() -> None:
    items = json.loads(DATA_PATH.read_text())
    counts = Counter(item["page"] for item in items)

    current_total = len(items)
    print(f"Current tracker total: {current_total}")
    print()
    print("Verified page audits:")

    verified_gap = 0
    for page in sorted(VERIFIED_EXPECTED_COUNTS):
      expected = VERIFIED_EXPECTED_COUNTS[page]
      actual = counts[page]
      delta = expected - actual
      verified_gap += max(delta, 0)
      print(
          f"Page {page:03d}: expected {expected}, current {actual}, "
          f"missing {max(delta, 0)}"
      )

    print()
    print(f"Verified missing minimum: {verified_gap}")
    print(f"Verified minimum true total: {current_total + verified_gap}")


if __name__ == "__main__":
    main()
