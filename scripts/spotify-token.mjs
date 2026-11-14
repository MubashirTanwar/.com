// One-off helper: get a Spotify refresh token for the "Listening" card.
//
// 1. Create an app at https://developer.spotify.com/dashboard
//    and add the redirect URI  http://127.0.0.1:8888/callback
// 2. Run:  SPOTIFY_CLIENT_ID=... SPOTIFY_CLIENT_SECRET=... node scripts/spotify-token.mjs
// 3. Open the printed URL, approve, and copy the refresh token it prints.
// 4. In Vercel → Project → Settings → Environment Variables, add
//    SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET and SPOTIFY_REFRESH_TOKEN, then redeploy.
import http from "node:http";

const { SPOTIFY_CLIENT_ID: id, SPOTIFY_CLIENT_SECRET: secret } = process.env;
if (!id || !secret) {
  console.error("Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET first.");
  process.exit(1);
}
const redirect = "http://127.0.0.1:8888/callback";
const scope = "user-read-currently-playing user-read-recently-played";
const authUrl = `https://accounts.spotify.com/authorize?${new URLSearchParams({ client_id: id, response_type: "code", redirect_uri: redirect, scope })}`;

http
  .createServer(async (req, res) => {
    const code = new URL(req.url, redirect).searchParams.get("code");
    if (!code) return res.end("No code in the callback.");
    const r = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ grant_type: "authorization_code", code, redirect_uri: redirect }),
    });
    const json = await r.json();
    res.end(json.refresh_token ? "Done. Check your terminal." : `Failed: ${JSON.stringify(json)}`);
    console.log(json.refresh_token ? `\nSPOTIFY_REFRESH_TOKEN=${json.refresh_token}\n` : json);
    process.exit(0);
  })
  .listen(8888, "127.0.0.1", () => console.log(`Open this URL and approve:\n\n${authUrl}\n`));
