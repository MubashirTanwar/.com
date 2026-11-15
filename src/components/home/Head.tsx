import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";

/** Two arrows that swap on hover, used on every card that opens a page. */
export function ArrowBadge() {
  return (
    <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-[#d9dbde] dark:border-[#242424] transition-transform duration-300 ease-in-out group-hover:rotate-45">
      <div className="absolute transition-transform duration-300 ease-in-out group-hover:translate-x-12 group-hover:-translate-y-12">
        <ArrowUpRight className="h-6 w-6 text-[#1f1f1f] dark:text-[#cccccc]" />
      </div>
      <div className="absolute -translate-x-12 translate-y-12 transition-transform duration-300 ease-in-out group-hover:translate-x-0 group-hover:translate-y-0">
        <ArrowUpRight className="h-6 w-6 text-[#1f1f1f] dark:text-[#cccccc]" />
      </div>
    </div>
  );
}

function Head() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div className="col-span-1 rounded-3xl border border-[#d9dbde] dark:border-[#242424] bg-white dark:bg-[#141414] md:col-span-2 lg:col-span-1">
        <div className="p-6">
          <h1 className="mt-3 text-3xl text-[#1f1f1f] dark:text-[#cccccc]">Hi, I&apos;m Mubashir –</h1>
          <p className="mt-6 text-xl leading-relaxed text-stone-500">
            Software engineer, currently an SDE-1 at{" "}
            <Link href="/projects/prana" className="underline underline-offset-4 decoration-stone-400 hover:text-[#1f1f1f] dark:hover:text-[#cccccc]">
              Prana
            </Link>{" "}
            based in {site.location}.
          </p>
        </div>
      </div>

      <Link
        href="/about"
        aria-label="About me"
        className="group col-span-1 flex min-h-60 sm:min-h-48 flex-col rounded-3xl border border-[#d9dbde] dark:border-[#242424] bg-white dark:bg-[#141414]"
      >
        {/* Not position:relative, so the page's paper texture sits over it like the other cards. */}
        <div className="p-6">
          <h2 className="text-xs uppercase tracking-[0.2em] text-stone-500">About</h2>
          <p className="mt-4 text-3xl font-light text-[#1f1f1f] dark:text-[#cccccc]">I make stuff happen with code</p>
        </div>
        <div className="mt-auto self-end p-4">
          <ArrowBadge />
        </div>
      </Link>

      <div className="col-span-1 hidden overflow-hidden rounded-3xl border border-[#d9dbde] dark:border-[#242424] bg-white dark:bg-[#141414] md:block">
        <Image src="/pfp.jpg" alt="Mubashir Tanwar" width={800} height={800} priority className="aspect-square h-64 w-full object-cover" sizes="(min-width: 1024px) 33vw, 50vw" />
      </div>
    </div>
  );
}

export default Head;
