"use client";

import { ArrowUpRight, Github, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { moreProjects } from "@/data/more-projects";

const pill =
  "inline-flex items-center gap-1.5 rounded-full border border-[#d9dbde] dark:border-[#2a2a2a] px-3 py-1.5 text-sm text-[#1f1f1f] dark:text-[#cccccc] transition-colors hover:bg-[#f4f5f6] dark:hover:bg-[#1c1c1c]";

/** A slim bento row that opens the smaller projects (algorithms, ML, freelance builds) in a modal. */
export function MoreProjects() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => closeRef.current?.focus());
    const trigger = triggerRef.current;
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="group flex w-full flex-wrap items-center gap-x-6 gap-y-3 rounded-3xl border border-[#d9dbde] dark:border-[#242424] bg-white dark:bg-[#141414] px-6 py-5 text-left transition-colors hover:bg-[#fafafa] dark:hover:bg-[#171717]"
      >
        <span className="text-2xl text-[#1f1f1f] dark:text-[#cccccc]">More projects</span>
        <span className="hidden md:flex flex-1 flex-wrap gap-2">
          {moreProjects.map((p) => (
            <span key={p.title} className="rounded-full bg-[#f4f5f6] dark:bg-[#1f1f1f] px-3 py-1 text-sm text-stone-600 dark:text-stone-400">
              {p.title}
            </span>
          ))}
        </span>
        <span className="ml-auto flex items-center gap-2 text-sm text-stone-500">
          View all {moreProjects.length}
          <ArrowUpRight className="h-5 w-5 text-[#1f1f1f] dark:text-[#cccccc] transition-transform duration-300 group-hover:rotate-45" />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            data-overlay-open
            className="fixed inset-0 z-[150] flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm md:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="more-projects-title"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-t-3xl md:rounded-3xl border border-[#d9dbde] dark:border-[#242424] bg-[#f4f5f6] dark:bg-[#0f0f0f] font-quicksand"
            >
              <div className="flex items-center justify-between gap-4 border-b border-[#d9dbde] dark:border-[#242424] px-6 py-4">
                <h2 id="more-projects-title" className="text-2xl text-[#1f1f1f] dark:text-[#cccccc]">
                  More projects
                </h2>
                <button
                  ref={closeRef}
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="group flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#d9dbde] dark:border-[#242424] text-[#1f1f1f] dark:text-[#cccccc] hover:border-stone-400 dark:hover:border-stone-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400"
                >
                  <X className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
                </button>
              </div>
              <div className="grid gap-4 overflow-y-auto p-4 md:grid-cols-2 md:p-6">
                {moreProjects.map((p) => (
                  <article key={p.title} className="flex flex-col rounded-2xl border border-[#d9dbde] dark:border-[#242424] bg-white dark:bg-[#141414] p-5">
                    <p className="text-xs uppercase tracking-[0.18em] text-stone-500">
                      {p.kind}
                      {p.year && ` · ${p.year}`}
                    </p>
                    <h3 className="mt-2 text-xl text-[#1f1f1f] dark:text-[#e0e0e0]">{p.title}</h3>
                    <p className="mt-3">
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
                        <span key={t} className="rounded-full bg-[#f4f5f6] dark:bg-[#1f1f1f] px-2.5 py-1 text-xs text-stone-600 dark:text-stone-400">
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
