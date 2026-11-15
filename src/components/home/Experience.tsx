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
  /** One number that sums the role up, shown big on its card. */
  highlight?: { value: string; label: string };
};

export const jobs = resumeData.experience as Job[];

/** "SOFTWARE DEVELOPER INTERN" -> "Software Developer Intern"; keeps tokens like "SDE-1". */
export const prettyTitle = (t: string) =>
  t
    .split(" ")
    .map((w) => (/\d/.test(w) ? w : w.charAt(0) + w.slice(1).toLowerCase()))
    .join(" ");

const card = "flex flex-col rounded-3xl border border-[#d9dbde] dark:border-[#242424] bg-white dark:bg-[#141414] p-6";
const heading = "text-[#1f1f1f] dark:text-[#cccccc]";

function Tags({ skills }: { skills?: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {skills?.map((s) => (
        <span key={s} className="rounded-full bg-[#f4f5f6] dark:bg-[#1f1f1f] px-2.5 py-1 text-xs text-stone-600 dark:text-stone-400">
          {s}
        </span>
      ))}
    </div>
  );
}

function Links({ job }: { job: Job }) {
  if (!job.project && !job.link && !job.github) return null;
  return (
    <div className="flex flex-wrap items-center gap-4 text-sm text-stone-500">
      {job.project && (
        <Link href={`/projects/${job.project}`} className="inline-flex items-center gap-1 hover:text-[#1f1f1f] dark:hover:text-[#cccccc]">
          Case study <ArrowUpRight className="h-4 w-4" />
        </Link>
      )}
      {job.link && (
        <a href={job.link} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${job.company}`} className="hover:text-[#1f1f1f] dark:hover:text-[#cccccc]">
          <ExternalLinkIcon className="h-4 w-4" />
        </a>
      )}
      {job.github && (
        <a href={job.github} target="_blank" rel="noopener noreferrer" aria-label={`${job.company} on GitHub`} className="hover:text-[#1f1f1f] dark:hover:text-[#cccccc]">
          <GithubIcon className="h-4 w-4" />
        </a>
      )}
    </div>
  );
}

function JobCard({ job, featured }: { job: Job; featured?: boolean }) {
  const company = job.company.split(",")[0];
  return (
    <article className={`${card} ${featured ? "md:col-span-3 lg:flex-row lg:gap-10" : ""}`}>
      <div className={featured ? "lg:w-72 lg:shrink-0" : ""}>
        <p className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-stone-500">
          {featured && <span className="h-2 w-2 rounded-full bg-emerald-500" aria-label="Current role" />}
          {job.period}
        </p>
        <h3 className={`mt-2 ${featured ? "text-3xl" : "text-xl"} ${heading}`}>{prettyTitle(job.title)}</h3>
        <p className="text-stone-500">{company}</p>
        {job.highlight && (
          <>
            <p className={`mt-5 font-light ${featured ? "text-6xl" : "text-4xl"} ${heading}`}>{job.highlight.value}</p>
            <p className="mt-1 text-sm text-stone-500">{job.highlight.label}</p>
          </>
        )}
      </div>
      <div className={`mt-5 flex flex-1 flex-col ${featured ? "lg:mt-0" : ""}`}>
        <ul className="space-y-2 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
          {(featured ? job.responsibilities : job.responsibilities.slice(0, 2)).map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
        <div className="mt-auto space-y-4 pt-5">
          <Tags skills={featured ? job.skills : job.skills?.slice(0, 5)} />
          <Links job={job} />
        </div>
      </div>
    </article>
  );
}

/** Current role as a wide card, earlier roles beneath, each led by one number. */
export default function ExperienceGrid() {
  const [current, ...earlier] = jobs;
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <JobCard job={current} featured />
      {earlier.map((j) => (
        <JobCard key={j.title + j.period} job={j} />
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
