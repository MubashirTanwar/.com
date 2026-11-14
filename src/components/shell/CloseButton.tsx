"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { canGoBack } from "./history";

/** Round close button at the top of a sub-page. Goes back (keeping the home scroll position) or home. Esc works too. */
export function CloseButton() {
  const router = useRouter();
  const close = useCallback(() => {
    if (canGoBack()) router.back();
    else router.push("/");
  }, [router]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !document.querySelector("[data-overlay-open]")) close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  return (
    <div className="flex justify-center pt-4 pb-8 md:pt-8 md:pb-12">
      <button
        onClick={close}
        aria-label="Close and go back"
        className="group flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#d9dbde] dark:border-[#242424] bg-white dark:bg-[#141414] text-[#1f1f1f] dark:text-[#cccccc] transition-colors hover:border-stone-400 dark:hover:border-stone-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400"
      >
        <X className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
      </button>
    </div>
  );
}
