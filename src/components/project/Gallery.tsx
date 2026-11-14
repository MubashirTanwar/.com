"use client";

import { ChevronLeft, ChevronRight, Monitor, Smartphone, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { Shot } from "@/data/projects";
import { card, heading } from "@/components/shell/styles";
import { cn } from "@/lib/utils";

type View = "desktop" | "mobile";

export function BrowserFrame({ shot, priority, onClick }: { shot: Shot; priority?: boolean; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="block w-full overflow-hidden rounded-2xl border border-[#d9dbde] dark:border-[#2a2a2a] bg-[#f4f5f6] dark:bg-[#0c0c0c] text-left transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400"
      aria-label={`Enlarge: ${shot.alt}`}
    >
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-[#d9dbde] dark:border-[#2a2a2a]">
        <span className="h-2.5 w-2.5 rounded-full bg-stone-300 dark:bg-stone-700" />
        <span className="h-2.5 w-2.5 rounded-full bg-stone-300 dark:bg-stone-700" />
        <span className="h-2.5 w-2.5 rounded-full bg-stone-300 dark:bg-stone-700" />
      </div>
      <Image src={shot.src} alt={shot.alt} width={1440} height={900} priority={priority} className="w-full h-auto" sizes="(min-width: 1024px) 960px, 100vw" />
    </button>
  );
}

function PhoneFrame({ shot, onClick }: { shot: Shot; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="block shrink-0 w-[200px] md:w-[190px] lg:w-[200px] snap-center rounded-[2.2rem] border-[6px] border-[#1f1f1f] dark:border-[#2a2a2a] bg-black overflow-hidden shadow-sm transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400"
      aria-label={`Enlarge: ${shot.alt}`}
    >
      <Image src={shot.src} alt={shot.alt} width={780} height={1688} className="w-full h-auto" sizes="200px" />
    </button>
  );
}

export function Gallery({ desktop, mobile }: { desktop: Shot[]; mobile: Shot[] }) {
  const [view, setView] = useState<View>(desktop.length ? "desktop" : "mobile");
  const [open, setOpen] = useState<{ view: View; index: number } | null>(null);
  const list = open ? (open.view === "desktop" ? desktop : mobile) : [];

  const step = useCallback(
    (d: number) => setOpen((o) => (o ? { ...o, index: (o.index + d + list.length) % list.length } : o)),
    [list.length]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, step]);

  const tabs: { id: View; label: string; Icon: typeof Monitor }[] = [
    { id: "desktop", label: "Desktop", Icon: Monitor },
    { id: "mobile", label: "Mobile", Icon: Smartphone },
  ];

  return (
    <section className={cn(card, "p-4 md:p-8")} aria-label="Screenshots">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className={cn("text-2xl", heading)}>Screenshots</h2>
        <div role="tablist" className="flex rounded-full border border-[#d9dbde] dark:border-[#242424] p-1 bg-[#f4f5f6] dark:bg-black">
          {tabs.filter(({ id }) => (id === "desktop" ? desktop : mobile).length > 0).map(({ id, label, Icon }) => (
            <button
              key={id}
              role="tab"
              aria-selected={view === id}
              onClick={() => setView(id)}
              className={cn(
                "flex items-center gap-2 rounded-full px-4 py-1.5 text-sm transition-colors",
                view === id
                  ? "bg-white dark:bg-[#242424] text-[#1f1f1f] dark:text-[#e5e5e5] shadow-sm"
                  : "text-stone-500 hover:text-[#1f1f1f] dark:hover:text-[#cccccc]"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {view === "desktop" ? (
        <div className="grid gap-4 md:grid-cols-2">
          {desktop.map((s, i) => (
            <figure key={s.src} className={cn(i === 0 && desktop.length % 2 === 1 && "md:col-span-2")}>
              <BrowserFrame shot={s} onClick={() => setOpen({ view: "desktop", index: i })} />
              <figcaption className="mt-2 text-sm text-stone-500">{s.alt}</figcaption>
            </figure>
          ))}
        </div>
      ) : (
        <div className="-mx-4 md:mx-0 px-4 md:px-0 flex gap-5 overflow-x-auto snap-x snap-mandatory pb-2 md:justify-center">
          {mobile.map((s, i) => (
            <figure key={s.src} className="shrink-0">
              <PhoneFrame shot={s} onClick={() => setOpen({ view: "mobile", index: i })} />
              <figcaption className="mt-2 w-[200px] md:w-[190px] lg:w-[200px] text-sm text-stone-500">{s.alt}</figcaption>
            </figure>
          ))}
        </div>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            data-overlay-open
            role="dialog"
            aria-modal="true"
            aria-label={list[open.index].alt}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <motion.div
              key={list[open.index].src}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className={cn("relative", open.view === "desktop" ? "w-full max-w-6xl" : "h-[85vh] aspect-[390/844]")}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={list[open.index].src}
                alt={list[open.index].alt}
                width={open.view === "desktop" ? 1440 : 780}
                height={open.view === "desktop" ? 900 : 1688}
                className={cn("rounded-2xl", open.view === "desktop" ? "w-full h-auto" : "h-full w-auto")}
                sizes="100vw"
              />
              <p className="mt-3 text-center text-sm text-stone-300">
                {list[open.index].alt} · {open.index + 1}/{list.length}
              </p>
            </motion.div>
            <button aria-label="Close" onClick={() => setOpen(null)} className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10">
              <X className="h-5 w-5" />
            </button>
            {list.length > 1 && (
              <>
                <button aria-label="Previous screenshot" onClick={(e) => { e.stopPropagation(); step(-1); }} className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white hover:bg-white/10">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button aria-label="Next screenshot" onClick={(e) => { e.stopPropagation(); step(1); }} className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white hover:bg-white/10">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
