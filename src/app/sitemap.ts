import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, priority: 1 },
    { url: `${site.url}/about`, lastModified: now, priority: 0.8 },
    { url: `${site.url}/resume`, lastModified: now, priority: 0.8 },
    ...projects.map((p) => ({ url: `${site.url}/projects/${p.slug}`, lastModified: now, priority: 0.7 })),
  ];
}
