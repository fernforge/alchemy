"""Command-line tool: install the Alchemy ruleset into the current project."""
import sys
from pathlib import Path

from . import rules

POINTER = (
    "\n## Writing style\n\n"
    "When writing prose (docs, READMEs, comments, commits, replies), follow the rules in "
    "`ALCHEMY.md` in this repo: write human-quality text, avoid the tell-tale LLM patterns.\n"
)

# Agent config files that take a natural-language pointer. First existing one wins.
AGENT_FILES = ["CLAUDE.md", "AGENTS.md", ".cursorrules", ".github/copilot-instructions.md"]

HELP = """alchemy - human-quality writing rules for AI agents

Usage:
  alchemy init     Write ALCHEMY.md into this project and link it from your agent
                   config (CLAUDE.md / AGENTS.md / etc).
  alchemy print    Print the ruleset to stdout.
  alchemy --help   Show this.

Flags:
  --force    Overwrite an existing ALCHEMY.md.
  --no-link  Don't touch agent config files; just write ALCHEMY.md.
"""


def _init(argv):
    text = rules()
    dest = Path.cwd() / "ALCHEMY.md"

    if dest.exists() and "--force" not in argv:
        print("* ALCHEMY.md already exists - left it alone (use --force to overwrite).")
    else:
        dest.write_text(text, encoding="utf-8")
        print("[ok] wrote ALCHEMY.md")

    if "--no-link" in argv:
        return _done()

    for rel in AGENT_FILES:
        p = Path.cwd() / rel
        if not p.exists():
            continue
        cur = p.read_text(encoding="utf-8")
        if "ALCHEMY.md" in cur:
            print(f"* {rel} already references ALCHEMY.md")
        else:
            p.write_text(cur.rstrip() + "\n" + POINTER, encoding="utf-8")
            print(f"[ok] linked ALCHEMY.md from {rel}")
        return _done()

    print(
        "* no agent config found. Add this line to your CLAUDE.md / AGENTS.md / .cursorrules:\n"
        "    See ALCHEMY.md for writing style."
    )
    _done()


def _done():
    print("\nDone. Your agent now has the rules. Review ALCHEMY.md and tune to taste.")


def main(argv=None):
    argv = list(sys.argv[1:] if argv is None else argv)
    cmd = argv[0] if argv else None
    if cmd in (None, "--help", "-h", "help"):
        print(HELP)
    elif cmd == "init":
        _init(argv[1:])
    elif cmd == "print":
        # Write UTF-8 bytes directly: the ruleset has characters (em-dash, emoji it
        # cites as examples) that a Windows cp1252 console can't encode via stdout.write.
        data = rules()
        try:
            sys.stdout.buffer.write(data.encode("utf-8"))
        except AttributeError:
            sys.stdout.write(data)
    else:
        sys.stderr.write(f'alchemy: unknown command "{cmd}"\n\n')
        print(HELP)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
