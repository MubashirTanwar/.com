"use client";
import { Projects, Stack, Carousel, Links, Head } from "@/components/home";
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
    <div className="p-3 md:p-5 bg-black">
      <div className="bg-black p-3 md:p-5 select-none border-[#242424] border-2 rounded-3xl">
        <Head />
        <Stack />
        <Projects />
      </div>
    </div>
  );
}
