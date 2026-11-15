import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { moreProjects } from "@/data/more-projects";

/** A slim bento row linking to /projects/more. */
export function MoreProjects() {
  return (
    <Link
      href="/projects/more"
      className="group flex w-full flex-wrap items-center gap-x-6 gap-y-3 rounded-3xl border border-[#d9dbde] dark:border-[#242424] bg-white dark:bg-[#141414] px-6 py-5"
    >
      <span className="text-2xl text-[#1f1f1f] dark:text-[#cccccc]">More projects</span>
      <span className="hidden md:flex flex-1 flex-wrap gap-2">
        {moreProjects.map((p) => (
          <span key={p.slug} className="rounded-full bg-[#f4f5f6] dark:bg-[#1f1f1f] px-3 py-1 text-sm text-stone-600 dark:text-stone-400">
            {p.title}
          </span>
        ))}
      </span>
      <span className="ml-auto flex items-center gap-2 text-sm text-stone-500">
        View all {moreProjects.length}
        <ArrowUpRight className="h-5 w-5 text-[#1f1f1f] dark:text-[#cccccc] transition-transform duration-300 group-hover:rotate-45" />
      </span>
    </Link>
  );
}
