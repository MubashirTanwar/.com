import Link from "next/link";
import { activeSocials } from "@/data/site";
import { SocialIcon } from "@/components/shell/SocialIcon";
import { cn } from "@/lib/utils";

/** Icon tiles beside the stack card. Goodreads/Letterboxd appear once their URLs are set in src/data/site.ts. */
export default function Links() {
  const wide = activeSocials.length > 4;
  return (
    <nav aria-label="Profiles" className={cn("grid gap-4 lg:col-span-1", wide ? "grid-cols-3" : "grid-cols-4 lg:grid-cols-2")}>
      {activeSocials.map((s) => (
        <Link
          key={s.name}
          href={s.url}
          aria-label={s.name}
          title={s.name}
          {...(s.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="group min-h-20 rounded-3xl bg-white dark:bg-[#141414] border border-[#d9dbde] dark:border-[#242424] flex items-center justify-center text-[#1f1f1f] dark:text-[#cccccc] transition-colors hover:bg-[#fafafa] dark:hover:bg-[#1a1a1a]"
        >
          <span className="transition-transform duration-300 group-hover:scale-110">
            <SocialIcon icon={s.icon} />
          </span>
        </Link>
      ))}
    </nav>
  );
}
