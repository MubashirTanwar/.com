/**
 * Spotify has no public "recently played" feed, so this uses your own account through
 * the Web API. Set SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET and SPOTIFY_REFRESH_TOKEN
 * (see scripts/spotify-token.mjs). Without them the card stays hidden.
 */
export type Track = {
  title: string;
  artist: string;
  url: string;
  art?: string;
  playing: boolean;
  playedAt?: string;
};

type SpotifyTrack = {
  name: string;
  artists: { name: string }[];
  external_urls: { spotify: string };
  album: { images: { url: string }[] };
};

const toTrack = (t: SpotifyTrack, playing: boolean, playedAt?: string): Track => ({
  title: t.name,
  artist: t.artists.map((a) => a.name).join(", "),
  url: t.external_urls.spotify,
  art: t.album.images[1]?.url ?? t.album.images[0]?.url,
  playing,
  playedAt,
});

async function accessToken() {
  const { SPOTIFY_CLIENT_ID: id, SPOTIFY_CLIENT_SECRET: secret, SPOTIFY_REFRESH_TOKEN: refresh } = process.env;
  if (!id || !secret || !refresh) return null;
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: refresh }),
    // Tokens last an hour; reuse one for 30 minutes so the page can stay statically cached.
    next: { revalidate: 1800 },
  });
  if (!res.ok) return null;
  return ((await res.json()) as { access_token: string }).access_token;
}

export async function getListening(): Promise<Track | null> {
  try {
    const token = await accessToken();
    if (!token) return null;
    const headers = { Authorization: `Bearer ${token}` };

    const now = await fetch("https://api.spotify.com/v1/me/player/currently-playing", { headers, next: { revalidate: 120 } });
    if (now.status === 200) {
      const data = (await now.json()) as { is_playing: boolean; item: SpotifyTrack | null };
      if (data.is_playing && data.item?.album) return toTrack(data.item, true);
    }

    const recent = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=1", { headers, next: { revalidate: 120 } });
    if (!recent.ok) return null;
    const { items } = (await recent.json()) as { items: { track: SpotifyTrack; played_at: string }[] };
    return items[0] ? toTrack(items[0].track, false, items[0].played_at) : null;
  } catch {
    return null;
  }
}
