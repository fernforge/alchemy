"""Alchemy — human-quality writing rules for AI agents.

The rules themselves live in ALCHEMY.md next to this module. `rules()` returns
their text; the `alchemy` command-line tool writes them into a project.
"""
from importlib import resources

__version__ = "0.1.0"


def rules() -> str:
    """Return the full text of the Alchemy ruleset."""
    return resources.files(__package__).joinpath("ALCHEMY.md").read_text(encoding="utf-8")


__all__ = ["rules", "__version__"]
