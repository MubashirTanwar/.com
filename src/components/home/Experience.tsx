import { DashboardIcon, DashIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import {
  BriefcaseIcon,
  GithubIcon,
  ExternalLinkIcon,
  CheckCircle,
  Circle,
  ArrowBigRight,
} from "lucide-react";

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string[];
  skills: string[];
  githubLink?: string;
  liveLink?: string;
}
// •	Developed a cloud provider interface using React, TypeScript, Tailwind, TanStack, Zustand for state management.
// •	Led the creation of an in-house, accessible component library adopted across multiple services, reducing 2 dev days per week.
// •	Contributed to the system design of core cloud infrastructure modelled after services like S3, EC2, and RDS.
// •	Independently developed scraping pipelines, internal utility APIs, and custom UIs for trading data, used by company personnel and integrated into internal systems. 


const experiences: Experience[] = [
  {
    title: "Software Developer Intern",
    company: "ORIM Advisors",
    period: "Jan 2025 - May 2025",
    description: [
      "Developed a cloud provider interface using React, TypeScript, Tailwind, TanStack, Zustand for state management.",
      "Led the creation of an in-house, accessible component library adopted across multiple services, reducing 2 dev days per week.",
      "Contributed to the system design of core cloud infrastructure modelled after services like S3, EC2, and RDS.",
      "Independently developed scraping pipelines, internal utility APIs, and custom UIs for trading data, used by company personnel and integrated into internal systems.",
    ],
    skills: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "TanStack",
      "Zustand",
      "Node.js",
      "FastAPI",
      "Postgres",
      "Docker",
      "Python",
    ],
  },
  {
    title: "Deep Learning Intern",
    company: "National Informatics Centre",
    period: "Jan 2024 - Oct 2024",
    description: [
      "Developed a multimodal Vision Encoder-Decoder model for Marathi OCR, achieving 83% accuracy on handwritten and printed text recognition.",
      "Created a semi-supervised data labeling pipeline for dataset generation, producing over 135,000 labeled entries, automating 95% of the labeling process.",
      "Built and deployed a Django and FastAPI API integrated with Elasticsearch",
      "Managed full-stack production challenges, including GPU constraints, model optimization, and creating a custom Marathi dataset",
      "Delivered a groundbreaking document management system, solving a significant problem in goverment agencies.",
    ],
    skills: [
      "Python",
      "Django",
      "Postgres",
      "Elasticsearch",
      "TrOCR",
      "Transformers",
    ],
    githubLink: "https://github.com/MubashirTanwar/TrOCR", // Add link if available
    liveLink: "", // Add link if available
  },
  {
    title: "Full Stack Engineer",
    company: "Fuzzy Nodes",
    period: "Feb 2024 - Sept 2024",
    description: [
      "Led development of a CRM and ticket booking system for bestfares365.com.au, focusing on business-critical requirements for B2B transactions and hierarchical access control.",
      "Engineered a comprehensive wallet feature for agent bookings, enabling flows for transaction logs, top-ups, and refunds.",
      "Designed and implemented a dynamic price control module based on their business requirments, enabling itinerary-based discounts, markups, and add-ons for agents and airlines.",
    ],

    skills: ["NextJS", "Node.js", "Express", "MongoDB", "CRM"],
    githubLink: "", // Add link if available
    liveLink: "https://bestfares365.com.au/", // Add link if available
  },
  {
    title: "Project Intern",
    company: "National Informatics Centre",
    period: "Jun 2023 - Aug 2023",
    description: [
      "Led website development and CMS management for government agencies using the S3waaS platform.",
      "Designed and Developed 3 websites for the Ministry of Food, Home Ministry and Mumbai Police Department.",
      "Learned and implemented various web standards and best practices for accessibility, SEO, and performance.",
    ],
    skills: ["HTML", "Bootstrap", "CMS", "S3waaS"],
    githubLink: "", // Add link if available
    liveLink: "", // Add link if available
  },
];

export default function ExperienceTimeline() {
  return (
    <div className="">
      {experiences.map((exp, index) => (
        <div
          key={index}
          className="relative hover:bg-[#121212] p-5 md:p-8 md:px-12 rounded-3xl"
        >
          <div className="absolute left-0 md:left-4 top-0 ml-[3px] h-full   w-[2px] bg-gray-500" />
          <div className="absolute left-0 md:left-4 top-10 w-2 h-2 rounded-full bg-purple-400" />
          <div className="flex justify-between items-start mb-1">
            <div className="text-2xl font-semibold text-white">{exp.title}</div>
            <div className="flex space-x-2">
              {exp.githubLink && (
                <a
                  href={exp.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400"
                >
                  <GithubIcon className="h-5 w-5" />
                </a>
              )}
              {exp.liveLink && (
                <a
                  href={exp.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400"
                >
                  <ExternalLinkIcon className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
          <div className="mb-2 text-lg text-zinc-400">
            {exp.company} | {exp.period}
          </div>
          <ul className="space-y-3 mb-6">
            {exp.description.map((desc, descIndex) => (
              <li
                key={descIndex}
                className="flex items-start space-x-2 text-zinc-200"
              >
                <span className="text-md font-semibold text-zinc-400"> - </span>
                <span className="text-base sm:text-lg leading-tight">
                  {desc}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2">
            {exp.skills.map((skill, skillIndex) => (
              <Badge
                key={skillIndex}
                variant="secondary"
                className="bg-zinc-800 text-zinc-300"
              >
                {skill}
              </Badge>
            ))}
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
    primary: "bg-gray-800 text-gray-300",
    secondary: "bg-gray-300 text-gray-800",
  };

  return (
    <span
      className={`px-3 py-1.5 rounded-full text-sm ${
        badgeVariants[variant] + " " + className
      }`}
    >
      {children}
    </span>
  );
}
