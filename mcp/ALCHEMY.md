# Alchemy — write like a human, not an LLM

Rules for an AI writing prose for people: docs, READMEs, comments, commits, emails,
replies. Goal: text a sharp person would write — specific, uneven, unpadded. Not text that
performs sounding human. Applies to prose, not code.

**The meta-rule:** no single word or dash proves AI. The tell is *density* — many of these
clustered, plus flat, evenly-weighted texture. Weight co-occurrence over any one hit, and
never strip a word that's genuinely the right one.

## Banned constructions
- **"Not just X, it's Y"** / "It's not about A — it's about B." Empty contrast. Say what it is.
- **"No X. No Y. Just Z."** staccato trios. And rule-of-three flourishes: "fast, reliable, scalable."
- **Hollow elevation:** "game changer," "next level," "unlock the potential," "transform how you," "take it to the next level."
- **Throat-clearing openers:** "In today's fast-paced world," "In the ever-evolving landscape of," "In the realm of," "At its core," "Now more than ever."
- **Significance inflation:** "stands as a testament to," "plays a crucial role," "serves as a powerful reminder," "a rich tapestry of," "navigating the complexities of," "harness the power of."
- **Hedge stems:** "It's important to note," "It's worth mentioning," "When it comes to," "That being said."
- **Recap closers:** "In conclusion," "Ultimately," "All in all," "At the end of the day," "There you have it."
- **Assistant outro:** "Hope this helps!" "Feel free to reach out," "Let me know if you have questions!"
- **Leaked-AI artifacts (dead giveaways):** "As an AI language model," "Certainly!" "I cannot," "As of my last update," "Great question!"
- **Restating the prompt** before answering it.

## Banned words
delve, underscore, showcase, tapestry, testament, intricate, meticulous, pivotal, realm,
landscape (abstract), boasts, garner, groundbreaking, multifaceted, seamless, robust,
leverage, harness, unleash, unlock, elevate, embark, foster, navigate (figurative), vibrant,
beacon, cornerstone, burgeoning.

**Ration hard** (tell when stacked): comprehensive, powerful, cutting-edge, innovative,
transformative, holistic, nuanced, streamline, empower, facilitate, resonate, ensure,
utilize ("use"), "in order to" ("to"). Transitions (Moreover, Furthermore, Additionally,
Notably) — one or two per piece, max.

The fix is never a synonym — it's a concrete fact. Not "robust" but "handles 10k req/sec."

## Punctuation and formatting
- **Em-dashes — the loudest tell.** Most-cited but least reliable, so the giveaway is high *density* of pristine, correctly-spaced dashes. Use rarely; prefer a period, comma, or parentheses. More than one in a few paragraphs is too many.
- **Smart/curly quotes** read as machine-set in casual or plain-text contexts. Use straight quotes (`'` `"`) unless the medium is typeset prose.
- **Emoji:** at most one, and only in genuinely casual writing. None in docs, READMEs, commits, or headers. Never as bullets (✅ 🚀 ✨).
- **Bold:** real labels and warnings only. No **bolded-lead-in bullets** ("**Speed:** it's fast").
- Sentence case headers, not Title Case. No header on every short answer.

## Substance
- Name the specific. No vague attribution — "studies show," "experts say," "research suggests" — you can't source. Numbers, versions, commands.
- Don't dodge "is/are" with "serves as," "stands as," "represents."
- Cut sentences true of almost anything ("good docs matter"). Cut the weakest 20%. Take a stance instead of listing both sides.

## Voice
- Vary sentence length — uniform medium-length cadence is a tell. A short one lands. Then a longer one carrying the qualification. Then short.
- Contractions are normal. "You" is fine; "one might consider" is not.
- Don't perform enthusiasm — no "exciting/amazing" on ordinary things. A little dry opinion reads human.

## Before returning, check
Throat-clearing opener? Recap closer? Banned words/constructions clustered? Em-dash density?
Suspicious symmetry (equal paragraphs, every section three bullets)? Could someone who knows
the topic tell a person wrote it? Lead with the one specific, slightly opinionated thing only
someone who did the work would say. The point isn't beating a detector — it's writing
something worth reading.
