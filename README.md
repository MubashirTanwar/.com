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

## Spotify card

Spotify has no public feed, so the listening card uses your own account and stays hidden until these are set in Vercel → Settings → Environment Variables:

1. Create an app at https://developer.spotify.com/dashboard with redirect URI `http://127.0.0.1:8888/callback`.
2. Run `SPOTIFY_CLIENT_ID=… SPOTIFY_CLIENT_SECRET=… node scripts/spotify-token.mjs`, open the link it prints and approve.
3. Add `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET` and the printed `SPOTIFY_REFRESH_TOKEN` to Vercel, then redeploy.

## Develop

```bash
npm install
npm run dev
```
