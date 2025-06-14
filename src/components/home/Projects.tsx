// Projects.js
import React from "react";
import ExperienceTimeline from "./Experience";

function Projects() {
  return (
    <div className="grid grid-cols-3  gap-4 pt-4">
      <div className="col-span-3  space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 gap-4">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <ProjectCard src="/projects/bestfares/stock.png" alt="Bestfares365" title="Bestfares365" 
              description="Made as a part of my internship at FuzzyNodes, this is a complete flight booking website, with wallets, payment gateways, B2B and B2C features, with a custom CMS and CRM system."
            />
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <ProjectCard src="/projects/prana/stock2.png" alt="Prana" title="Prana Astrology" 
              description="A complete astrology website with consulation booking, daily horoscope, and other astrology features. Built for renowned astrologer Pandit Chandrashekhar Sharma."
            />
          </div>
          <div className="col-span-1 md:col-span-4 lg:col-span-1">
            <ProjectCard src="/projects/cardagain/stock.png" alt="CardAgain" title="CardAgain" 
              description="A pokemon card and bundle ecommerce website, built on top of my custom CMS and CRM template, including features subscription, referrals, grading, giveaways, and more."
            />
          </div>
        </div>
        <ExperienceCard />
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
    <div className="bg-[#141414] border border-[#242424] rounded-3xl p-3 md:p-6">
      <h1 className="text-3xl text-white pt-6 pl-6 md:p-0">Experience</h1>
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
        description = "This is a project description that can be used to provide more context about the project and its features.",
    }: {
        src: string;
        alt: string;
        title: string;
        description?: string;
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
          {description && (
            <p className="text-zinc-400 text-sm">
              {description}
            </p>
          )} 
        </div>
      </div>
    </div>
  );
}