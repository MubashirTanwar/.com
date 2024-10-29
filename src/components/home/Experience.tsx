import classNames from 'classnames'
import { BriefcaseIcon, GithubIcon, ExternalLinkIcon } from 'lucide-react'

interface Experience {
  title: string
  company: string
  period: string
  description: string
  skills: string[]
  githubLink?: string
  liveLink?: string
}

const experiences: Experience[] = [
{
  title: "Deep Learning Intern",
  company: "National Informatics Centre",
  period: "Jan 2024 - Oct 2024",
  description: "Achieved 83% accuracy with a multimodal Vision Encoder-Decoder model for Marathi text recognition. Automated 90% of dataset labelling, generating more than 135,000 labelled entries. Developed a production Django API for efficient PDF OCR and duplicate detection using Elasticsearch.",
  skills: ["Python", "Django", "Postgres", "Elasticsearch", "TrOCR", "Transformers"],
  githubLink: "https://github.com/MubashirTanwar/TrOCR", // Add link if available
  liveLink: "" // Add link if available
},
{
  title: "Full Stack Engineer",
  company: "Fuzzy Nodes",
  period: "Feb 2024 - Sept 2024",
  description: "Engineered a complex CRM and booking website, integrated an agent wallet system, transaction logs, booking management, and dynamic pricing controls. Implemented an algorithm to offer cheapest flight options, enhancing user satisfaction.",
  skills: ["NextJS", "Node.js", "Express",  "MongoDB","CRM"],
  githubLink: "", // Add link if available
  liveLink: "https://bestfares365.com.au/" // Add link if available
},
{
  title: "Project Intern",
  company: "National Informatics Centre",
  period: "Jun 2023 - Aug 2023",
  description: "Utilized the S3waaS platform to design and launch websites for Government departments. Built and managed CMS, implemented solutions for functionality and robust data protection.",
  skills: ["HTML","Bootstrap", "CMS", "S3waaS"],
  githubLink: "", // Add link if available
  liveLink: "" // Add link if available
},
]

export default function ExperienceTimeline() {
  return (

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div 
              key={index} 
              className="relative pl-8 pb-8"
            >
              <div className="absolute left-0 top-0 ml-[3px] h-full w-[2px] bg-gray-500" />
              <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-purple-400" />
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
              <div className="mb-2 text-lg text-zinc-400">{exp.company} | {exp.period}</div>
              <p className="mb-4 text-lg text-zinc-200">{exp.description}</p>
              <div className="flex flex-wrap gap-2">
                {exp.skills.map((skill, skillIndex) => (
                  <Badge key={skillIndex} variant="secondary" className="bg-zinc-800 text-zinc-300">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>

  )
}


export function Badge({
    children,
    variant = "primary",
    className = ""
    }: {
    children: React.ReactNode
    variant?: "primary" | "secondary"
    className?: string
    }) {
    const badgeVariants = {
        primary: "bg-gray-800 text-gray-300",
        secondary: "bg-gray-300 text-gray-800"
    }
    
    return (
        <span className={`px-3 py-1.5 rounded-full text-sm ${badgeVariants[variant] + " " + className}`}>
        {children}
        </span>
    )
    }

