#!/usr/bin/env python3
"""Smoke-check Labs Lend feeds for Lego Labs (Apps Script + GitHub fallback)."""

from __future__ import annotations

import json
import sys
import urllib.request

GAS_URL = (
    "https://script.google.com/macros/s/AKfycbwap2a3QP0VNx-p9cv-"
    "MbDXLuWKq0eOqNyCT8ZjwDblbXPIN0uOkV_FFPCR2ujhSlSngw/exec?project=labs-lend-borrow"
)
GITHUB_URL = (
    "https://raw.githubusercontent.com/GithubRavilS/Lendingdepositrates/"
    "main/data/embed/top-borrow-stablecoins.json"
)


def check_payload(payload: dict, label: str) -> bool:
    if not payload.get("ok"):
        print(f"FAIL [{label}]: ok is not true", file=sys.stderr)
        return False
    items = payload.get("items") or []
    if not items:
        print(f"FAIL [{label}]: no items", file=sys.stderr)
        return False
    apys = [float(x["borrow_apy"]) for x in items if x.get("borrow_apy") is not None]
    if apys != sorted(apys):
        print(f"FAIL [{label}]: borrow_apy not ascending", apys, file=sys.stderr)
        return False
    print(f"OK [{label}]: {len(items)} rows; top APY {apys[0] if apys else '—'}")
    return True


def fetch_json(url: str) -> dict:
    req = urllib.request.Request(url, headers={"User-Agent": "LegoLabs-validate/1.0"})
    with urllib.request.urlopen(req, timeout=90) as resp:
        return json.load(resp)


def main() -> int:
    gas_ok = False
    try:
        gas_ok = check_payload(fetch_json(GAS_URL), "gas")
    except Exception as exc:
        print(f"WARN [gas]: {exc}", file=sys.stderr)

    gh_ok = check_payload(fetch_json(GITHUB_URL), "github")

    if gas_ok:
        return 0
    if gh_ok:
        print("WARN: GAS not ready — deploy apps-script/LabsLendBorrow.gs", file=sys.stderr)
        return 0
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
