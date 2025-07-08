"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Download } from "lucide-react";
import resumeData from "@/data/resume-data.json";
import { Badge } from "@/components/home/Experience";

const resumeSections = [
  { id: "header", label: "Contact" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "freelance", label: "Freelance" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
];

export default function ResumePage() {
  const [activeSection, setActiveSection] = useState("header");
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const observers = new Map();

    resumeSections.forEach((section) => {
      const element = sectionRefs.current[section.id];
      if (element) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveSection(section.id);
            }
          },
          { threshold: 0.3, rootMargin: "-100px 0px -50% 0px" }
        );
        observer.observe(element);
        observers.set(section.id, observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = sectionRefs.current[sectionId];
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const downloadResume = () => {
    // Create a link element and trigger download
    const link = document.createElement("a");
    link.href = "/resume.pdf"; // This will point to your PDF file in the public folder
    link.download = `${resumeData.personal.name.replace(
      /\s+/g,
      "_"
    )}_Resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-3 md:p-5 bg-[#f4f5f6] dark:bg-black font-quicksand">
      <div className="fixed bottom-0 right-0 z-50 p-4 md:p-6 ">
        <div
          onClick={downloadResume}
          className="group flex flex-row items-center justify-center space-x-4 cursor-pointer p-4 rounded-full text-gray-700 dark:text-gray-300 border border-[#d9dbde] dark:border-[#242424] p-x-4 w-full bg-white dark:bg-[#141414] transition-colors duration-200"
        >
          <span className="text-lg font-semibold">Download</span>

          <div className="">
            <div className="relative border-2 border-[#d9dbde] hover:border-[#d9dbde] dark:border-[#242424] flex items-center justify-center rounded-full h-16 w-16 overflow-hidden  transition-transform duration-100 ease-in-out hover:rotate-45">
              <div className="flex items-center justify-center">
                <div className="absolute transition-transform duration-300 ease-in-out group-hover:translate-x-12 group-hover:-translate-y-12">
                  <ArrowUpRight className="text-[#1f1f1f] dark:text-[#cccccc] h-6 w-6" />
                </div>
                <div className="absolute transition-transform duration-300 ease-in-out -translate-x-12 translate-y-12 group-hover:translate-x-0 group-hover:-translate-y-0 ">
                  <ArrowUpRight className="text-[#1f1f1f] dark:text-[#cccccc] h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#f4f5f6] dark:bg-black p-3 md:p-5 select-none border-[#d9dbde] dark:border-[#242424] border-2 rounded-3xl">
        <div className="mx-auto grid grid-cols-1 lg:grid-cols-5 gap-0">
          {/* Left Sidebar - Navigation */}
          <div className="col-span-1  rounded-3xl border border-[#d9dbde] dark:border-[#242424] bg-white dark:bg-[#141414] md:col-span-2 lg:col-span-1">
            <div className="sticky top-0 p-2 md:p-8">
  <div className="md:space-y-1">
    {/* Mobile: Horizontal scrollable navigation */}
    <div className="flex md:hidden overflow-x-auto items-center justify-between scrollbar-hide">
      {resumeSections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className={`flex-shrink-0 px-3 py-2 text-xs font-medium rounded-full transition-colors duration-200 whitespace-nowrap ${
            activeSection === section.id
              ? "text-blue-400 bg-blue-400/20 border border-blue-400/30"
              : "text-gray-600  bg-gray-800/50 hover:text-[#1f1f1f] dark:text-[#cccccc] hover:bg-gray-700/50"
          }`}
        >
          {section.label}
        </button>
      ))}
    </div>

    {/* Desktop: Vertical navigation */}
    <div className="hidden md:block space-y-1">
      {resumeSections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className={`block w-full text-left px-4 py-2 text-sm transition-colors duration-200 ${
            activeSection === section.id
              ? "text-blue-400 border-l-2 border-blue-400 bg-blue-400/5"
              : "text-gray-600  hover:text-[#1f1f1f] dark:text-[#cccccc]"
          }`}
        >
          {section.label}
        </button>
      ))}
    </div>
  </div>
</div>
          </div>

          {/* Right Content - Resume */}
          <div className="lg:col-span-4 pt-8 lg:pt-0 lg:pl-8 text-gray-600 dark:text-gray-400">
            <div className="w-full space-y-3 md:space-y-8">
              {/* Header Section */}
              <section
                id="header"
                ref={(el) => {
                  sectionRefs.current.header = el;
                }}
                className={`transition-all duration-300 rounded-3xl border border-[#d9dbde] dark:border-[#242424] bg-white dark:bg-[#141414] p-5 ${
                  activeSection === "header"
                    ? "border-l-2  border-blue-400 pl-6"
                    : ""
                }`}
              >
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold mb-2">
                    {resumeData.personal.name}
                  </h1>
                  <div className="text-gray-700 dark:text-gray-300 space-y-4">
                    <p>{resumeData.personal.location}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      {resumeData.personal.links.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          target={
                            link.url.startsWith("http") ? "_blank" : "_self"
                          }
                          rel={
                            link.url.startsWith("http")
                              ? "noopener noreferrer"
                              : ""
                          }
                          className="inline-block"
                        >
                          <Badge className="bg-zinc-200 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400 300">
                            {link.label}
                          </Badge>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Skills Section */}
              <section
                id="skills"
                ref={(el) => {
                  sectionRefs.current.skills = el;
                }}
                className={`transition-all duration-300 rounded-3xl border border-[#d9dbde] dark:border-[#242424] bg-white dark:bg-[#141414] p-5 ${
                  activeSection === "skills" ? " border-blue-400 pl-6" : ""
                }`}
              >
                <h2 className="text-2xl font-bold mb-6 text-blue-400">
                  SKILLS
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(resumeData.skills).map(
                      ([category, skills]) => (
                        <div key={category}>
                          <h3 className="font-semibold mb-2">{category}:</h3>
                          <p className="text-gray-700 dark:text-gray-300">{skills}</p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </section>

              {/* Work Experience Section */}
              <section
                id="experience"
                ref={(el) => {
                  sectionRefs.current.experience = el;
                }}
                className={`transition-all duration-300 rounded-3xl border border-[#d9dbde] dark:border-[#242424] bg-white dark:bg-[#141414] p-5 ${
                  activeSection === "experience"
                    ? "border-l-2 border-blue-400 pl-6"
                    : ""
                }`}
              >
                <h2 className="text-2xl font-bold mb-6 text-blue-400">
                  WORK EXPERIENCE
                </h2>
                <div className="space-y-8">
                  {resumeData.experience.map((job, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-semibold">{job.title}</h3>
                          <p className="text-blue-400">{job.company}</p>
                        </div>
                        <span className="text-gray-600 dark:text-gray-400 text-sm">
                          {job.period}
                        </span>
                      </div>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                        {job.responsibilities.map((responsibility, idx) => (
                          <li key={idx}>{responsibility}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* Freelance Section */}
              <section
                id="freelance"
                ref={(el) => {
                  sectionRefs.current.freelance = el;
                }}
                className={`transition-all duration-300 rounded-3xl border border-[#d9dbde] dark:border-[#242424] bg-white dark:bg-[#141414] p-5 ${
                  activeSection === "freelance"
                    ? "border-l-2 border-blue-400 pl-6"
                    : ""
                }`}
              >
                <h2 className="text-2xl font-bold mb-6 text-blue-400">
                  FREELANCE PROJECTS
                </h2>
                <div className="space-y-6">
                  {resumeData.freelance.map((freelanceWork, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold">
                          {freelanceWork.title}
                        </h3>
                        <span className="text-gray-600 dark:text-gray-400 text-sm">
                          {freelanceWork.period}
                        </span>
                      </div>
                      <div className="space-y-4 text-gray-700 dark:text-gray-300">
                        <p>{freelanceWork.description}</p>
                        <div>
                          <h4 className="font-semibold text-[#1f1f1f] dark:text-[#cccccc] mb-2">
                            Developed custom eCommerce platforms:
                          </h4>
                          <ul className="list-disc list-inside space-y-1 ml-4">
                            {freelanceWork.ecommerceProjects.map(
                              (project, idx) => (
                                <li key={idx}>
                                  <strong>{project.name}:</strong>{" "}
                                  {project.description}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#1f1f1f] dark:text-[#cccccc] mb-2">
                            Delivered specialized platforms for diverse domains:
                          </h4>
                          <ul className="list-disc list-inside space-y-1 ml-4">
                            {freelanceWork.specializedProjects.map(
                              (project, idx) => (
                                <li key={idx}>
                                  <strong>{project.name}:</strong>{" "}
                                  {project.description}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Projects Section */}
              <section
                id="projects"
                ref={(el) => {
                  sectionRefs.current.projects = el;
                }}
                className={`transition-all duration-300 rounded-3xl border border-[#d9dbde] dark:border-[#242424] bg-white dark:bg-[#141414] p-5 ${
                  activeSection === "projects"
                    ? "border-l-2 border-blue-400 pl-6"
                    : ""
                }`}
              >
                <h2 className="text-2xl font-bold mb-6 text-blue-400">
                  PROJECTS
                </h2>
                <div className="space-y-8">
                  {resumeData.projects.map((project, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold">
                          {project.title}
                        </h3>
                        <span className="text-gray-600 dark:text-gray-400 text-sm">
                          {project.period}
                        </span>
                      </div>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                        {project.description.map((desc, idx) => (
                          <li key={idx}>{desc}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* Education Section */}
              <section
                id="education"
                ref={(el) => {
                  sectionRefs.current.education = el;
                }}
                className={`transition-all duration-300 rounded-3xl border border-[#d9dbde] dark:border-[#242424] bg-white dark:bg-[#141414] p-5 ${
                  activeSection === "education"
                    ? "border-l-2 border-blue-400 pl-6"
                    : ""
                }`}
              >
                <h2 className="text-2xl font-bold mb-6 text-blue-400">
                  EDUCATION
                </h2>
                <div className="space-y-6">
                  {resumeData.education.map((edu, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-semibold">
                            {edu.institution}
                          </h3>
                          <p className="text-gray-700 dark:text-gray-300">{edu.degree}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-gray-600 dark:text-gray-400 text-sm">
                            {edu.period}
                          </span>
                          <p className="text-gray-700 dark:text-gray-300">{edu.gpa}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
