"use client";

import React from "react";
import {  Github } from "lucide-react";
import { cn } from "@/lib/utils";

export function ViewSource() {




  return (
    <button
        onClick={() => window.open("https://www.github.com/MubashirTanwar/.com", "_blank", "noopener,noreferrer")}
      aria-label="View Source on GitHub"
      className={cn(
        "relative w-36 h-12 px-4 rounded-2xl overflow-hidden select-none cursor-pointer",
        "flex items-center justify-center gap-2 text-[#1f1f1f] dark:text-[#cccccc]",
        "bg-white/10 dark:bg-black/10 backdrop-blur-md border",
        "border-[#d9dbde] dark:border-[#242424] shadow-sm",
        "transition-all duration-300 hover:scale-[1.02] active:scale-95 focus:outline-none"
      )}
    >

        <>
          <Github className="w-5 h-5" />
          <span className="text-sm font-medium">View Source</span>
        </>


  
    </button>
  );
}
