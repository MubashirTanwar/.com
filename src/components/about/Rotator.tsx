"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Auto-advancing card with dots, like the "What I do best" card in the reference. Pauses on hover. */
export function Rotator({ slides, interval = 4500 }: { slides: { title: string; body: string }[]; interval?: number }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((n) => (n + 1) % slides.length), interval);
    return () => clearInterval(t);
  }, [paused, slides.length, interval]);

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} className="flex h-full flex-col">
      <div className="relative min-h-[9.5rem]">
        <AnimatePresence mode="wait">
          <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}>
            <h3 className="text-2xl text-[#1f1f1f] dark:text-[#cccccc]">{slides[i].title}</h3>
            <p className="mt-3 leading-relaxed text-stone-600 dark:text-stone-400">{slides[i].body}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mt-auto flex justify-center gap-2 pt-4" role="tablist" aria-label="Slides">
        {slides.map((s, n) => (
          <button
            key={s.title}
            role="tab"
            aria-selected={n === i}
            aria-label={s.title}
            onClick={() => setI(n)}
            className={cn("h-2 rounded-full transition-all", n === i ? "w-5 bg-stone-500" : "w-2 bg-stone-300 dark:bg-stone-700")}
          />
        ))}
      </div>
    </div>
  );
}

/** Photo card with arrows and dots. */
export function PhotoRotator({ photos }: { photos: { src: string; alt: string }[] }) {
  const [i, setI] = useState(0);
  const go = (d: number) => setI((n) => (n + d + photos.length) % photos.length);
  return (
    <div className="group relative h-full min-h-72 overflow-hidden rounded-3xl">
      <AnimatePresence initial={false}>
        <motion.img
          key={photos[i].src}
          src={photos[i].src}
          alt={photos[i].alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>
      {photos.length > 1 && (
        <>
          <button aria-label="Previous photo" onClick={() => go(-1)} className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/40 text-white backdrop-blur-sm opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
            ‹
          </button>
          <button aria-label="Next photo" onClick={() => go(1)} className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/40 text-white backdrop-blur-sm opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
            ›
          </button>
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {photos.map((p, n) => (
              <span key={p.src} className={cn("h-1.5 w-1.5 rounded-full", n === i ? "bg-white" : "bg-white/50")} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
