import Image from "next/image";
import React from "react";

function Head() {
  return (
    <div className="bg-black font-mono">
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
