# rodrigorocha.dev

Personal site: CV, projects, and a way to get in touch. Plain HTML, CSS and a
little vanilla JS — no build step, no framework, no dependencies. Self-hosted
[Clash Grotesk](https://www.fontshare.com/fonts/clash-grotesk) (display) and
[Satoshi](https://www.fontshare.com/fonts/satoshi) (body), both under the ITF
Free Font License — see `fonts/LICENSE-Fontshare.txt`.

## Page structure

One column of panels, read top to bottom. The arrangement follows
[carvalhal05.github.io/portfolio](https://carvalhal05.github.io/portfolio/) —
a profile card, then one card per section — rebuilt by hand in this site's
own design system.

| Panel | What's in it |
| --- | --- |
| Header | Name on the left, links to the four main panels on the right (a menu button on phones) |
| Profile | Avatar, name, role, a short bio, "open to roles", and GitHub / LinkedIn / email / Download CV |
| Skills & tools | Five groups of tags, two to a row |
| Experience | SolvIt and DEI, newest first |
| Education | Bachelor's at FEUP, secondary school |
| Projects | Five projects, then a compact numbered list of smaller ones ("More projects") |
| Beyond the code | Tuna, AV technician, mentoring |
| Footer | One line: copyright and email, source and back to top |

**Entry anatomy.** Every role, degree, project and activity is the same
component, `.entry`: meta line (dates, or year and kind; status or "Private
repository") → title (a project's title is its link, with ↗) → organisation
in Sand → a paragraph or bullet points → tags. An optional visual sits on the
right: a photo (SolvIt, Tuna), the project's icon, or the role's numbers
(DEI). Entries are inset on the page ground with a Sunset Red edge down the
left that lights up on hover. On phones the visual moves above the text and
the decorative project icons are dropped.

## Design system

Dark, high-contrast and warm. The whole system lives in `styles/tokens.css`;
nothing anywhere else hardcodes a colour, so the site repaints from that one
file.

| Token | Value | Used for |
| --- | --- | --- |
| `--bg` | `#0C0C0C` | page ground, entries inside panels |
| `--surface` | `#141414` | panels |
| `--surface-light` | `#1C1C1C` | tags, icon tiles, icon buttons |
| `--accent` | `#E8553A` | Sunset Red — actions, entry edges, icons, numbers |
| `--warm` | `#D4A574` | Sand Warmth — role line, organisations, status labels |
| `--text` | `#F0EDE8` | body copy |
| `--text-2` | `#B0ADA8` | secondary copy |
| `--muted` | `#8A8A8A` | dates, labels, meta |
| `--ghost` | `rgba(255,255,255,.05)` | the signature container border |
| `--column` | `920px` | the one column the header, panels and footer share |

**Rules the system holds to:**

- **Clash Grotesk for display text only:** headings, entry titles, stats
  and the logo. Satoshi carries every piece of body text and UI.
- **Thin borders and small translations, never heavy shadows.** Depth comes
  from the 5% white "ghost" edge. Radius steps down as elements nest: 24px
  panels, 12px entries, 8px photos and chips.
- **One motion curve.** `--ease: cubic-bezier(0.22, 1, 0.36, 1)` on every
  entry, button and link, so the page moves with a single hand.
- **Body text is never coloured.** Only `--text` or `--text-2`; the accent is
  for actions, highlights, numbers and edges. No blue links.
- **One gradient** (accent → warm): on the surname and the avatar.
- Every animation folds away under `prefers-reduced-motion`, and hover
  lifts only happen on devices that can hover.

**Components:** `tokens.css` has the shared ones — `.btn` / `.btn-primary` /
`.btn-sm`, `.text-link`, `.pill` (status with a live dot), `.status`,
`.tags`, `.visually-hidden`, `.unit`. `profile.css` has `.avatar` and
`.icon-btn`; `panels.css` has `.panel`, `.panel-head`, `.entry` (with
`.entry-photo`, `.entry-tile`, `.entry-stats`), `.skill-groups` and
`.more-list`.

## Files

```
index.html    all markup and content, plus the inline icon sprite (Phosphor
              Icons, light weight, MIT; a few drawn on the same 256 grid
              with 12-unit round strokes so they match)
styles/       loaded as separate <link> tags in source order, no build step:
                tokens.css      fonts, colour/type/space tokens, reset,
                                .column, shared components, reveal
                background.css  grain, grid pattern, floating geometry,
                                scroll progress
                nav.css         sticky 64px header and the mobile menu
                profile.css     the profile panel: avatar, name, links
                panels.css      panels, entries, skills, more projects
                footer.css      the one-line footer
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
  `html.js`**, a class `script.js` adds before it can throw. Every panel
  below the profile is a `.reveal`, so an unconditional `opacity: 0` would
  mean a blocked or failed script renders a near-blank site. Keep that
  scoping if you add new reveal states.
- **The scroll reveal is a CSS animation, and hover lifts use `translate`.**
  A `transition` shorthand on `.js .reveal` would out-specify an element's
  own transition list, and a held `transform` would block a `transform`
  lift. Keep hover movement on the individual `translate` property.

## Where the content comes from

**The CV (`Rodrigo-Rocha-CV.pdf`) is the source of truth** for study status,
roles, dates and skills — when it and the GitHub bio disagree, the CV wins.
Whenever the CV changes, re-check the profile bio, Experience and Education
against it. Project copy is written from the repositories themselves
(READMEs and commit history), so it can be re-checked against them:

| On the site | Source | Visibility |
| --- | --- | --- |
| Profile bio, Education, Beyond the code | the CV | — |
| SolvIt internship (Jul – Sep 2026) | the CV | — |
| DEI internship (Feb – Jul 2026) and its numbers (88.9%, 78.1%) | the CV; code in `RochaCodes/calendarioexames` | public |
| Rotina | `RochaCodes/rotina` | private |
| Kubernetes fix | `kubernetes/kubernetes#141622` (fixes #141572) | public, **open — update the status when it merges** |
| Spotiganizer | `RochaCodes/Spotiganizer` | public |
| Teoria Musical | `RochaCodes/teoriamusical` | public |
| Tuna Feminina de Biomédicas | `RochaCodes/tfb-site` | private |
| More projects | EBEC from the CV; then `FEUP-MEIC-DS-2026-27/Staffing-Alocation-Prototype_1MEIC05T1`, `appCE`, `josearcher/IA-Project-`, `RCOM_LAB1`, `AppTuna`, `FEUP-LTW-2025/ltw-project-ltw13g05` | private / course |

## Before this goes live

- [ ] **Tuna Feminina de Biomédicas** is named on the site and the new site
      isn't live yet. Add a link once it is, and confirm they're happy to be
      named.
- [ ] **Kubernetes PR.** When #141622 merges, change "In review" to
      "Merged" and drop "now awaiting approval" from its paragraph.
- [ ] **Optional: a profile photo.** The avatar is an "RR" monogram because
      there's no headshot in the repo. Drop one in `images/` and swap the
      `.avatar` span for an `<img>` with the same class.
- [ ] Swap the canonical/OG URL comments in `index.html`'s `<head>` for your
      real domain once it's live, and add an `og:image` (1200×630 PNG).

## Run it locally

No build step, just serve the folder:

```bash
npx serve .
# or
python -m http.server 8080
```

If a CSS change doesn't show up, hard-reload (Ctrl+Shift+R): these local
servers don't send the no-cache headers that `_headers` gives the live site,
so the browser may keep serving an old stylesheet.

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
