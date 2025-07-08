"use client";
import { Projects, Stack, Carousel, Links, Head } from "@/components/home";
import { DownloadResume } from "@/components/home/DownloadResume";
import { CopyMailButton } from "@/components/home/MailCopy";
import { ViewSource } from "@/components/home/ViewSource";
import FamilyButton from "@/components/ui/family-button";
import { ThemeToggle } from "@/components/ui/theme-toggler";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const mouseElement = document.getElementById("mouse");

    const handleMouseMove = (e: any) => {
      const curX = e.clientX;
      const curY = e.clientY;

      if (mouseElement) {
        mouseElement.style.left = `${curX - 10}px`;
        mouseElement.style.top = `${curY - 10}px`;
      }
    };

    document.body.addEventListener("mousemove", handleMouseMove);

    // Clean up event listener on component unmount
    return () => {
      document.body.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  return (
    <div className="p-3 md:p-5 bg-[#f4f5f6] dark:bg-black font-quicksand">
      <div className="bg-[#f4f5f6] dark:bg-black p-3 md:p-5 select-none border-[#d9dbde] dark:border-[#242424] border-2 rounded-3xl">
        <Head />
        <Stack />
        <Projects />
      </div>
    </div>
  );
}
