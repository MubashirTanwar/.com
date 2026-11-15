/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "a.ltrbxd.com" }, // Letterboxd posters
      { protocol: "https", hostname: "i.gr-assets.com" }, // Goodreads covers
      { protocol: "https", hostname: "i.scdn.co" }, // Spotify album art
      { protocol: "https", hostname: "lastfm.freetls.fastly.net" }, // Last.fm album art
    ],
  },
};

export default nextConfig;
