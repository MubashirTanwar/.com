import type { Metadata } from "next";
import { ArrowUpRight, Github } from "lucide-react";
import { moreProjects, type Section } from "@/data/more-projects";
import { CloseButton } from "@/components/shell/CloseButton";
import { card, eyebrow, heading } from "@/components/shell/styles";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "More projects",
  description: "Algorithms, machine learning and freelance builds: Dancing Links, a timetabling genetic algorithm, Marathi OCR and more.",
  alternates: { canonical: "/projects/more" },
  openGraph: { url: "/projects/more", title: "More projects · Mubashir Tanwar" },
};

const pill =
  "inline-flex items-center gap-1.5 rounded-full border border-[#d9dbde] dark:border-[#2a2a2a] px-3 py-1.5 text-sm text-[#1f1f1f] dark:text-[#cccccc] transition-colors hover:bg-[#f4f5f6] dark:hover:bg-[#1c1c1c]";

function Block({ s }: { s: Section }) {
  return (
    <section>
      <h3 className={cn("text-xl", heading)}>{s.heading}</h3>
      {s.body && <p className="mt-3 leading-relaxed text-stone-600 dark:text-stone-400">{s.body}</p>}
      {s.points && (
        <ul className="mt-3 space-y-2 leading-relaxed text-stone-600 dark:text-stone-400">
          {s.points.map((p) => (
            <li key={p} className="flex gap-3">
              <span aria-hidden className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-stone-400" />
              {p}
            </li>
          ))}
        </ul>
      )}
      {s.table && (
        <div className="mt-4 overflow-x-auto rounded-2xl border border-[#eceef0] dark:border-[#242424]">
          <table className="w-full min-w-[540px] text-left text-sm">
            <thead className="bg-[#f7f7f8] dark:bg-[#1a1a1a]">
              <tr>
                {s.table[0].map((h, i) => (
                  <th key={h} className={cn("px-4 py-2.5 font-normal text-stone-500", i > 0 && i === s.table![0].length - 1 && "text-right")}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {s.table.slice(1).map((row, r) => (
                <tr key={r} className="border-t border-[#eceef0] dark:border-[#242424]">
                  {row.map((c, i) => (
                    <td
                      key={i}
                      className={cn(
                        "px-4 py-2.5 text-stone-600 dark:text-stone-400",
                        i > 0 && i === row.length - 1 && "text-right tabular-nums",
                        i === 0 && "text-[#1f1f1f] dark:text-[#cccccc]",
                      )}
                    >
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {s.code && (
        <pre className="mt-4 overflow-x-auto rounded-2xl bg-[#f4f5f6] dark:bg-[#0c0c0c] p-4 text-xs leading-relaxed text-stone-700 dark:text-stone-300">
          <code>{s.code}</code>
        </pre>
      )}
      {s.caption && <p className="mt-3 text-sm text-stone-500">{s.caption}</p>}
    </section>
  );
}

export default function MoreProjectsPage() {
  return (
    <div className="pb-6">
      <CloseButton />
      <div className="mx-auto max-w-5xl space-y-4">
        <header className="px-2 pb-2">
          <h1 className={cn("text-3xl md:text-4xl", heading)}>More projects</h1>
          <p className="mt-1 text-xl text-stone-500">Algorithms, machine learning and freelance builds</p>
        </header>

        <nav aria-label="Projects on this page" className="flex flex-wrap gap-2 px-2 pb-2">
          {moreProjects.map((p) => (
            <a key={p.slug} href={`#${p.slug}`} className={pill}>
              {p.title}
            </a>
          ))}
        </nav>

        {moreProjects.map((p) => (
          <article key={p.slug} id={p.slug} className={cn(card, "scroll-mt-6 p-6 md:p-10")}>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-12">
              <div className="min-w-0 lg:sticky lg:top-6 self-start">
                <p className={eyebrow}>
                  {p.kind}
                  {p.year && ` · ${p.year}`}
                </p>
                <h2 className={cn("mt-2 text-2xl", heading)}>{p.title}</h2>
                <p className={cn("mt-5 text-4xl font-light", heading)}>{p.stat.value}</p>
                <p className="mt-1 text-sm text-stone-500">{p.stat.label}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-full bg-[#f4f5f6] dark:bg-[#1f1f1f] px-2.5 py-1 text-xs text-stone-600 dark:text-stone-400">
                      {t}
                    </span>
                  ))}
                </div>
                {(p.github || p.link || p.note) && (
                  <div className="mt-5 flex flex-wrap items-center gap-2">
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
              </div>
              <div className="min-w-0 space-y-8">
                <p className={cn("text-lg leading-relaxed", heading)}>{p.summary}</p>
                {p.sections.map((s) => (
                  <Block key={s.heading} s={s} />
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
