# Easter product photo cutouts

Ten transparent PNGs from four original photos supplied by the user in chat.
The user authorized local background removal for these photos. Processing uses
local u2net segmentation with original photo RGB values retained; no generative
image model was used for the final assets. Figure colors and original lighting
are preserved, including the darker secret Hatched Egg photograph.

The eight regular figures are cropped before segmentation to exclude lineup
labels and neighboring figures. The Paint Robby and secret Hatched Egg are
segmented from individual photos. The pale left ear on the 2017 lamb is restored
using a traced alpha contour exposing the original source pixels.

See `sources.json` for original filenames and crop boxes. Regenerate with:

```sh
NUMBA_CACHE_DIR=/tmp/sonnies-numba-cache python3 scripts/process_easter_photos.py --source-dir /path/to/source/photos
```

Requires Pillow, numpy, scipy, rembg, onnxruntime, and a cached u2net model.
Use `--only 2017-easter-lamb` (or another asset basename) to process one image.
The script also rebuilds the checkerboard preview in
`deliverables/easter-cutouts/preview.jpg`.

`app/data/manual_overrides.js` links these assets to existing catalog IDs without
renaming IDs or changing users' collection data. The Hatched Egg secret uses a
separate image from the regular egg. The 2018 Bunny secret has no supplied photo
and remains unchanged. These ten assets do not complete all Easter secret
variants.
