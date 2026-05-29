#!/usr/bin/env python3
"""Smoke-check Labs Lend embed JSON (Borrow + stablecoin + top-3 asc)."""

from __future__ import annotations

import json
import sys
import urllib.request

URL = (
    "https://raw.githubusercontent.com/GithubRavilS/Lendingdepositrates/"
    "main/data/embed/top-borrow-stablecoins.json"
)


def main() -> int:
    with urllib.request.urlopen(URL, timeout=60) as resp:
        payload = json.load(resp)
    if not payload.get("ok"):
        print("FAIL: ok is not true", file=sys.stderr)
        return 1
    items = payload.get("items") or []
    if len(items) < 1:
        print("FAIL: no items", file=sys.stderr)
        return 1
    apys = [float(x["borrow_apy"]) for x in items if x.get("borrow_apy") is not None]
    if apys != sorted(apys):
        print("FAIL: borrow_apy not ascending", apys, file=sys.stderr)
        return 1
    for row in items[:3]:
        if row.get("token_family") != "stablecoin":
            print("WARN: token_family", row.get("token_symbol"), row.get("token_family"))
    print("OK:", len(items), "rows; top APY:", apys[0] if apys else "—")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
