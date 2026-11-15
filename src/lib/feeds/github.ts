export const GITHUB_USER = "MubashirTanwar";

export type Day = { date: string; level: number; count: number };

/**
 * The public contribution calendar from github.com/users/<user>/contributions (the same HTML the
 * profile page embeds). No token needed. Returns null if GitHub can't be reached or the markup changes.
 */
export function parseContributions(html: string): { days: Day[]; total: number } | null {
  const tips = new Map<string, string>();
  for (const m of Array.from(html.matchAll(/<tool-tip[^>]*\bfor="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g))) tips.set(m[1], m[2].trim());

  const days: Day[] = [];
  for (const m of Array.from(html.matchAll(/<td\b[^>]*\bdata-date="(\d{4}-\d{2}-\d{2})"[^>]*>/g))) {
    const tag = m[0];
    const level = Number(tag.match(/\bdata-level="(\d)"/)?.[1] ?? 0);
    const id = tag.match(/\bid="([^"]+)"/)?.[1];
    const tip = (id && tips.get(id)) || "";
    const count = /^No contributions/i.test(tip) ? 0 : Number(tip.match(/^([\d,]+)\s+contribution/)?.[1]?.replace(/,/g, "") ?? (level ? NaN : 0));
    days.push({ date: m[1], level, count });
  }
  if (days.length < 300) return null;
  days.sort((a, b) => a.date.localeCompare(b.date));

  const headline = html.match(/([\d,]+)\s+contributions?\s+in the last year/);
  const summed = days.reduce((s, d) => s + (Number.isFinite(d.count) ? d.count : 0), 0);
  return { days, total: headline ? Number(headline[1].replace(/,/g, "")) : summed };
}

export async function getContributions() {
  try {
    const res = await fetch(`https://github.com/users/${GITHUB_USER}/contributions`, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; tanwar.vercel.app)" },
      next: { revalidate: 3600 * 6 },
    });
    if (!res.ok) return null;
    return parseContributions(await res.text());
  } catch {
    return null;
  }
}
