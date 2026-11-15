import { ArrowUpRight, Github } from "lucide-react";
import { moreProjects } from "@/data/more-projects";

const pill =
  "inline-flex items-center gap-1.5 rounded-full border border-[#d9dbde] dark:border-[#2a2a2a] px-3 py-1.5 text-sm text-[#1f1f1f] dark:text-[#cccccc] transition-colors hover:bg-[#f4f5f6] dark:hover:bg-[#1c1c1c]";

/** Smaller work without a full case-study page: algorithms, ML and freelance builds. */
export function MoreProjects() {
  return (
    <section aria-labelledby="more-projects" className="rounded-3xl border border-[#d9dbde] dark:border-[#242424] bg-white dark:bg-[#141414] p-4 md:p-6">
      <h2 id="more-projects" className="text-3xl text-[#1f1f1f] dark:text-[#cccccc] px-2 pt-2">
        More projects
      </h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {moreProjects.map((p) => (
          <article key={p.title} className="flex flex-col rounded-2xl bg-[#f7f7f8] dark:bg-[#1a1a1a] p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-stone-500">
              {p.kind}
              {p.year && ` · ${p.year}`}
            </p>
            <h3 className="mt-2 text-xl text-[#1f1f1f] dark:text-[#e0e0e0]">{p.title}</h3>
            <p className="mt-4">
              <span className="text-3xl font-light text-[#1f1f1f] dark:text-[#e5e5e5]">{p.stat.value}</span>
              <span className="ml-2 text-sm text-stone-500">{p.stat.label}</span>
            </p>
            <p className="mt-3 text-[#1f1f1f] dark:text-[#cccccc]">{p.summary}</p>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
              {p.points.map((pt) => (
                <li key={pt} className="flex gap-2">
                  <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-stone-400" />
                  {pt}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <span key={t} className="rounded-full bg-white dark:bg-[#242424] px-2.5 py-1 text-xs text-stone-600 dark:text-stone-400">
                  {t}
                </span>
              ))}
            </div>
            {(p.github || p.link || p.note) && (
              <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
                {p.github && (
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className={pill}>
                    <Github className="h-4 w-4" /> Code
                  </a>
                )}
                {p.link && (
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className={pill}>
                    Visit <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
                {p.note && <span className="text-sm text-stone-500">{p.note}</span>}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
