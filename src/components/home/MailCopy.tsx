"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export function CopyMailButton() {
  const [copied, setCopied] = useState(false);
  const email = "tanwar0210@gmail.com"; 

  const handleCopy = () => {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={handleCopy}
      aria-label="Copy email to clipboard"
      className={cn(
        "relative w-36 h-12 px-4 rounded-2xl overflow-hidden select-none cursor-pointer",
        "flex items-center justify-center gap-2 text-[#1f1f1f] dark:text-[#cccccc]",
        "bg-white/10 dark:bg-black/10 backdrop-blur-md border",
        "border-[#d9dbde] dark:border-[#242424] shadow-sm",
        "transition-all duration-300 hover:scale-[1.02] active:scale-95 focus:outline-none"
      )}
    >
      {copied ? (
        <>
          <Check className="w-5 h-5" />
          <span className="text-sm font-medium">Copied!</span>
        </>
      ) : (
        <>
          <Copy className="w-5 h-5" />
          <span className="text-sm font-medium">Copy Mail</span>
        </>
      )}
    </button>
  );
}
