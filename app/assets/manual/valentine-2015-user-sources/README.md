# Valentine’s Day 2015 supplied photo cutouts

Four regular figures (Milk, Strawberry, White and Bitter Chocolate) and two
secrets (Mint Chocolate and Mint Chocolate Robby Angel), extracted locally from
three user-supplied photos. Source colors and lighting are retained; no figure
pixels were generated. Lineup headers and labels are excluded by crop boxes.

See `sources.json` for source filenames and crop coordinates. The reusable batch
configuration is `scripts/photo_batches/valentine-2015.json`. Run the incremental
pipeline with that manifest and `--source-dir` pointing to the original photos.

Both existing Mint Chocolate IDs (page-38-26 and page-38-27) already shared the
same catalog name and source crop. Both now link to the same verified Mint
Chocolate secret photo. IDs were preserved; no catalog entries were merged.
The supplied lineup calls the fourth figure Dark Chocolate; the existing catalog
name Bitter Chocolate is retained.
