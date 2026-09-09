# rodrigorocha.dev

Personal site: CV, projects, and a way to get in touch. Plain HTML, CSS and a
little vanilla JS — no build step, no framework, no dependencies. Self-hosted
[Clash Grotesk](https://www.fontshare.com/fonts/clash-grotesk) (headings) and
[Satoshi](https://www.fontshare.com/fonts/satoshi) (body), both under the ITF
Free Font License — see `fonts/LICENSE-Fontshare.txt`.

## Design system

Dark, high-contrast and warm. The whole system lives in `styles/tokens.css`;
nothing anywhere else hardcodes a colour, so the site repaints from that one
file.

| Token | Value | Used for |
| --- | --- | --- |
| `--bg` | `#0C0C0C` | page ground |
| `--surface` | `#141414` | cards, marquee band |
| `--surface-light` | `#1C1C1C` | tags, icon tiles |
| `--accent` | `#E8553A` | Sunset Red — the one call to action colour |
| `--warm` | `#D4A574` | Sand Warmth — secondary highlight |
| `--text` | `#F0EDE8` | body copy |
| `--text-2` | `#B0ADA8` | secondary copy |
| `--muted` | `#8A8A8A` | dates, meta |
| `--ghost` | `rgba(255,255,255,.05)` | the signature container border |

**Rules the system holds to:**

- **Clash Grotesk for headings only** (32px and up, plus the logo and the
  hero stats). Satoshi carries every piece of body text and UI.
- **Thin borders and translation, never heavy shadows.** Cards lift with
  `translateY(-6px)`; depth comes from the 5% white "ghost" edge.
- **One motion curve.** `--ease: cubic-bezier(0.22, 1, 0.36, 1)` on every
  card, button and link, so the page moves with a single hand.
- **Body text is never coloured.** Only `--text` or `--text-2`; the accent is
  reserved for actions, highlights and the timeline dots. No blue links.
- Every animation folds away under `prefers-reduced-motion`.

## Structure

```
index.html    all markup and content, plus the inline icon sprite
              (Phosphor Icons, light weight, MIT)
styles/       loaded as separate <link> tags in source order, no build step:
                tokens.css      fonts, colour/type/space tokens, reset,
                                buttons, tags, section headings, reveal
                background.css  grain, grid pattern, floating geometry,
                                scroll progress
                nav.css         sticky 64px header and the mobile menu
                hero.css        split hero, the orbiting orb, skill marquee
                projects.css    bento grid
                timeline.css    experience/education timeline, photo figures
                contact.css     contact cards, socials, footer
script.js     mobile nav, scroll reveal, active nav link, footer year
fonts/        self-hosted Clash Grotesk (600, 700) + Satoshi (400, 500, 700)
images/       photos used in the timeline
favicon.svg
Rodrigo-Rocha-CV.pdf
_headers      cache + security headers (CSS/JS/HTML no-cache so a deploy is
              never stuck behind a stale browser cache; fonts cached hard)
wrangler.jsonc  Cloudflare Workers static-assets config (name: rodrigo-rocha)
```

### How the orb works

The hero's orb is four nested layers, because one element can only run one
transform animation at a time:

```
.orb-orbit    carries the 44s orbit rotation
  .orb-slot     places a tile at its angle (--a) and cancels that angle
    .orb-upright  counter-rotates so the tile never turns upside down
      .orb-icon     drifts on its own float cycle (orb-float-1..4)
```

The two rings each carry a single accent dot — a bare circle spinning looks
completely static, so the dot is what makes the rotation legible.

## Two things worth knowing before editing

- **`@font-face` paths are relative to `styles/`, not to the page.** They read
  `../fonts/…`. A bare `fonts/…` resolves to `styles/fonts/` and silently
  falls back to a system font.
- **Anything that hides content pending a scroll reveal is scoped to
  `html.js`**, a class `script.js` adds before it can throw. Most of the page
  sits inside a `.reveal`, so an unconditional `opacity: 0` would mean a
  blocked or failed script renders a blank site. Keep that scoping if you add
  new reveal states.

## Before this goes live

- [ ] **Third project card.** In `index.html` (search for `TODO(Rodrigo)`) it's
      a placeholder. Fill in what the site actually is, what you rebuilt, the
      stack, and a link if you want one public.
- [ ] **Private repos.** `Rotina` and the exam-timetabling engine are marked
      "Private repository" because they are. The reference design puts a
      "Live Demo" overlay on card hover — there's nothing to link to yet, so
      it isn't wired up. Make a repo public and it's worth adding back.
- [ ] Swap the canonical/OG URL comments in `index.html`'s `<head>` for your
      real domain once it's live.
- [ ] Skim `Rodrigo-Rocha-CV.pdf` is current — it's what the CV buttons
      download.

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
