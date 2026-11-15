import { UA, decode } from "./text";

export const GOODREADS_PROFILE = "https://www.goodreads.com/user/show/188130437-mubashir";

export type Book = { title: string; author?: string; url: string; cover?: string };

/**
 * Goodreads turned off its public shelf RSS, so this reads the "Currently Reading"
 * box on the public profile page. If the markup changes it returns [] and the card hides.
 */
export async function getCurrentlyReading(): Promise<Book[]> {
  try {
    const res = await fetch(GOODREADS_PROFILE, { headers: { "User-Agent": UA }, next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const html = await res.text();
    const start = html.indexOf('id="currentlyReadingReviews"');
    if (start < 0) return [];
    const box = html.slice(start, html.indexOf('class="bigBoxBottom"', start));
    return box
      .split('class="Updates')
      .slice(1)
      .map((block) => {
        const href = block.match(/class="bookTitle" href="([^"]+)"/)?.[1];
        const title = block.match(/class="bookTitle"[^>]*>([\s\S]*?)<\/a>/)?.[1];
        const author = block.match(/class="authorName"[^>]*>([\s\S]*?)<\/a>/)?.[1];
        const cover = block.match(/<img[^>]+src="([^"]+)"/)?.[1];
        return {
          title: title ? decode(title) : "",
          author: author ? decode(author) : undefined,
          url: href ? new URL(href, "https://www.goodreads.com").toString() : GOODREADS_PROFILE,
          // Drop the "._SX98_" size suffix to get the full-size cover.
          cover: cover?.replace(/\._S[XY]\d+_\./, "."),
        };
      })
      .filter((b) => b.title);
  } catch {
    return [];
  }
}
