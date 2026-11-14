import Link from "next/link";
import { ExternalLinkIcon, GithubIcon, ArrowUpRight } from "lucide-react";
import resumeData from "@/data/resume-data.json";

type Job = {
  title: string;
  company: string;
  period: string;
  responsibilities: string[];
  skills?: string[];
  link?: string;
  github?: string;
  project?: string;
};

export const jobs = resumeData.experience as Job[];

/** "SOFTWARE DEVELOPER INTERN" -> "Software Developer Intern"; keeps tokens like "SDE-1". */
export const prettyTitle = (t: string) =>
  t
    .split(" ")
    .map((w) => (/\d/.test(w) ? w : w.charAt(0) + w.slice(1).toLowerCase()))
    .join(" ");

export default function ExperienceTimeline() {
  return (
    <div>
      {jobs.map((exp) => (
        <div
          key={exp.title + exp.period}
          className="relative hover:bg-[#f7f6f6] hover:dark:bg-[#121212]/70 p-5 md:p-8 md:px-12 rounded-3xl"
        >
          <div className="absolute left-0 md:left-4 top-0 ml-[3px] h-full w-[2px] bg-gray-500" />
          <div className="absolute left-0 md:left-4 top-10 w-2 h-2 rounded-full bg-purple-400" />
          <div className="flex justify-between items-start mb-1 gap-4">
            <h3 className="text-2xl font-semibold text-[#1f1f1f] dark:text-[#cccccc]">{prettyTitle(exp.title)}</h3>
            <div className="flex space-x-3 pt-1 text-[#1f1f1f] dark:text-[#cccccc]">
              {exp.github && (
                <a href={exp.github} target="_blank" rel="noopener noreferrer" aria-label={`${exp.company} on GitHub`}>
                  <GithubIcon className="h-5 w-5" />
                </a>
              )}
              {exp.link && (
                <a href={exp.link} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${exp.company}`}>
                  <ExternalLinkIcon className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
          <div className="mb-2 text-lg text-[#1f1f1f] dark:text-[#cccccc]">
            {exp.company} | {exp.period}
          </div>
          <ul className="space-y-3 mb-6">
            {exp.responsibilities.map((desc) => (
              <li key={desc} className="flex items-start space-x-2 text-zinc-500 dark:text-zinc-400">
                <span className="text-md font-semibold text-[#1f1f1f] dark:text-[#cccccc]"> - </span>
                <span className="text-base sm:text-lg leading-tight">{desc}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-2">
            {exp.skills?.map((skill) => (
              <Badge key={skill} variant="secondary" className="bg-zinc-200 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400">
                {skill}
              </Badge>
            ))}
            {exp.project && (
              <Link
                href={`/projects/${exp.project}`}
                className="ml-auto inline-flex items-center gap-1 text-sm text-stone-500 hover:text-[#1f1f1f] dark:hover:text-[#cccccc]"
              >
                Case study <ArrowUpRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export function Badge({
  children,
  variant = "primary",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}) {
  const badgeVariants = {
    primary: "bg-gray-800 text-gray-700 dark:text-gray-300",
    secondary: "bg-gray-300 text-gray-800",
  };
  return <span className={`px-3 py-1.5 rounded-full text-sm ${badgeVariants[variant]} ${className}`}>{children}</span>;
}
