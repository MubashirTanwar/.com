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
    title: "SDE-1",
    company: "Prana (PranaIndia)",
    period: "July 2025 - Present",
    description: [
      "Built the customer-facing pranaindia.com (Next.js/TypeScript) and implemented real-time chat and voice-call consultations end-to-end in-house over WebSockets, replacing paid third-party APIs and sustaining 150+ concurrent chats at sub-200ms latency with AES-GCM encrypted messaging.",
      "Built a TypeScript/Express microservices backend, deployed on AWS EC2 with auto-scaling, ECR, and Amplify using blue-green deployments.",
      "Built an in-house A/B testing and user-behaviour tracking library, running 10+ experiments across 150,000+ weekly users to drive changes that lifted landing-to-consultation conversion 3x (2% to 6%).",
      "Shipped office.pranaindia.com, a dedicated portal for high-ticket clients, and streamlined existing consultation workflows.",
    ],
    skills: [
      "Next.js",
      "TypeScript",
      "Express",
      "WebSockets",
      "AWS",
      "Docker",
      "MongoDB",
    ],
    liveLink: "https://pranaindia.com",
  },
  {
    title: "Software Developer Intern",
    company: "ORIM Advisors",
    period: "Jan 2025 - Apr 2025",
    description: [
      "Built the front-end console for an internal cloud platform in React/TypeScript, using TanStack Query and Zustand for server- and client-state management.",
      "Led an in-house, accessible component library adopted across multiple internal services, cutting ~2 dev-days/week of duplicated UI work.",
      "Contributed to the system design of core cloud infrastructure modelled on S3, EC2, and RDS.",
      "Built scraping pipelines, internal utility APIs, and custom trading-data UIs used across company systems.",
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
      "Fine-tuned a TrOCR Vision Encoder-Decoder (Google ViT encoder + Marathi-BERT-v2 decoder) in PyTorch/Hugging Face to 83% accuracy, used to digitize handwritten Marathi government letters received by the office.",
      "Automated 90% of dataset labelling to build a self-curated corpus of 135,000+ line- and word-level image-text pairs.",
      "Built a production Django API for PDF OCR with Elasticsearch-backed document deduplication, which passed a successful alpha test in the NIC Mumbai office.",
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
      "Rebuilt the bestfares365 CRM and airline-booking platform on the MERN stack, integrating the Amadeus API for flight search, fares, and ticketing.",
      "Implemented a fare-search algorithm layered on Amadeus that widened the search space across route and connection combinations and sorted candidates to surface cheaper itineraries than direct queries.",
      "Built an agent wallet with transaction logs and a dynamic-pricing engine applying configurable markups per route, airline, and agent.",
      "Replaced the company's legacy booking system with the new platform, adopted across both customer and travel-agent channels.",
    ],

    skills: ["React", "Node.js", "Express", "MongoDB", "Amadeus API"],
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
          className="relative hover:bg-[#f7f6f6] hover:dark:bg-[#121212]/70 p-5 md:p-8 md:px-12 rounded-3xl"
        >
          <div className="absolute left-0 md:left-4 top-0 ml-[3px] h-full   w-[2px] bg-gray-500" />
          <div className="absolute left-0 md:left-4 top-10 w-2 h-2 rounded-full bg-purple-400" />
          <div className="flex justify-between items-start mb-1">
            <div className="text-2xl font-semibold text-[#1f1f1f] dark:text-[#cccccc]">{exp.title}</div>
            <div className="flex space-x-2">
              {exp.githubLink && (
                <a
                  href={exp.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1f1f1f] dark:text-[#cccccc]"
                >
                  <GithubIcon className="h-5 w-5" />
                </a>
              )}
              {exp.liveLink && (
                <a
                  href={exp.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1f1f1f] dark:text-[#cccccc]"
                >
                  <ExternalLinkIcon className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
          <div className="mb-2 text-lg text-[#1f1f1f] dark:text-[#cccccc]">
            {exp.company} | {exp.period}
          </div>
          <ul className="space-y-3 mb-6">
            {exp.description.map((desc, descIndex) => (
              <li
                key={descIndex}
                className="flex items-start space-x-2 text-zinc-500 dark:text-zinc-400 200"
              >
                <span className="text-md font-semibold text-[#1f1f1f] dark:text-[#cccccc]"> - </span>
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
                className="bg-zinc-200 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400 300"
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
    primary: "bg-gray-800 text-gray-700 dark:text-gray-300",
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
