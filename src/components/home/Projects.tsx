// Projects.js
import React from "react";
import ExperienceTimeline from "./Experience";

function Projects() {
  return (
    <div className="grid grid-cols-3 lg:grid-cols-11 gap-4 pt-4">
      <div className="col-span-3 lg:col-span-9 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 gap-4">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <ProjectCard src="/projects/proj-1.jpeg" alt="Project 1" title="Project 1" />
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <ProjectCard src="/projects/proj-2.jpeg" alt="Project 2" title="Project 2" />
          </div>
          <div className="col-span-1 md:col-span-4 lg:col-span-1">
            <ProjectCard src="/projects/proj-3.jpeg" alt="Project 3" title="Project 3" />
          </div>
        </div>
        <ExperienceCard />
      </div>
      <div className="col-span-3 lg:col-span-2">
        <BlogsCard />
      </div>
    </div>
  );
}

export default Projects;



// BlogsCard.js
function BlogsCard() {
  return (
    <div className="bg-[#141414] h-72 border border-[#242424] rounded-3xl p-6">
      <h1 className="text-3xl text-white">Blogs</h1>
    </div>
  );
}

function ExperienceCard() {
  return (
    <div className="bg-[#141414] border border-[#242424] rounded-3xl p-6">
      <h1 className="text-3xl text-white">Experience</h1>
      <div className="space-y-4 mt-4">
        <ExperienceTimeline />
      </div>
    </div>
  );
}

import { ArrowUpRight } from "lucide-react";

function ProjectCard(
    {
        src,
        alt,
        title,
    }: {
        src: string;
        alt: string;
        title: string;
    }
) {
  return (
    <div className="relative group border border-[#242424] rounded-3xl overflow-hidden">
      <img
        src={src}
        alt={alt}
        className="rounded-3xl h-48 lg:h-72 w-full object-cover group-hover:scale-100 scale-110 transition duration-300 ease-in-out"
      />
      <div className="absolute inset-0 rounded-xl z-50 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out cursor-pointer bg-gradient-to-t from-black to-transparent -bottom-2 pt-30 text-white flex items-end">
        <div className="p-6 space-y-3 text-xl group-hover:opacity-100 group-hover:translate-y-0 translate-y-12 pb-6 transform transition duration-500 ease-in-out flex flex-col w-full">
          <div className="font-semibold flex items-center justify-between w-full">
            <h1 className="text-white">{title}</h1>
            <ArrowUpRight className="text-white h-6 w-6 ml-auto group-hover:rotate-45 transition-transform duration-700 ease-in-out" />
          </div>
        </div>
      </div>
    </div>
  );
}