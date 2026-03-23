from __future__ import annotations

import argparse
from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter, ImageDraw


def border_connected(mask: np.ndarray) -> np.ndarray:
    height, width = mask.shape
    connected = np.zeros((height, width), dtype=bool)
    queue: deque[tuple[int, int]] = deque()

    for row in range(height):
        for col in (0, width - 1):
            if mask[row, col] and not connected[row, col]:
                connected[row, col] = True
                queue.append((row, col))
    for col in range(width):
        for row in (0, height - 1):
            if mask[row, col] and not connected[row, col]:
                connected[row, col] = True
                queue.append((row, col))

    while queue:
        row, col = queue.popleft()
        for next_row, next_col in (
            (row - 1, col),
            (row + 1, col),
            (row, col - 1),
            (row, col + 1),
        ):
            if (
                0 <= next_row < height
                and 0 <= next_col < width
                and mask[next_row, next_col]
                and not connected[next_row, next_col]
            ):
                connected[next_row, next_col] = True
                queue.append((next_row, next_col))

    return connected


def kernel_size(radius: int) -> int:
    if radius < 1:
        raise ValueError("radius must be >= 1")
    return (radius * 2) + 1


def apply_close(alpha: Image.Image, radius: int) -> Image.Image:
    return alpha.filter(ImageFilter.MaxFilter(kernel_size(radius))).filter(
        ImageFilter.MinFilter(kernel_size(radius))
    )


def apply_open(alpha: Image.Image, radius: int) -> Image.Image:
    return alpha.filter(ImageFilter.MinFilter(kernel_size(radius))).filter(
        ImageFilter.MaxFilter(kernel_size(radius))
    )


def fill_holes(alpha: Image.Image) -> Image.Image:
    arr = np.array(alpha)
    transparent = arr == 0
    outer_background = border_connected(transparent)
    enclosed = transparent & ~outer_background
    if enclosed.any():
        arr[enclosed] = 255
    return Image.fromarray(arr, mode="L")


def parse_ellipse(raw: str) -> tuple[int, int, int, int]:
    values = [part.strip() for part in raw.split(",")]
    if len(values) != 4:
        raise argparse.ArgumentTypeError("ellipse must be x,y,rx,ry")
    try:
        x, y, rx, ry = (int(value) for value in values)
    except ValueError as exc:
        raise argparse.ArgumentTypeError("ellipse values must be integers") from exc
    if rx < 1 or ry < 1:
        raise argparse.ArgumentTypeError("ellipse radii must be >= 1")
    return x, y, rx, ry


def draw_ellipses(alpha: Image.Image, ellipses: list[tuple[int, int, int, int]], fill: int) -> Image.Image:
    if not ellipses:
        return alpha
    updated = alpha.copy()
    draw = ImageDraw.Draw(updated)
    for x, y, rx, ry in ellipses:
        draw.ellipse((x - rx, y - ry, x + rx, y + ry), fill=fill)
    return updated


def composite_with_alpha(image: Image.Image, alpha: Image.Image) -> Image.Image:
    rgba = image.convert("RGBA")
    rgba.putalpha(alpha)
    return rgba


def flatten_on_dark(image: Image.Image, background: tuple[int, int, int] = (34, 34, 34)) -> Image.Image:
    base = Image.new("RGBA", image.size, (*background, 255))
    return Image.alpha_composite(base, image)


def trim_to_alpha(image: Image.Image) -> Image.Image:
    bbox = image.getchannel("A").getbbox()
    return image.crop(bbox) if bbox else image


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Manual alpha touch-up helper for Sonny PNG cleanup.",
    )
    parser.add_argument("input", type=Path, help="Input PNG path")
    parser.add_argument(
        "-o",
        "--output",
        type=Path,
        help="Output PNG path. Defaults to overwriting the input.",
    )
    parser.add_argument(
        "--preview-dark",
        type=Path,
        help="Optional path for a dark-background preview PNG.",
    )
    parser.add_argument(
        "--preview-alpha",
        type=Path,
        help="Optional path for the alpha-mask preview PNG.",
    )
    parser.add_argument(
        "--fill-holes",
        action="store_true",
        help="Fill enclosed transparent holes while preserving border-connected openings.",
    )
    parser.add_argument(
        "--close",
        type=int,
        action="append",
        default=[],
        help="Apply alpha morphological close with the given radius. Repeatable.",
    )
    parser.add_argument(
        "--open",
        type=int,
        action="append",
        default=[],
        help="Apply alpha morphological open with the given radius. Repeatable.",
    )
    parser.add_argument(
        "--add-ellipse",
        type=parse_ellipse,
        action="append",
        default=[],
        help="Force alpha on inside an ellipse: x,y,rx,ry. Repeatable.",
    )
    parser.add_argument(
        "--remove-ellipse",
        type=parse_ellipse,
        action="append",
        default=[],
        help="Force alpha off inside an ellipse: x,y,rx,ry. Repeatable.",
    )
    parser.add_argument(
        "--trim",
        action="store_true",
        help="Crop the output to the non-transparent alpha bounds.",
    )
    return parser


def main() -> None:
    parser = build_parser()
    args = parser.parse_args()

    image = Image.open(args.input).convert("RGBA")
    alpha = image.getchannel("A")

    if args.fill_holes:
        alpha = fill_holes(alpha)
    for radius in args.close:
        alpha = apply_close(alpha, radius)
    for radius in args.open:
        alpha = apply_open(alpha, radius)
    alpha = draw_ellipses(alpha, args.add_ellipse, fill=255)
    alpha = draw_ellipses(alpha, args.remove_ellipse, fill=0)

    result = composite_with_alpha(image, alpha)
    if args.trim:
        result = trim_to_alpha(result)

    output_path = args.output or args.input
    output_path.parent.mkdir(parents=True, exist_ok=True)
    result.save(output_path)

    if args.preview_dark:
        args.preview_dark.parent.mkdir(parents=True, exist_ok=True)
        flatten_on_dark(result).save(args.preview_dark)
    if args.preview_alpha:
        args.preview_alpha.parent.mkdir(parents=True, exist_ok=True)
        result.getchannel("A").save(args.preview_alpha)

    print(f"saved {output_path}")
    if args.preview_dark:
        print(f"saved {args.preview_dark}")
    if args.preview_alpha:
        print(f"saved {args.preview_alpha}")


if __name__ == "__main__":
    main()
