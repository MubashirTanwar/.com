/**
 * "Listening now / Last played" from Last.fm, which logs Spotify plays once the two are connected.
 * Needs LASTFM_USER and LASTFM_API_KEY (a free read-only key). Without them the card stays hidden.
 */
import type { Track } from "./spotify";

type LastfmTrack = {
  name: string;
  url: string;
  artist: { "#text": string };
  image?: { "#text": string; size: string }[];
  date?: { uts: string };
  "@attr"?: { nowplaying?: string };
};

export async function getLastfmListening(): Promise<Track | null> {
  const user = process.env.LASTFM_USER;
  const key = process.env.LASTFM_API_KEY;
  if (!user || !key) return null;
  try {
    const qs = new URLSearchParams({ method: "user.getrecenttracks", user, api_key: key, format: "json", limit: "1" });
    const res = await fetch(`https://ws.audioscrobbler.com/2.0/?${qs}`, { next: { revalidate: 120 } });
    if (!res.ok) return null;
    const data = (await res.json()) as { recenttracks?: { track?: LastfmTrack[] | LastfmTrack } };
    const raw = data.recenttracks?.track;
    const t = Array.isArray(raw) ? raw[0] : raw;
    if (!t) return null;
    // Last.fm's placeholder star image means "no art".
    const art = t.image?.find((i) => i.size === "extralarge")?.["#text"] || t.image?.at(-1)?.["#text"];
    return {
      title: t.name,
      artist: t.artist["#text"],
      url: t.url,
      art: art && !art.includes("2a96cbd8b46e442fc41c2b86b821562f") ? art : undefined,
      playing: t["@attr"]?.nowplaying === "true",
      playedAt: t.date ? new Date(Number(t.date.uts) * 1000).toISOString() : undefined,
    };
  } catch {
    return null;
  }
}
