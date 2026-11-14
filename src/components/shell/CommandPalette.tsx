"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Copy, FileText, FolderOpen, Home, Moon, Search, User } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { projects } from "@/data/projects";
import { activeSocials, site } from "@/data/site";
import { SocialIcon } from "./SocialIcon";
import { cn } from "@/lib/utils";

type Item = { id: string; label: string; hint?: string; group: string; icon: React.ReactNode; run: () => void };

const PaletteContext = createContext<() => void>(() => {});
export const useOpenPalette = () => useContext(PaletteContext);

export function CommandPalette({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);

  const items: Item[] = useMemo(() => {
    const go = (href: string) => () => router.push(href);
    const ext = (href: string) => () => window.open(href, "_blank", "noopener,noreferrer");
    return [
      { id: "home", label: "Home", group: "Pages", icon: <Home className="h-4 w-4" />, run: go("/") },
      { id: "about", label: "About me", group: "Pages", icon: <User className="h-4 w-4" />, run: go("/about") },
      { id: "resume", label: "Resume", group: "Pages", icon: <FileText className="h-4 w-4" />, run: go("/resume") },
      ...projects.map((p) => ({
        id: `p-${p.slug}`,
        label: p.title,
        hint: p.kind,
        group: "Projects",
        icon: <FolderOpen className="h-4 w-4" />,
        run: go(`/projects/${p.slug}`),
      })),
      {
        id: "copy",
        label: "Copy email",
        hint: site.email,
        group: "Actions",
        icon: <Copy className="h-4 w-4" />,
        run: () => {
          navigator.clipboard?.writeText(site.email).then(() => {
            setToast("Email copied");
            setTimeout(() => setToast(null), 1800);
          });
        },
      },
      {
        id: "theme",
        label: "Toggle theme",
        group: "Actions",
        icon: <Moon className="h-4 w-4" />,
        run: () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
      },
      { id: "source", label: "View source", group: "Actions", icon: <ArrowUpRight className="h-4 w-4" />, run: ext(site.source) },
      ...activeSocials
        .filter((s) => s.external)
        .map((s) => ({ id: `s-${s.name}`, label: s.name, group: "Elsewhere", icon: <SocialIcon icon={s.icon} className="h-4 w-4" />, run: ext(s.url) })),
    ];
  }, [router, resolvedTheme, setTheme]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => `${i.label} ${i.hint ?? ""} ${i.group}`.toLowerCase().includes(q));
  }, [items, query]);

  const show = useCallback(() => {
    setQuery("");
    setActive(0);
    setOpen(true);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => {
          if (!o) {
            setQuery("");
            setActive(0);
          }
          return !o;
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  const runAt = (i: number) => {
    const item = filtered[i];
    if (!item) return;
    setOpen(false);
    item.run();
  };

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      runAt(active);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    }
  };

  let lastGroup = "";

  return (
    <PaletteContext.Provider value={show}>
      {children}
      <AnimatePresence>
        {open && (
          <motion.div
            data-overlay-open
            className="fixed inset-0 z-[200] flex items-start justify-center bg-black/40 backdrop-blur-sm px-4 pt-[12vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Command menu"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg overflow-hidden rounded-3xl border border-[#d9dbde] dark:border-[#242424] bg-white dark:bg-[#141414] shadow-2xl font-quicksand"
            >
              <div className="flex items-center gap-3 border-b border-[#d9dbde] dark:border-[#242424] px-5">
                <Search className="h-4 w-4 text-stone-500" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setActive(0);
                  }}
                  onKeyDown={onInputKey}
                  placeholder="Jump to a project, page or action…"
                  aria-label="Search commands"
                  role="combobox"
                  aria-expanded="true"
                  aria-controls="palette-list"
                  aria-activedescendant={filtered[active] ? `cmd-${filtered[active].id}` : undefined}
                  className="h-14 w-full bg-transparent text-[#1f1f1f] dark:text-[#e5e5e5] placeholder:text-stone-500 outline-none"
                />
                <kbd className="hidden sm:block rounded-md border border-[#d9dbde] dark:border-[#333] px-1.5 py-0.5 text-[10px] text-stone-500">ESC</kbd>
              </div>
              <ul id="palette-list" role="listbox" className="max-h-[55vh] overflow-y-auto p-2">
                {filtered.length === 0 && <li className="px-3 py-6 text-center text-sm text-stone-500">Nothing matches “{query}”.</li>}
                {filtered.map((item, i) => {
                  const header = item.group !== lastGroup;
                  lastGroup = item.group;
                  return (
                    <li key={item.id} role="presentation">
                      {header && <p className="px-3 pt-3 pb-1 text-[11px] uppercase tracking-[0.18em] text-stone-500">{item.group}</p>}
                      <div
                        id={`cmd-${item.id}`}
                        role="option"
                        aria-selected={i === active}
                        onMouseMove={() => setActive(i)}
                        onClick={() => runAt(i)}
                        className={cn(
                          "flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-[#1f1f1f] dark:text-[#cccccc]",
                          i === active && "bg-[#f4f5f6] dark:bg-[#1f1f1f]"
                        )}
                      >
                        <span className="text-stone-500">{item.icon}</span>
                        <span>{item.label}</span>
                        {item.hint && <span className="ml-auto truncate text-sm text-stone-500">{item.hint}</span>}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="fixed bottom-6 left-1/2 z-[210] -translate-x-1/2 rounded-full bg-[#1f1f1f] px-4 py-2 text-sm text-white dark:bg-[#e5e5e5] dark:text-black"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </PaletteContext.Provider>
  );
}

export function CommandButton() {
  const open = useOpenPalette();
  return (
    <button
      onClick={open}
      aria-label="Open command menu"
      className="relative w-36 h-12 px-4 rounded-2xl flex items-center justify-center gap-2 text-[#1f1f1f] dark:text-[#cccccc] bg-white/10 dark:bg-black/10 backdrop-blur-md border border-[#d9dbde] dark:border-[#242424] shadow-sm transition-all duration-300 hover:scale-[1.02] active:scale-95"
    >
      <Search className="w-5 h-5" />
      <span className="text-sm font-medium">Search</span>
      <kbd className="text-[10px] text-stone-500">⌘K</kbd>
    </button>
  );
}
