"""Generate The Advice Engine brand raster assets (favicons + social card).

Run from the repo root:  python assets/make_brand_assets.py
Regenerate whenever the wordmark, palette or hero line changes.
"""
from PIL import Image, ImageDraw, ImageFont
import os

HERE = os.path.dirname(os.path.abspath(__file__))

INK = (20, 29, 38)
PAPER = (244, 245, 243)
FLAG = (224, 169, 77)
SIGN = (121, 171, 224)
MUTED = (140, 156, 168)
LINE = (51, 67, 77)

FONTS = r"C:\Windows\Fonts"


def font(name, size):
    return ImageFont.truetype(os.path.join(FONTS, name), size)


def rounded_bar(d, x, y, w, h, fill):
    d.rounded_rectangle([x, y, x + w, y + h], radius=h / 2, fill=fill)


def make_icon(size):
    """The document mark: three rules, the middle one flagged."""
    s = 8  # supersample
    img = Image.new("RGBA", (size * s, size * s), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    S = size * s
    d.rounded_rectangle([0, 0, S - 1, S - 1], radius=S * 0.167, fill=INK)
    bar_h = S * 0.08
    left = S * 0.2333
    long_w = S * 0.5333
    short_w = S * 0.3333
    for i, (w, col) in enumerate(
        [(long_w, PAPER), (long_w, FLAG), (short_w, PAPER)]
    ):
        y = S * 0.30 + i * S * 0.16
        rounded_bar(d, left, y, w, bar_h, col)
    return img.resize((size, size), Image.LANCZOS)


def make_og():
    """1200x630 social card."""
    W, H = 1200, 630
    img = Image.new("RGB", (W, H), INK)
    d = ImageDraw.Draw(img)

    # hairline frame
    d.rectangle([40, 40, W - 41, H - 41], outline=LINE, width=1)

    # mark + wordmark
    icon = make_icon(56)
    img.paste(icon, (84, 84), icon)
    d.text((156, 84), "THE", font=font("segoeuib.ttf", 17), fill=MUTED)
    d.text((156, 107), "ADVICE ENGINE", font=font("segoeuib.ttf", 30), fill=PAPER)

    # headline - the third clause carries the accent
    h = font("segoeuib.ttf", 56)
    lines = [
        ("Drafts the paperwork.", PAPER),
        ("Checks the file.", PAPER),
        ("Finds the business", SIGN),
        ("you already had.", SIGN),
    ]
    y = 214
    for text, col in lines:
        d.text((84, y), text, font=h, fill=col)
        y += 69

    # footer rule + strap
    d.line([84, H - 126, W - 84, H - 126], fill=LINE, width=1)
    d.text(
        (84, H - 110),
        "AI-drafted advice paperwork for UK advice firms, in your own brand",
        font=font("segoeui.ttf", 23),
        fill=MUTED,
    )
    d.text(
        (84, H - 76),
        "theadviceengine.ai",
        font=font("segoeuib.ttf", 23),
        fill=PAPER,
    )
    return img


if __name__ == "__main__":
    for px in (32, 180, 512):
        make_icon(px).save(os.path.join(HERE, f"favicon-{px}.png"))
    ico = make_icon(64)
    ico.save(os.path.join(HERE, "..", "favicon.ico"), sizes=[(16, 16), (32, 32), (48, 48)])
    make_og().save(os.path.join(HERE, "og.png"), optimize=True)
    print("written: favicon-32/180/512.png, favicon.ico, og.png")
