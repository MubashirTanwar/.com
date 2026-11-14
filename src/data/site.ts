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
  icon: "github" | "linkedin" | "mail" | "resume" | "goodreads" | "letterboxd";
  external?: boolean;
};

export const socials: Social[] = [
  { name: "GitHub", url: "https://github.com/MubashirTanwar", icon: "github", external: true },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/mubashir-tanwar/", icon: "linkedin", external: true },
  { name: "Email", url: `mailto:${site.email}`, icon: "mail" },
  { name: "Resume", url: "/resume", icon: "resume" },
  // TODO: fill in your profile URLs; tiles stay hidden while these are empty.
  { name: "Goodreads", url: "", icon: "goodreads", external: true },
  { name: "Letterboxd", url: "", icon: "letterboxd", external: true },
];

export const activeSocials = socials.filter((s) => s.url);
