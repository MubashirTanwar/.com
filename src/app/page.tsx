"use client";
import Head from "@/components/home/Head";
import Stack from "@/components/home/Stack";
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
    <div className="p-5 bg-black fon cursor-none">
      <div
        id=""
        className="bg-black fon cursor-none p-2 select-none border-[#242424] border-2 rounded-3xl"
      >
        <div
          id="mouse"
          className="hidden md:block fixed h-8 w-8 bg-gray-400/50 rounded-full shadow-lg transition-transform duration-150 ease-linear transform -translate-x-1/2 -translate-y-1/2"
          style={{ top: "40px", left: "40px" }}
        ></div>
        <Head />
        <Stack />
      </div>
    </div>
  );
}
