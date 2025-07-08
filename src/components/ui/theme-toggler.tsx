"use client";

import { useEffect, useState } from "react";
import { Classic } from "@theme-toggles/react";
import "@theme-toggles/react/css/Classic.css";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialDarkMode = storedTheme === "dark" || (!storedTheme && prefersDark);

    setIsDarkMode(initialDarkMode);

    if (initialDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative w-20 h-10 rounded-full p-1 shadow-md transition-all duration-500 ease-in-out",
        "focus:outline-none backdrop-blur-md",
        "border border-[#d9dbde] dark:border-[#242424]",
        "bg-white/10 dark:bg-black/10"
      )}
      aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
    >
      {/* Track inner background */}
      <div
        className={cn(
          "absolute inset-1 rounded-full transition-colors duration-500",
          isDarkMode ? "bg-[#141414]/60" : "bg-white/50"
        )}
      />

      {/* Knob */}
      <div
        className={cn(
          "absolute top-1 w-8 h-8 rounded-full shadow-lg transition-all duration-500 ease-in-out",
          "flex items-center justify-center z-10 backdrop-blur-md border",
          isDarkMode
            ? "left-11 bg-black/20 border-[#242424]"
            : "left-1 bg-white/70 border-[#d9dbde]"
        )}
      >
        <div
          className={cn(
            "flex items-center justify-center transition-colors duration-500",
            isDarkMode ? "[&>*]:text-[#cccccc]" : "[&>*]:text-[#1f1f1f]"
          )}
        >
          <Classic
            toggled={isDarkMode}
            toggle={() => {}}
            duration={750}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
        </div>
      </div>
    </button>
  );
}
