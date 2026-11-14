/** Minimal helpers for reading RSS/HTML without pulling in a parser. */
export const tag = (xml: string, name: string) => {
  const m = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`));
  return m ? m[1].trim() : undefined;
};

export const decode = (s: string) =>
  s
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .trim();

/** 3.5 -> "★★★½" */
export const stars = (rating?: number) => {
  if (!rating) return "";
  return "★".repeat(Math.floor(rating)) + (rating % 1 ? "½" : "");
};

export const UA = "Mozilla/5.0 (compatible; tanwar.vercel.app)";
