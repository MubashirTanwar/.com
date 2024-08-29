"use client"  
import Image from "next/image";
import React, { useEffect } from "react";

function Head() {
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
    <div id="" className="bg-black font-mono cursor-none">
      <div id="mouse"         className="fixed h-8 w-8 bg-gray-400/50 rounded-full shadow-lg transition-transform duration-100 ease-linear transform-gpu"
        style={{ top: '40px', left: '40px' }}>
      </div>
      <div className="grid grid-cols-1 gap-4 border border-[#242424] bg-black p-4 lg:grid-cols-3">
        <div className="col-span-1 rounded-3xl border border-[#242424] bg-[#141414] md:col-span-2 lg:col-span-1">
          <div className="p-6">
            <h1 className="mt-3 text-3xl text-white">Hi, I am Mubashir -</h1>
            <p className="mt-6 text-stone-500">
              Web Developer, Freelancer, Currently Learning Deep Learning
            </p>
          </div>
        </div>

        <div className="col-span-1 rounded-3xl border border-[#242424] bg-[#141414] md:col-span-1 lg:col-span-1">
          <div className="p-6">
            <h1 className="mt-3 text-3xl text-white">About</h1>
            <p className="mt-6 text-stone-500">
              I make stuff happen with lines of code
            </p>
          </div>
        </div>

        <div className="col-span-1 hidden rounded-3xl border border-[#242424] bg-[#141414] md:col-span-1 md:block lg:col-span-1 lg:w-full">
          
            <img
              src="/pfp.jpg"
              alt="Mubashir Tanwar"
              
              className="rounded-3xl h-60 w-full object-cover"
            />
     
        </div>
      </div>
    </div>
  );
}

export default Head;
