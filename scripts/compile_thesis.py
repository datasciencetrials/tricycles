"""Compatibility entry point for the governed public thesis extract.

The former compiler generated random appendices and is intentionally retired.
Use the source-reconciled builder so the public document cannot regress to
synthetic or unlabelled evidence.
"""

from generate_governed_thesis_extract import build


if __name__ == "__main__":
    build()
