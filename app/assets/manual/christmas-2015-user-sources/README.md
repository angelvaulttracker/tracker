# Christmas Series 2015 supplied photo cutouts

Seven transparent PNGs: regular Santa Claus, Reindeer, Christmas Tree and Christmas
Candle; secret Santa Claus and Reindeer; and White Snow Robby Angel. Locally
segmented from four user-supplied files, retaining original RGB and lighting.
No generative image services were used.

The regular lineup is only 350 by 350 pixels; each figure is roughly 150 pixels
tall. These assets preserve source resolution rather than inventing detail.
Higher-resolution versions can replace them later without changing catalog IDs.

The secret Reindeer mask restores its left antler using an alpha polygon that
reveals original source pixels. This correction is recorded in the batch
manifest, `scripts/photo_batches/christmas-2015.json`. Source filenames, crops
and dimensions are recorded in `sources.json`.

Run `scripts/process_catalog_photos.py` with that manifest and `--source-dir`
pointing to the original files. Unchanged figures are skipped by the local cache.
