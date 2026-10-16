"""Build the saved homepage at the root of the GitHub Pages site."""

from pathlib import Path
import re
import shutil


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "_site"
HOMEPAGE = "Scholz Electrical _ Brisbane Master Electricians.html"
ASSETS = "Scholz Electrical _ Brisbane Master Electricians_files"


def main() -> None:
    if OUTPUT.exists():
        shutil.rmtree(OUTPUT)
    OUTPUT.mkdir()
    for directory in ("homepage", "cro"):
        shutil.copytree(ROOT / directory, OUTPUT / directory)

    page = (ROOT / "homepage" / HOMEPAGE).read_text(encoding="utf-8")
    replacements = {
        f"./{ASSETS}/": f"./homepage/{ASSETS}/",
        "../cro/": "./cro/",
        "./navigation.css": "./homepage/navigation.css",
        "./navigation.js": "./homepage/navigation.js",
        "./services-layout.css": "./homepage/services-layout.css",
        "./services-layout.js": "./homepage/services-layout.js",
    }
    for old, new in replacements.items():
        page = page.replace(old, new)
    page = re.sub(r' src="blob:[^"]+"', "", page)
    page = page.replace(
        "</head>", '<meta name="robots" content="noindex,nofollow">\n</head>', 1
    )
    (OUTPUT / "index.html").write_text(page, encoding="utf-8")
    (OUTPUT / ".nojekyll").touch()
    (OUTPUT / "robots.txt").write_text("User-agent: *\nDisallow: /\n", encoding="utf-8")


if __name__ == "__main__":
    main()
