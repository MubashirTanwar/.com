export const site = {
  name: "Mubashir Tanwar",
  url: "https://tanwar.vercel.app",
  email: "tanwar0210@gmail.com",
  role: "SDE-1 at Prana",
  location: "Mumbai",
  intro:
    "Software engineer, currently building real-time systems at Prana, based in Mumbai.",
  now: {
    label: "Now",
    text: "Shipping chat and voice consults at Prana. Evenings: teaching a cat to coach chess in Outpost.",
  },
  source: "https://github.com/MubashirTanwar/.com",
  resumePdf: "/Mubashir_Tanwar_Resume.pdf",
};

export type Social = {
  name: string;
  /** Leave empty to hide the tile until you have a URL. */
  url: string;
  icon: "github" | "linkedin" | "mail" | "resume" | "goodreads" | "letterboxd" | "spotify";
  external?: boolean;
  /** "life" profiles (books, films, music) show on the Now card and About page, not the links grid. */
  life?: boolean;
};

export const socials: Social[] = [
  { name: "GitHub", url: "https://github.com/MubashirTanwar", icon: "github", external: true },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/mubashir-tanwar/", icon: "linkedin", external: true },
  { name: "Email", url: `mailto:${site.email}`, icon: "mail" },
  { name: "Resume", url: "/resume", icon: "resume" },
  { name: "Goodreads", url: "https://www.goodreads.com/user/show/188130437-mubashir", icon: "goodreads", external: true, life: true },
  { name: "Letterboxd", url: "https://letterboxd.com/electric_trash/", icon: "letterboxd", external: true, life: true },
  { name: "Spotify", url: "https://open.spotify.com/user/h49gekebhda81ajlas5s0ctgt", icon: "spotify", external: true, life: true },
];

export const activeSocials = socials.filter((s) => s.url);
export const workSocials = activeSocials.filter((s) => !s.life);
export const lifeSocials = activeSocials.filter((s) => s.life);
export const lifeLabel = (s: Social) =>
  s.icon === "goodreads" ? "Reading" : s.icon === "letterboxd" ? "Watching" : s.icon === "spotify" ? "Listening" : s.name;
