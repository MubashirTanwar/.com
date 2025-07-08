

  "use client";

import React from "react";
import {  FileText, Github } from "lucide-react";
import { cn } from "@/lib/utils";

export function DownloadResume() {

  const downloadResume = () => {
    // Create a link element and trigger download
    const link = document.createElement("a");
    link.href = "/resume.pdf"; // This will point to your PDF file in the public folder
    link.download = `Mubashit_Tanwar_Resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <button
        onClick={downloadResume}
      aria-label="Download Resume"
      className={cn(
        "relative w-36 h-12 px-4 rounded-2xl overflow-hidden select-none cursor-pointer",
        "flex items-center justify-center gap-2 text-[#1f1f1f] dark:text-[#cccccc]",
        "bg-white/10 dark:bg-black/10 backdrop-blur-md border",
        "border-[#d9dbde] dark:border-[#242424] shadow-sm",
        "transition-all duration-300 hover:scale-[1.02] active:scale-95 focus:outline-none"
      )}
    >

        <>
          <FileText className="w-5 h-5" />
          <span className="text-sm font-medium">
                 Resume
          </span>
        </>


  
    </button>
  );
}
