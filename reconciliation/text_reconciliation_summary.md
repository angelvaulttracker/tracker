# Text Reconciliation Summary

Generated from:
- `app/data/sonnies.json`
- `app/data/sonny_image_map.json`
- `sonny_png_library/manifest.csv`

## Coverage

- Local tracker entries: `1445`
- Official web text rows in manifest: `713`
- Local entries linked to official-web rows: `632`
- Official-web rows linked to local entries: `578`
- Official-web rows still unlinked: `74`

## Audit files

- [reconciliation/official_name_diffs.csv](/Users/isabelatellez/Documents/sonnies/reconciliation/official_name_diffs.csv)
- [reconciliation/official_series_gaps.csv](/Users/isabelatellez/Documents/sonnies/reconciliation/official_series_gaps.csv)
- [reconciliation/official_rows_unlinked.csv](/Users/isabelatellez/Documents/sonnies/reconciliation/official_rows_unlinked.csv)

## Top official series with unlinked rows

- `HIPPERS Cherry Blossom Series`: `12` unlinked
  Examples: Peacock, Dalmatian, Fawn, Monkey, Shiba Inu, Reindeer
- `Snack Series`: `12` unlinked
  Examples: Hamburger, Fried Chicken Sandwich, Coffee, French Fries, Hot Dog, Donut
- `Advent Calendar(2025)`: `11` unlinked
  Examples: Rabbit, Lion, Starfish, Rose, Candy, Penguin
- `Cherry Blossom Series -Hanami Edition-`: `6` unlinked
  Examples: Fawn, Rabbit, Parrot, Sheep, Calico Cat, Goat
- `I LOVE RAINY DAY Series`: `6` unlinked
  Examples: Goldfish, Elephant, Axolotl, Hippopotamus, Duck, Frog
- `Pumpkin Patch Series`: `6` unlinked
  Examples: Panda, Cat, Frog, Mouse, Elephant, Lop Ear Rabbit
- `Santa's Little Helper Series`: `6` unlinked
  Examples: Lop Ear Rabbit, Pig, Sloth, Elephant, Dalmatian, Duck
- `Strawberry Love Series`: `6` unlinked
  Examples: Rabbit, Lop Ear Rabbit, Monkey, Mouse, Strawberry, Fawn
- `Kiss Kiss(2025)`: `5` unlinked
  Examples: Fennec, Mouse, Rabbit, Cat, Elephant
- `Fruit Series`: `4` unlinked
  Examples: Raspberry, Orange, DragonFruit, Durian

## How to use this

- Start with `official_name_diffs.csv` to catch rows where the local text disagrees with a matched official row.
- Use `official_series_gaps.csv` to find official series that are underrepresented in the current tracker.
- Use `official_rows_unlinked.csv` to locate official text rows that have no linked local entry yet.
