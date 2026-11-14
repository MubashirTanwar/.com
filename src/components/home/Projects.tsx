import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { lifeLabel, lifeSocials, site } from "@/data/site";
import { SocialIcon } from "@/components/shell/SocialIcon";
import ExperienceTimeline from "./Experience";
import { GitHubActivity } from "./GitHubActivity";
import { OffTheClock } from "./OffTheClock";

function ProjectCard({ slug, title, kind, card, summary }: (typeof projects)[number]) {
  return (
    <Link
      href={`/projects/${slug}`}
      className="relative block group border border-[#d9dbde] dark:border-[#242424] rounded-3xl overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400"
    >
      <Image
        src={card}
        alt={`${title}: ${kind}`}
        width={960}
        height={640}
        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        className="rounded-3xl h-56 lg:h-72 w-full object-cover scale-110 group-hover:scale-100 group-focus-visible:scale-100 transition duration-300 ease-in-out"
      />
      {/* Title strip that's always visible on touch screens, where there's no hover. */}
      <div className="md:hidden absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5 pt-12 text-white">
        <p className="text-lg font-semibold">{title}</p>
        <p className="text-sm text-zinc-300">{kind}</p>
      </div>
      <div className="hidden md:flex absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition duration-300 ease-in-out bg-gradient-to-t from-black to-transparent text-white items-end">
        <div className="p-6 space-y-3 text-xl translate-y-12 group-hover:translate-y-0 group-focus-visible:translate-y-0 transition duration-500 ease-in-out flex flex-col w-full">
          <div className="font-semibold flex items-center justify-between w-full">
            <h3 className="text-white">{title}</h3>
            <ArrowUpRight className="text-white h-6 w-6 ml-auto group-hover:rotate-45 transition-transform duration-700 ease-in-out" />
          </div>
          <p className="text-zinc-400 text-sm">{summary}</p>
        </div>
      </div>
    </Link>
  );
}

function NowCard() {
  return (
    <div className="flex h-56 lg:h-72 flex-col rounded-3xl border border-[#d9dbde] dark:border-[#242424] bg-white dark:bg-[#141414] p-6">
      <p className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-stone-500">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        {site.now.label}
      </p>
      <p className="mt-4 text-2xl font-light leading-snug text-[#1f1f1f] dark:text-[#cccccc]">{site.now.text}</p>
      {lifeSocials.length > 0 && (
        <div className="mt-auto flex flex-wrap gap-2 pt-4">
          {lifeSocials.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${lifeLabel(s)} on ${s.name}`}
              className="inline-flex items-center gap-2 rounded-full border border-[#d9dbde] dark:border-[#2a2a2a] px-3 py-1.5 text-sm text-[#1f1f1f] dark:text-[#cccccc] transition-colors hover:bg-[#f4f5f6] dark:hover:bg-[#1c1c1c]"
            >
              <SocialIcon icon={s.icon} className="h-4 w-4" />
              {lifeLabel(s)}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function ExperienceCard() {
  return (
    <section className="bg-white dark:bg-[#141414] border border-[#d9dbde] dark:border-[#242424] rounded-3xl p-3 md:p-6">
      <h2 className="text-3xl text-[#1f1f1f] dark:text-[#cccccc] pt-6 pl-6 md:p-0">Experience</h2>
      <div className="space-y-4 mt-4">
        <ExperienceTimeline />
      </div>
    </section>
  );
}

export default function Projects() {
  return (
    <div className="pt-4 space-y-4">
      <section aria-label="Projects" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((p) => (
          <ProjectCard key={p.slug} {...p} />
        ))}
        <NowCard />
      </section>
      <OffTheClock />
      <GitHubActivity />
      <ExperienceCard />
    </div>
  );
}
