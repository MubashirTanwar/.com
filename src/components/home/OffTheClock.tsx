import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getLetterboxd } from "@/lib/feeds/letterboxd";
import { getCurrentlyReading, GOODREADS_PROFILE } from "@/lib/feeds/goodreads";
import { getListening } from "@/lib/feeds/spotify";
import { stars } from "@/lib/feeds/text";
import { SocialIcon } from "@/components/shell/SocialIcon";
import { cn } from "@/lib/utils";

const card = "group relative flex flex-col rounded-3xl border border-[#d9dbde] dark:border-[#242424] bg-white dark:bg-[#141414] p-6 transition-colors hover:bg-[#fafafa] dark:hover:bg-[#171717]";
const eyebrow = "flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-stone-500";
const title = "text-[#1f1f1f] dark:text-[#cccccc]";

const fmtDate = (iso?: string) =>
  iso ? new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }) : "";

function Corner() {
  return <ArrowUpRight className="absolute top-5 right-5 h-5 w-5 text-stone-400 transition-transform duration-300 group-hover:rotate-45" />;
}

/** Live "off the clock" row: Goodreads, Letterboxd and Spotify. Each card hides if its source is unavailable. */
export async function OffTheClock() {
  const [books, { lastWatched, lastReview }, track] = await Promise.all([getCurrentlyReading(), getLetterboxd(), getListening()]);
  const cards = [books.length > 0, !!lastWatched, !!lastReview, !!track].filter(Boolean).length;
  if (!cards) return null;

  return (
    <section aria-label="Off the clock" className={cn("grid gap-4 grid-cols-1 sm:grid-cols-2", cards >= 3 && "lg:grid-cols-4", cards === 3 && "lg:grid-cols-3")}>
      {books.length > 0 && (
        <a href={books.length === 1 ? books[0].url : `${GOODREADS_PROFILE}`} target="_blank" rel="noopener noreferrer" className={card}>
          <Corner />
          <p className={eyebrow}>
            <SocialIcon icon="goodreads" className="h-3.5 w-3.5" /> Currently reading
          </p>
          <ul className="mt-5 space-y-4">
            {books.slice(0, 2).map((b) => (
              <li key={b.url} className="flex gap-4">
                {b.cover && <Image src={b.cover} alt="" width={64} height={96} className="h-24 w-16 shrink-0 rounded-md object-cover shadow-sm" />}
                <div className="min-w-0">
                  <p className={cn("leading-snug line-clamp-3", title)}>{b.title}</p>
                  {b.author && <p className="mt-1 text-sm text-stone-500">{b.author}</p>}
                </div>
              </li>
            ))}
          </ul>
        </a>
      )}

      {lastWatched && (
        <a href={lastWatched.url} target="_blank" rel="noopener noreferrer" className={card}>
          <Corner />
          <p className={eyebrow}>
            <SocialIcon icon="letterboxd" className="h-3.5 w-3.5" /> Last watched
          </p>
          <div className="mt-5 flex gap-4">
            {lastWatched.poster && (
              <Image src={lastWatched.poster} alt="" width={80} height={120} className="h-[120px] w-20 shrink-0 rounded-md object-cover shadow-sm" />
            )}
            <div className="min-w-0">
              <p className={cn("text-lg leading-snug", title)}>
                {lastWatched.title} {lastWatched.year && <span className="text-stone-500">{lastWatched.year}</span>}
              </p>
              {lastWatched.rating && (
                <p className="mt-1 text-emerald-600 dark:text-emerald-400 tracking-wider" aria-label={`Rated ${lastWatched.rating} out of 5`}>
                  {stars(lastWatched.rating)}
                  {lastWatched.liked && <span className="ml-1.5 text-orange-500" aria-label="liked">♥</span>}
                </p>
              )}
              <p className="mt-2 text-sm text-stone-500">
                {lastWatched.rewatch ? "Rewatched" : "Watched"} {fmtDate(lastWatched.watchedOn)}
              </p>
            </div>
          </div>
        </a>
      )}

      {lastReview && (
        <a href={lastReview.url} target="_blank" rel="noopener noreferrer" className={card}>
          <Corner />
          <p className={eyebrow}>
            <SocialIcon icon="letterboxd" className="h-3.5 w-3.5" /> Last reviewed
          </p>
          <blockquote className={cn("mt-5 text-xl font-light leading-snug line-clamp-5", title)}>“{lastReview.review}”</blockquote>
          <p className="mt-auto pt-4 text-sm text-stone-500">
            on <span className={title}>{lastReview.title}</span>
            {lastReview.rating && <span className="ml-2 text-emerald-600 dark:text-emerald-400">{stars(lastReview.rating)}</span>}
          </p>
        </a>
      )}

      {track && (
        <a href={track.url} target="_blank" rel="noopener noreferrer" className={card}>
          <Corner />
          <p className={eyebrow}>
            {track.playing ? (
              <span className="flex h-3.5 items-end gap-[2px]" aria-hidden>
                {[0, 1, 2].map((i) => (
                  <span key={i} className="w-[3px] origin-bottom rounded-sm bg-[#1ED760] animate-[eq_1s_ease-in-out_infinite] motion-reduce:animate-none" style={{ height: "100%", animationDelay: `${i * 0.2}s` }} />
                ))}
              </span>
            ) : (
              <SocialIcon icon="spotify" className="h-3.5 w-3.5" />
            )}
            {track.playing ? "Listening now" : "Last played"}
          </p>
          <div className="mt-5 flex gap-4">
            {track.art && <Image src={track.art} alt="" width={96} height={96} className="h-24 w-24 shrink-0 rounded-md object-cover shadow-sm" />}
            <div className="min-w-0">
              <p className={cn("text-lg leading-snug line-clamp-2", title)}>{track.title}</p>
              <p className="mt-1 text-sm text-stone-500 line-clamp-2">{track.artist}</p>
            </div>
          </div>
        </a>
      )}
    </section>
  );
}
