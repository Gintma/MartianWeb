#!/usr/bin/env python3

from __future__ import annotations

import re
import sys
import urllib.request
from pathlib import Path
from urllib.parse import urlparse
from urllib.error import URLError, HTTPError


ROOT = Path("/Users/lee/tmp")
HTML_PATH = ROOT / "index.html"
CSS_PATH = ROOT / "assets" / "martians-font.webflow.css"
OUT_DIR = ROOT / "assets" / "mirrored"

URL_RE = re.compile(r"https://cdn\.prod\.website-files\.com[^\"')\s,]+")


def collect_urls(text: str) -> list[str]:
    return sorted(set(URL_RE.findall(text)))


def local_name(url: str) -> str:
    parsed = urlparse(url)
    name = Path(parsed.path).name
    return name or "asset"


def download(url: str, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    with urllib.request.urlopen(url, timeout=20) as response:
        dest.write_bytes(response.read())


def rewrite(text: str, mapping: dict[str, str]) -> str:
    updated = text
    for remote, local in mapping.items():
        updated = updated.replace(remote, local)
    return updated


def main() -> int:
    html = HTML_PATH.read_text()
    css = CSS_PATH.read_text()
    urls = sorted(set(collect_urls(html) + collect_urls(css)))

    mapping: dict[str, str] = {}
    failures: list[str] = []
    for url in urls:
        filename = local_name(url)
        dest = OUT_DIR / filename
        if not dest.exists():
            try:
                print(f"download {url} -> {dest}")
                download(url, dest)
            except (URLError, HTTPError, TimeoutError) as exc:
                print(f"skip {url} ({exc})")
                failures.append(url)
                continue
        mapping[url] = f"./assets/mirrored/{filename}"

    HTML_PATH.write_text(rewrite(html, mapping))
    CSS_PATH.write_text(rewrite(css, mapping))
    print(f"mirrored {len(urls)} assets")
    if failures:
        print(f"failed {len(failures)} assets")
    return 0


if __name__ == "__main__":
    sys.exit(main())
