# Text-Based Sonny Angel Source Inventory

Last updated: 2026-03-15

## What exists online

There does **not** appear to be a single free, official, text-only master page listing all `1,482` Sonny Angel products in one place.

The best text-based sources currently available are:

1. Official Sonny Angel product category pages
2. Official Sonny Angel release / announcement posts
3. Fan-maintained checklist pages that expose lineup names as plain text

## Best official text sources

### Official product category pages

These pages expose series names and many figure names as HTML text instead of only images:

- `https://www.sonnyangel.com/en/products/`
  - Regular mini figure products
  - Text is present for many modern and standard series
- `https://www.sonnyangel.com/en/products/minifigure-limited/`
  - Limited mini figure products
  - Useful for many seasonal / special series
- `https://www.sonnyangel.com/en/products/hippers/`
  - HIPPERS lines
- `https://www.sonnyangel.com/en/products/artist-collection/`
  - Artist / collaboration lines
- `https://www.sonnyangel.com/en/products/others/`
  - Other Sonny Angel products

### Official book / total-count reference

- `https://www.sonnyangel.com/en/2024/12/18/20th-anniversary-book/`
  - Official statement that the 20th Anniversary Guide Book covers `1,482` products
  - Good for total-count validation, not a machine-readable lineup list by itself

### Official release posts

When a product page does not expose all names clearly in text, individual announcement pages often do. These are good spot-check sources for missing or questionable series.

Examples already identified in this workspace:

- `https://www.sonnyangel.com/en/2024/04/26/hippers-lookingback/`
- `https://www.sonnyangel.com/en/2021/01/25/bobbing-head2021/`
- `https://www.sonnyangel.com/en/2014/04/04/%E4%BA%BA%E6%B0%97%E3%83%95%E3%82%A1%E3%83%83%E3%82%B7%E3%83%A7%E3%83%B3%E9%9B%91%E8%AA%8C%E3%80%81%E3%83%8A%E3%82%A4%E3%83%AD%E3%83%B3-%E3%82%B8%E3%83%A3%E3%83%91%E3%83%B3%E3%81%A8%E3%80%81%E3%82%BD/`
- `https://www.sonnyangel.com/en/2014/11/20/%E9%9F%93%E5%9B%BD%E6%9C%80%E5%A4%A7%E7%B4%9A%E3%81%AE%E5%8C%96%E7%B2%A7%E5%93%81%E3%83%A1%E3%83%BC%E3%82%AB%E3%83%BC%E3%80%8Camorepacific%E3%80%8D%E3%81%A8%E3%82%BD%E3%83%8B%E3%83%BC%E3%82%A8/`
- `https://www.sonnyangel.com/en/2015/11/16/%E9%9F%93%E5%9B%BD%E3%81%AE%E4%BA%BA%E6%B0%97%E3%83%8D%E3%82%A4%E3%83%AB%E3%83%96%E3%83%A9%E3%83%B3%E3%83%89modi%E3%81%A8%E3%81%AE%E3%82%B3%E3%83%A9%E3%83%9C%E4%BC%81%E7%94%BB%E7%AC%AC2%E5%BC%BE/`

## Best unofficial text source

### SonnyAngelWorld

- `https://sonnyangelworld.com/`

This fan site appears to expose many series lineups as plain text on dedicated pages, for example:

- `https://sonnyangelworld.com/series/hippers-looking-back-series/`
- `https://sonnyangelworld.com/series/message-of-love-series/`
- `https://sonnyangelworld.com/series/charm-candy-store-series/`
- `https://sonnyangelworld.com/series/japanese-good-luck-series/`
- `https://sonnyangelworld.com/series/winter-wonderland-series/`

### Reliability notes

Useful for broad coverage, but not authoritative enough to import blindly.

Observed issues:

- spelling mistakes in page titles or figure names
- inconsistent naming conventions
- likely normalization differences versus official Sonny Angel naming

Examples seen during review:

- `HIPPERS Harverst Series`
- `Raindeer`

## What we already have locally

- [app/data/sonnies.json](/Users/isabelatellez/Documents/sonnies/app/data/sonnies.json)
  - current working tracker
  - `1,440` entries as of 2026-03-15
- [sonny_png_library/manifest.csv](/Users/isabelatellez/Documents/sonnies/sonny_png_library/manifest.csv)
  - text manifest of `713` official-web image rows
  - columns: `series`, `name`, `image_url`, `page_url`, plus folder metadata
  - appears to be derived from official Sonny Angel web product pages
- [reconciliation/official_refs.md](/Users/isabelatellez/Documents/sonnies/reconciliation/official_refs.md)
  - existing reconciliation notes

## Practical recommendation

For fixing wrong entries, the safest comparison stack is:

1. Official Sonny Angel product pages as the primary text source
2. Official release posts for series where product pages are incomplete
3. SonnyAngelWorld only as a discovery / gap-finding source
4. The local 20th Anniversary Guide Book as the final visual confirmation source

## Bottom line

Yes, there are written-down text sources online that we can compare against the database.

But there is **not** a single complete official master list online, so reconciliation will still need a merged catalog built from multiple text sources.
