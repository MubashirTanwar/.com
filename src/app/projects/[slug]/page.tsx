import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Github } from "lucide-react";
import { getProject, projects } from "@/data/projects";
import { CloseButton } from "@/components/shell/CloseButton";
import { Gallery } from "@/components/project/Gallery";
import { card, eyebrow, heading } from "@/components/shell/styles";
import { cn } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProject(params.slug);
  if (!p) return {};
  const title = `${p.title} · ${p.kind}`;
  return {
    title,
    description: p.summary,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: { url: `/projects/${p.slug}`, title, description: p.summary, images: [p.desktop[0].src] },
    twitter: { title, description: p.summary, images: [p.desktop[0].src] },
  };
}

const pill =
  "inline-flex items-center gap-2 rounded-full border border-[#d9dbde] dark:border-[#2a2a2a] px-4 py-2 text-sm text-[#1f1f1f] dark:text-[#cccccc] transition-colors hover:bg-[#f4f5f6] dark:hover:bg-[#1c1c1c]";

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const p = getProject(params.slug);
  if (!p) notFound();
  const next = projects[(projects.indexOf(p) + 1) % projects.length];

  return (
    <article className="pb-6">
      <CloseButton />
      <div className="mx-auto max-w-5xl space-y-4">
        <header className="px-2 pb-4">
          <h1 className={cn("text-3xl md:text-4xl", heading)}>{p.title}</h1>
          <p className="mt-1 text-xl text-stone-500">{p.kind}</p>
        </header>

        <div className="grid gap-4 md:grid-cols-3">
          <dl className={cn(card, "p-6 space-y-5")}>
            {[
              ["Company", p.company],
              ["My role", p.role],
              ["Timeline", p.timeline],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className={eyebrow}>{k}</dt>
                <dd className={cn("mt-1.5", heading)}>{v}</dd>
              </div>
            ))}
            <div>
              <dt className={eyebrow}>Stack</dt>
              <dd className="mt-2 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <span key={s} className="rounded-full bg-[#f4f5f6] dark:bg-[#1f1f1f] px-2.5 py-1 text-sm text-stone-600 dark:text-stone-400">
                    {s}
                  </span>
                ))}
              </dd>
            </div>
          </dl>

          <div className={cn(card, "p-6 md:col-span-2 flex flex-col")}>
            <p className={eyebrow}>Description</p>
            <p className={cn("mt-2 text-lg", heading)}>{p.summary}</p>
            <p className={cn(eyebrow, "mt-6")}>Context</p>
            <p className="mt-2 leading-relaxed text-stone-600 dark:text-stone-400">{p.context}</p>
            <div className="mt-auto pt-6 flex flex-wrap gap-3">
              {p.link && (
                <a href={p.link} target="_blank" rel="noopener noreferrer" className={pill}>
                  {p.linkLabel ?? "Visit"} <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
              {p.github && (
                <a href={p.github} target="_blank" rel="noopener noreferrer" className={pill}>
                  <Github className="h-4 w-4" /> Source
                </a>
              )}
            </div>
          </div>
        </div>

        <Gallery desktop={p.desktop} mobile={p.mobile} />

        <div className={cn(card, "p-6 md:p-12")}>
          <div className="mx-auto max-w-2xl space-y-10">
            {p.sections.map((s) => (
              <section key={s.heading}>
                <h2 className={cn("text-2xl", heading)}>{s.heading}</h2>
                {s.body && <p className="mt-4 leading-relaxed text-stone-600 dark:text-stone-400">{s.body}</p>}
                {s.points && (
                  <ol className="mt-4 space-y-3 list-decimal pl-5 marker:text-stone-400 text-stone-600 dark:text-stone-400 leading-relaxed">
                    {s.points.map((pt) => (
                      <li key={pt} className="pl-1">{pt}</li>
                    ))}
                  </ol>
                )}
              </section>
            ))}
          </div>
        </div>

        <Link href={`/projects/${next.slug}`} className={cn(card, "group relative flex items-center gap-4 overflow-hidden p-4 pr-6")}>
          <Image src={next.card} alt="" width={160} height={100} className="h-20 w-32 rounded-2xl object-cover" />
          <div className="min-w-0">
            <p className={eyebrow}>Next project</p>
            <p className={cn("mt-1 text-xl truncate", heading)}>{next.title}</p>
          </div>
          <ArrowUpRight className={cn("ml-auto h-6 w-6 shrink-0 transition-transform duration-300 group-hover:rotate-45", heading)} />
        </Link>
      </div>
    </article>
  );
}
