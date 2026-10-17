"""Find ./pythonembedded and put its libraries on sys.path.

The folder name is pythonembedded. python_embeded is accepted because that is
the spelling used by some portable Windows runtimes.
"""

from __future__ import annotations

import sys
from pathlib import Path

EMBED_NAMES = ("pythonembedded", "python_embeded")


def studio_root() -> Path:
    here = Path(__file__).resolve()
    # engine/locgen/runtime.py -> studio root is the parent of engine/
    return here.parents[2]


def embedded_python() -> Path | None:
    roots = [Path.cwd(), studio_root(), studio_root().parent]
    for root in roots:
        for name in EMBED_NAMES:
            for exe in ("python.exe", "python"):
                candidate = root / name / exe
                if candidate.is_file():
                    return candidate
    return None


def prefer_embedded() -> None:
    roots = [Path.cwd(), studio_root()]
    for root in roots:
        for name in EMBED_NAMES:
            site = root / name / "Lib" / "site-packages"
            if site.is_dir():
                entry = str(site)
                if entry not in sys.path:
                    sys.path.insert(0, entry)
                return
