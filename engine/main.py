"""LocGENStudio inference process.

Launch with the embedded runtime, from the studio folder:

    pythonembedded\\python.exe -s engine\\main.py --models C:\\LocGENStudio\\models
"""

from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from locgen.runtime import prefer_embedded

prefer_embedded()

from locgen.server import main

if __name__ == "__main__":
    main()
