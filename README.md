# tanwar.vercel.app

My portfolio: a bento-grid site built with Next.js 14 (App Router), Tailwind and Motion.

**Live:** https://tanwar.vercel.app

## What's in it

- **Home** (`/`): intro, stack, project cards, a "Now" card, recent GitHub commits, and experience.
- **About** (`/about`): story, strengths, experience at a glance, photos, contact.
- **Projects** (`/projects/[slug]`): a case-study page per project, with desktop and mobile screenshots and a lightbox.
- **Resume** (`/resume`), plus the PDF in `public/`.
- **Off the clock** (home): what I'm currently reading (Goodreads), last watched and last reviewed (Letterboxd), and what I'm listening to (Spotify). Refreshed hourly; each card hides if its source can't be reached.
- **⌘K / Ctrl+K** opens a command menu to jump anywhere, copy my email, or switch the theme.

Sub-pages open inside the same frame with a round ✕ to close (Esc works too).

## Editing content

| What | Where |
| --- | --- |
| Name, email, "Now" text, social links (Goodreads, Letterboxd…) | `src/data/site.ts` |
| Projects and their case studies | `src/data/projects.ts` |
| Experience, education, resume page | `src/data/resume-data.json` |
| Screenshots | `public/projects/<slug>/shots/{desktop,mobile}-N.webp` |

A social tile stays hidden while its `url` is empty.

## Listening card

The "Listening now / Last played" card reads Last.fm, which logs your Spotify plays:

1. Create a Last.fm account and connect Spotify under Settings → Applications.
2. Get a free API key at https://www.last.fm/api/account/create.
3. In Vercel → Settings → Environment Variables, add `LASTFM_USER` (your Last.fm username) and `LASTFM_API_KEY`, then redeploy.

The card stays hidden until both are set. Reading straight from Spotify still works too: set `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET` and `SPOTIFY_REFRESH_TOKEN` (see `scripts/spotify-token.mjs`).

## Develop

```bash
npm install
npm run dev
```
