# rodrigorocha.dev

Personal site: CV, projects, and a way to get in touch. Plain HTML, CSS and a
little vanilla JS — no build step, no framework, no dependencies. Self-hosted
[Clash Grotesk](https://www.fontshare.com/fonts/clash-grotesk) (display) and
[Satoshi](https://www.fontshare.com/fonts/satoshi) (body), both under the ITF
Free Font License — see `fonts/LICENSE-Fontshare.txt`.

## Page structure

One page, ordered the way a visitor scans it: who and what, the proof, where
I've worked, the background, how to reach me. The section layouts are adapted
from free sections in the [Oversight Supply](https://supply.madebyoversight.com/sections?price=free)
library (Evergrid template and the Vinyl portfolio hero), rebuilt by hand in
this site's own design system rather than copied.

| Section | What it does | Pattern it adapts |
| --- | --- | --- |
| Hero | Pitch, CTAs, and an "at a glance" panel: now, last role, open source, location, one headline number | Evergrid Hero 01 (status pill, proof panel), Vinyl (round-icon CTA, "find me on" row) |
| Work | Four project cards with one shared anatomy, in a 2×2 grid | Evergrid Case Studies / Use Cases 01 (outcome-first cards, round arrow button) |
| Work → open source | The Kubernetes PR as a band with a progress stepper | Evergrid How It Works 01 (numbered steps on a connector) |
| Work → more projects | The long tail as a numbered index | Vinyl's tracklist |
| Experience | Two role cards, newest first (SolvIt, DEI): summary, contributions, stack, and beside them a photo or a results panel | Evergrid About Us Features 01/02 (copy beside a visual or a big stat) |
| About | Toolkit spec table, then Education and Beyond the code timelines | — |
| Contact | One panel: the ask on the left, every contact route as a list on the right | Evergrid Contact 01 + CTA 01 |
| Footer | Name and line, two short link columns, bottom bar | Evergrid Footer 01, simplified |

**Card anatomy** (every project card, so they compare at a glance): name and
year → the outcome line (the big text) → one-line description → up to three
points → tags → footer with context on the left and the code link (or
"Private repository") on the right. Tags and footer are pinned to the bottom so
they line up across a row.

## Design system

Dark, high-contrast and warm. The whole system lives in `styles/tokens.css`;
nothing anywhere else hardcodes a colour, so the site repaints from that one
file.

| Token | Value | Used for |
| --- | --- | --- |
| `--bg` | `#0C0C0C` | page ground, inset stat panels |
| `--surface` | `#141414` | cards and panels |
| `--surface-light` | `#1C1C1C` | tags, icon tiles, pipeline chips |
| `--accent` | `#E8553A` | Sunset Red — actions, dots, numbers, the one gradient |
| `--warm` | `#D4A574` | Sand Warmth — organisation lines, status labels |
| `--text` | `#F0EDE8` | body copy |
| `--text-2` | `#B0ADA8` | secondary copy |
| `--muted` | `#8A8A8A` | dates, labels, meta |
| `--ghost` | `rgba(255,255,255,.05)` | the signature container border |

**Rules the system holds to:**

- **Clash Grotesk for display text only:** headings, card outcome lines,
  stats and the logo. Satoshi carries every piece of body text and UI.
- **Thin borders and translation, never heavy shadows.** Cards lift 6px on
  hover; depth comes from the 5% white "ghost" edge. Radius steps down as
  elements nest: 24px panels, 16px cards, 12px tiles, 8px chips.
- **One motion curve.** `--ease: cubic-bezier(0.22, 1, 0.36, 1)` on every
  card, button and link, so the page moves with a single hand.
- **Body text is never coloured.** Only `--text` or `--text-2`; the accent is
  for actions, highlights, numbers and dots. No blue links.
- **One gradient** (accent → warm), on the surname in the hero. Stats use
  plain text with the unit in the accent instead.
- Every animation folds away under `prefers-reduced-motion`.

**Shared components** (all in `tokens.css`): `.pill` (status with a live
dot), `.btn--lead` + `.btn-dot` (icon in its own circle inside the button),
`.text-link` (the quiet third tier after filled and ghost buttons),
`.arrow-link` + `.arrow-link-dot` (label and round arrow button — the way into
code, on project cards, the open-source band and the DEI role card),
`.status` (where a project stands), `.tags`, `.section-head--split`,
`.block-title`, `.visually-hidden`, `.unit`.

## Files

```
index.html    all markup and content, plus the inline icon sprite (Phosphor
              Icons, light weight, MIT; a few drawn on the same 256 grid
              with 12-unit round strokes so they match)
styles/       loaded as separate <link> tags in source order, no build step:
                tokens.css      fonts, colour/type/space tokens, reset,
                                shared components, reveal
                background.css  grain, grid pattern, floating geometry,
                                scroll progress
                nav.css         sticky 64px header and the mobile menu
                hero.css        hero pitch and the "at a glance" panel
                projects.css    work cards, the open-source band and
                                stepper, the numbered index
                experience.css  role cards, pipeline strip, results panel,
                                Toolkit table
                timeline.css    Education / Beyond the code timelines,
                                photo figure
                contact.css     contact panel, footer
script.js     mobile nav, scroll reveal, active nav link, footer year
fonts/        self-hosted Clash Grotesk (600, 700) + Satoshi (400, 500, 700)
images/       photos used in Experience and Beyond the code
favicon.svg
Rodrigo-Rocha-CV.pdf
_headers      cache + security headers (CSS/JS/HTML no-cache so a deploy is
              never stuck behind a stale browser cache; fonts cached hard)
wrangler.jsonc  Cloudflare Workers static-assets config (name: rodrigo-rocha)
```

## Three things worth knowing before editing

- **`@font-face` paths are relative to `styles/`, not to the page.** They read
  `../fonts/…`. A bare `fonts/…` resolves to `styles/fonts/` and silently
  falls back to a system font.
- **Anything that hides content pending a scroll reveal is scoped to
  `html.js`**, a class `script.js` adds before it can throw. Most of the page
  sits inside a `.reveal`, so an unconditional `opacity: 0` would mean a
  blocked or failed script renders a blank site. Keep that scoping if you add
  new reveal states.
- **The scroll reveal is a CSS animation, and card lifts use `translate`.**
  Cards are both reveal targets and hover targets. A `transition` shorthand on
  `.js .reveal` would out-specify each card's own transition list and drop its
  hover easing, and a held `transform` would block a `transform` lift. Keep
  hover lifts on the individual `translate` property.

## Where the content comes from

**The CV (`Rodrigo-Rocha-CV.pdf`) is the source of truth** for study status,
roles, dates and skills — when it and the GitHub bio disagree, the CV wins.
Whenever the CV changes, re-check the hero line, the "at a glance" panel,
Experience and Education against it. Project copy is written from the
repositories themselves (READMEs and commit history), so it can be
re-checked against them:

| On the site | Source | Visibility |
| --- | --- | --- |
| Hero, "at a glance", Education | the CV (final year, already taking M.EIC units) | — |
| SolvIt internship (Jul – Sep 2026) | the CV + `RochaCodes/imageclassifier` | private |
| DEI internship (exam timetabling, Feb – Jul 2026) and its stats (88.9%, 78.1%) | the CV; code in `RochaCodes/calendarioexames`, which continues the original project repo | public |
| Rotina | `RochaCodes/rotina` | private |
| Spotiganizer | `RochaCodes/Spotiganizer` | public |
| Teoria Musical | `RochaCodes/teoriamusical` | public |
| Tuna Feminina de Biomédicas | `RochaCodes/tfb-site` | private |
| Kubernetes fix | `kubernetes/kubernetes#141622` (fixes #141572) | public, **open — update the stepper when it merges** |
| More projects | EBEC from the CV; then `FEUP-MEIC-DS-2026-27/Staffing-Alocation-Prototype_1MEIC05T1`, `appCE`, `josearcher/IA-Project-`, `RCOM_LAB1`, `AppTuna`, `FEUP-LTW-2025/ltw-project-ltw13g05` | private / course |

## Before this goes live

- [ ] **Check the SolvIt card is OK to publish.** The pipeline stages and the
      last bullet (cheapest-first cascade, vision-model fallback, review
      queue) come from the private `imageclassifier` repo, beyond what the CV
      says. Trim them if SolvIt would rather they stay internal.
- [ ] **Tuna Feminina de Biomédicas** is named on the site and the new site
      isn't live yet. Add a link once it is, and confirm they're happy to be
      named.
- [ ] **Kubernetes PR.** When #141622 merges, change the status pill to
      "Merged", fill in step 5 with the date, and update the "at a glance"
      row.
- [ ] Swap the canonical/OG URL comments in `index.html`'s `<head>` for your
      real domain once it's live, and add an `og:image` (1200×630 PNG).

## Run it locally

No build step, just serve the folder:

```bash
npx serve .
# or
python -m http.server 8080
```

## Deploy

Already live at **https://rodrigo-rocha.up202305891.workers.dev** as a
Cloudflare Workers static-assets project (Cloudflare folded Pages into
Workers; `wrangler.jsonc` here is that project's config, name `rodrigo-rocha`
— don't rename it, or a redeploy creates a new, separate Worker instead of
updating this one, which happened once already).

```bash
npx wrangler login      # once, opens a browser to authorize
npx wrangler deploy     # every time after that
```

`rodrigorocha.dev` was unregistered as of Sep 2026 (checked via the official
.dev registry). To use it: register it (Cloudflare Registrar is the obvious
place since the site's already there), then Workers & Pages → `rodrigo-rocha`
→ Custom domains → add it.

No environment variables, no database, no server, nothing else to configure.
