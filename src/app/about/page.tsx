import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import resumeData from "@/data/resume-data.json";
import { lifeLabel, lifeSocials, site, workSocials } from "@/data/site";
import { CloseButton } from "@/components/shell/CloseButton";
import { SocialIcon } from "@/components/shell/SocialIcon";
import { card, eyebrow, heading } from "@/components/shell/styles";
import { Rotator } from "@/components/about/Rotator";
import { CopyMailButton } from "@/components/home/MailCopy";
import StackHome from "@/components/home/Carousel";
import { jobs, prettyTitle } from "@/components/home/Experience";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description: "Who I am, what I do best, and where I've worked.",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about", title: "About · Mubashir Tanwar" },
};

const strengths = [
  {
    title: "Real-time systems",
    body: "Chat, voice and multiplayer that stay fast under load: WebSockets and Socket.IO, Redis buffering, batched writes to Postgres, encrypted messages.",
  },
  {
    title: "AI that can't make things up",
    body: "LangGraph agents where the engine and the database supply every fact and the model only writes the words.",
  },
  {
    title: "Product frontends",
    body: "Next.js and TypeScript, accessible component libraries, and A/B tests that actually move conversion.",
  },
  {
    title: "Replacing paid vendors",
    body: "At Prana I've replaced two paid services with in-house systems: the chat and voice APIs, and an astrology engine that now matches the vendor 100% at no running cost.",
  },
  {
    title: "Payments and permissions",
    body: "Wallets, credit ledgers, Razorpay and Stripe subscriptions, and strict multi-role access control, like the 9-role CRM I built to replace Salesforce.",
  },
];

const shortCompany = (c: string) => c.split(",")[0].replace(/\s*\(.*\)/, "");
const years = (p: string) => {
  const [from, to] = p.replace(/[A-Za-z]+'(\d\d)/g, "20$1").split(/\s*-\s*/);
  return !to || from === to ? from : `${from} – ${to}`;
};

export default function AboutPage() {
  const edu = resumeData.education[0];

  return (
    <div className="pb-6">
      <CloseButton />
      <div className="mx-auto grid max-w-5xl gap-4 lg:grid-cols-2">
        <section className={cn(card, "p-6 md:p-8 lg:row-span-2")}>
          <h1 className={cn("text-3xl pb-6 border-b border-[#d9dbde] dark:border-[#242424]", heading)}>What I&apos;m about</h1>
          <h2 className={cn(eyebrow, "mt-6")}>My story</h2>
          <p className={cn("mt-3 text-lg leading-relaxed", heading)}>
            I studied Computer Engineering (AI &amp; ML) at M.H. Saboo Siddik College of Engineering in Mumbai, and started shipping real
            products before I graduated: a rebuilt flight-booking platform for an Australian travel company, an OCR model at the National
            Informatics Centre that reads handwritten Marathi letters, and production apps for freelance clients, from a headless Shopify
            store to a CRM that replaced Salesforce for an export-trading company.
          </p>
          <h2 className={cn(eyebrow, "mt-8")}>What I do now</h2>
          <p className={cn("mt-3 text-lg leading-relaxed", heading)}>
            Today I&apos;m an SDE-1 at{" "}
            <Link href="/projects/prana" className="underline underline-offset-4 decoration-stone-400 hover:decoration-current">
              Prana
            </Link>
            {" "}in Bengaluru, where I built pranaindia.com, the real-time chat and voice consultations behind it, and an in-house astrology
            engine that replaced a paid vendor. I also manage our interns. Outside work I build things like{" "}
            <Link href="/projects/outpost" className="underline underline-offset-4 decoration-stone-400 hover:decoration-current">
              Outpost
            </Link>
            , a chess coach that happens to be a cat.
          </p>
        </section>

        <section className={cn(card, "p-6 md:p-8")}>
          <h2 className={eyebrow}>What I do best</h2>
          <div className="mt-4 h-[calc(100%-2rem)]">
            <Rotator slides={strengths} />
          </div>
        </section>

        <section className={cn(card, "p-6 md:p-8 overflow-hidden")}>
          <h2 className={cn("text-2xl", heading)}>Stack I use</h2>
          <div className="mt-6">
            <StackHome fluid />
          </div>
        </section>

        <section className={cn(card, "p-6 md:p-8")}>
          <h2 className={eyebrow}>Experience</h2>
          <ul className="mt-5 space-y-4">
            {jobs.map((j) => (
              <li key={j.title + j.period} className="flex items-baseline gap-3">
                <span className={cn("min-w-0", heading)}>
                  {prettyTitle(j.title)} <span className="text-stone-500">at {shortCompany(j.company)}</span>
                </span>
                <span aria-hidden className="hidden sm:block flex-1 min-w-6 border-b border-[#d9dbde] dark:border-[#2a2a2a] translate-y-[-4px]" />
                <span className="ml-auto shrink-0 text-sm text-stone-500 tabular-nums">{years(j.period)}</span>
              </li>
            ))}
          </ul>
          <h2 className={cn(eyebrow, "mt-8")}>Education</h2>
          <p className={cn("mt-3", heading)}>{edu.degree}</p>
          <p className="text-sm text-stone-500">
            {edu.institution.split(",")[0]} · {edu.period}
          </p>
          <Link href="/resume" className="mt-6 inline-flex items-center gap-1 text-sm text-stone-500 hover:text-[#1f1f1f] dark:hover:text-[#cccccc]">
            Full resume <ArrowUpRight className="h-4 w-4" />
          </Link>
        </section>

        <div className="grid gap-4">
          {/* TODO: a photo of Kittu goes here (PhotoRotator in components/about/Rotator.tsx). */}
          <div className="grid gap-4 sm:grid-cols-2">
            <section className={cn(card, "p-6 flex flex-col")}>
              <h2 className={cn("text-xl", heading)}>Have a project in mind?</h2>
              <div className="mt-auto pt-4">
                <CopyMailButton />
              </div>
            </section>
            <section className={cn(card, "p-6")}>
              <h2 className={eyebrow}>Off the clock</h2>
              {lifeSocials.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {lifeSocials.map((s) => (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-[#d9dbde] dark:border-[#2a2a2a] px-3 py-1.5 text-sm text-[#1f1f1f] dark:text-[#cccccc] hover:bg-[#f4f5f6] dark:hover:bg-[#1c1c1c]"
                    >
                      <SocialIcon icon={s.icon} className="h-4 w-4" />
                      {lifeLabel(s)}
                    </a>
                  ))}
                </div>
              ) : (
                <p className={cn("mt-3", heading)}>Chess, books and films.</p>
              )}
              <div className="mt-4 flex gap-3 text-stone-500">
                {workSocials
                  .filter((s) => s.external)
                  .map((s) => (
                    <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.name} className="hover:text-[#1f1f1f] dark:hover:text-[#cccccc]">
                      <SocialIcon icon={s.icon} className="h-5 w-5" />
                    </a>
                  ))}
              </div>
            </section>
          </div>
        </div>
      </div>
      <p className="sr-only">{site.intro}</p>
    </div>
  );
}
