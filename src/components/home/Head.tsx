"use client";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import React, { useEffect } from "react";

function Head() {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 bg-black  lg:grid-cols-3">
        <div className="col-span-1 rounded-3xl border border-[#242424] bg-[#141414] md:col-span-2 lg:col-span-1">
          <div className="p-6">
            <h1 className="mt-3 text-3xl text-white">Hi, I am Mubashir -</h1>
            <p className="mt-6 text-stone-500 text-xl">
              Web Developer, Freelancer, Currently Learning Deep Learning
            </p>
          </div>
        </div>
        <div className="col-span-1 min-h-60 sm:min-h-48  group rounded-3xl border border-[#242424] bg-[#141414] hover:bg-opacity-50 relative z-0">
          <div className="p-6 ">
            <h1 className="text-xl font-medium text-stone-500">About</h1>
            <p className="mt-4 text-white text-3xl font-light">
              I make stuff happen with code
            </p>
          </div>
          {/* Icon positioned at the bottom right */}
          <div className="absolute bottom-4 right-4  md:none">
            <div className="relative border-2 border-[#242424] hover:border-[#343434] flex items-center justify-center rounded-full h-16 w-16 overflow-hidden  transition-transform duration-100 ease-in-out hover:rotate-45">
              <div className="flex items-center justify-center">
                <div className="absolute transition-transform duration-300 ease-in-out group-hover:translate-x-12 group-hover:-translate-y-12">
                  <ArrowUpRight className="text-white h-6 w-6" />
                </div>
                <div className="absolute transition-transform duration-300 ease-in-out -translate-x-12 translate-y-12 group-hover:translate-x-0 group-hover:-translate-y-0 ">
                  <ArrowUpRight className="text-white h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 hidden rounded-3xl border border-[#242424] bg-[#141414] md:col-span-1 md:block lg:col-span-1 lg:w-full">
          <img
            src="/pfp.jpg"
            alt="Mubashir Tanwar"
            className="rounded-3xl h-72 w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Head;
