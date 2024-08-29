"use client"
import Head from "@/components/home/Head";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const mouseElement = document.getElementById('mouse');

    const handleMouseMove = (e: any) => {
      const curX = e.clientX;
      const curY = e.clientY;

      if (mouseElement) {
        mouseElement.style.left = `${curX - 10}px`;
        mouseElement.style.top = `${curY - 10}px`;
      }
    };

    document.body.addEventListener('mousemove', handleMouseMove);

    // Clean up event listener on component unmount
    return () => {
      document.body.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  return (
   <Head /> 
  );
}
