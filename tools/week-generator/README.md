# Week-page generator

A small Node script that generates the bootcamp's weekly lesson pages
`weeks/week-05.html` through `weeks/week-12.html` from a single content
file. All eight pages share one HTML/CSS template, so content lives in
data and the layout lives in code.

## Scope: weeks 5–12 only

This tool generates **only** `weeks/week-05.html` … `weeks/week-12.html`.

Weeks **01–04** (`weeks/week-01.html` … `weeks/week-04.html`) are
**hand-authored** and are **not** produced by this generator. Do not
regenerate or overwrite them — this script never touches them.

## Source of truth

`content.js` is the source of truth for weeks 5–12. To change any of
those pages, **edit `content.js`, re-run the generator, and commit the
regenerated HTML** — do not hand-edit the generated `week-0X.html`
files, as your changes would be lost on the next run.

`gen.js` holds the shared template (HTML skeleton + CSS + rendering
logic). Edit it only when you want to change layout/styling for all
eight pages at once.

## How to run

```
cd tools/week-generator
node gen.js
```

Requires Node (developed against v22). The script writes the eight
files to `../../weeks/` (resolved relative to the script location, so it
works regardless of where the repo is checked out).

## Per-week content shape

`content.js` exports an array of week objects. Each object has:

- `num` — zero-padded week number as a string, e.g. `'05'`.
- `accent` — theme color: `'purple'`, `'green'`, or `'amber'`.
- `phase` — the phase label, e.g. `'Build with AI'`.
- `title` — the week's title.
- `desc` — meta description (used in `<meta name="description">`).
- `time` — estimated time chip, e.g. `'≈ 3 hours'`.
- `ship` — the week's "ship" chip (HTML allowed).
- `lead` — the intro paragraph under the title (HTML allowed).
- `objectives` — array of HTML strings ("by the end of this week").
- `intro` — `{ cls, icon, html }` for the callout note under objectives
  (`cls` is a note modifier such as `''`, `'tip'`, or `'warn'`).
- `steps` — array of `{ id, toc, title, est, body }`. `id` is the
  anchor/section id, `toc` is the short label shown in the on-page table
  of contents, `title` is the section heading, `est` is the time
  estimate, and `body` is the section's HTML. Steps are numbered
  automatically and cycle through six accent styles.
- `done` — array of HTML strings for the "Definition of done" checklist.
- `demo` — array of HTML strings for the Friday demo list.
- `faqs` — array of `{ q, a }` for the "Common snags" accordion.
- `prev` — `{ href, label }` for the previous-page pager card.
- `next` — `{ href, label }` for the next-page pager card. Add
  `soon: true` to render it as a disabled "(soon)" card.

Content strings are embedded into a JS template literal, so avoid
literal backticks and `${` sequences inside them.
