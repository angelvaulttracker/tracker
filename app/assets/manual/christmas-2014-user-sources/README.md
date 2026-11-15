# Christmas Series 2014 supplied photo cutouts

Seven transparent PNGs from two user-supplied lineup photos: Santa Claus,
Reindeer, Chocolate Cake and Poinsettia, plus blue secret Santa Claus, blue secret
Reindeer and Blue Snow Robby Angel. Local background removal retains original
RGB and lighting, including the pale antlers and white trim. No generative image
services were used. Lineup titles, surrounding graphics and neighboring figures
are excluded by the crop boxes and segmentation masks.

Source filenames, crops and dimensions are recorded in `sources.json`. The
reusable batch is `scripts/photo_batches/christmas-2014.json`. Run the incremental
local pipeline with that manifest and `--source-dir` pointing to the originals.
Catalog IDs and existing secret flags are preserved.
