# tanwar.vercel.app

My portfolio: a bento-grid site built with Next.js 14 (App Router), Tailwind and Motion.

**Live:** https://tanwar.vercel.app

## What's in it

- **Home** (`/`): intro, stack, project cards, a "Now" card, recent GitHub commits, and experience.
- **About** (`/about`): story, strengths, experience at a glance, photos, contact.
- **Projects** (`/projects/[slug]`): a case-study page per project, with desktop and mobile screenshots and a lightbox.
- **Resume** (`/resume`), plus the PDF in `public/`.
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

## Develop

```bash
npm install
npm run dev
```
