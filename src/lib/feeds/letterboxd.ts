import { UA, decode, tag } from "./text";

export const LETTERBOXD_USER = "electric_trash";

export type Film = {
  title: string;
  year?: string;
  url: string;
  poster?: string;
  rating?: number;
  liked: boolean;
  rewatch: boolean;
  watchedOn?: string;
  review?: string;
  spoilers: boolean;
};

function parse(xml: string): Film[] {
  const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
  return items
    .filter((it) => /letterboxd-(watch|review)-/.test(it)) // skip lists
    .map((it) => {
      const description = tag(it, "description")?.replace(/^<!\[CDATA\[|\]\]>$/g, "") ?? "";
      const paragraphs = Array.from(description.matchAll(/<p>([\s\S]*?)<\/p>/g)).map((m) => m[1]);
      const reviewParas = paragraphs.filter(
        (p) => !p.startsWith("<img") && !/^Watched on /.test(p) && !/This review may contain spoilers/.test(p)
      );
      const rating = Number(tag(it, "letterboxd:memberRating"));
      return {
        title: decode(tag(it, "letterboxd:filmTitle") ?? tag(it, "title") ?? ""),
        year: tag(it, "letterboxd:filmYear"),
        url: tag(it, "link") ?? `https://letterboxd.com/${LETTERBOXD_USER}/`,
        poster: description.match(/<img src="([^"]+)"/)?.[1],
        rating: Number.isFinite(rating) && rating > 0 ? rating : undefined,
        liked: tag(it, "letterboxd:memberLike") === "Yes",
        rewatch: tag(it, "letterboxd:rewatch") === "Yes",
        watchedOn: tag(it, "letterboxd:watchedDate"),
        review: reviewParas.length ? decode(reviewParas.join("\n")) : undefined,
        spoilers: /contains spoilers/i.test(tag(it, "title") ?? ""),
      };
    });
}

/** Latest diary entries from the public RSS feed, refreshed hourly. */
export async function getFilms(): Promise<Film[]> {
  try {
    const res = await fetch(`https://letterboxd.com/${LETTERBOXD_USER}/rss/`, {
      headers: { "User-Agent": UA },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return parse(await res.text());
  } catch {
    return [];
  }
}

export async function getLetterboxd() {
  const films = await getFilms();
  return {
    lastWatched: films[0],
    // Spoiler reviews are skipped so the home page never gives an ending away.
    lastReview: films.find((f) => f.review && !f.spoilers),
  };
}
