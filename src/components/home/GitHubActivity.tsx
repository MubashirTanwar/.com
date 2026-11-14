import { Github, GitCommitHorizontal } from "lucide-react";

const USER = "MubashirTanwar";

type PushEvent = {
  id: string;
  type: string;
  created_at: string;
  repo: { name: string };
  payload: { commits?: { sha: string; message: string }[]; size?: number };
};

async function getPushes() {
  try {
    const res = await fetch(`https://api.github.com/users/${USER}/events/public?per_page=60`, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const events = (await res.json()) as PushEvent[];
    return events.filter((e) => e.type === "PushEvent" && e.payload.commits?.length).slice(0, 5);
  } catch {
    return [];
  }
}

const ago = (iso: string) => {
  const s = (Date.now() - new Date(iso).getTime()) / 1000;
  const units: [number, string][] = [
    [60 * 60 * 24 * 30, "mo"],
    [60 * 60 * 24 * 7, "w"],
    [60 * 60 * 24, "d"],
    [60 * 60, "h"],
    [60, "m"],
  ];
  for (const [secs, label] of units) if (s >= secs) return `${Math.floor(s / secs)}${label} ago`;
  return "just now";
};

/** Latest public commits, refreshed hourly. Renders nothing if GitHub can't be reached. */
export async function GitHubActivity() {
  const pushes = await getPushes();
  if (!pushes.length) return null;

  return (
    <section className="rounded-3xl border border-[#d9dbde] dark:border-[#242424] bg-white dark:bg-[#141414] p-6 md:p-8">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-3xl text-[#1f1f1f] dark:text-[#cccccc]">Lately on GitHub</h2>
        <a
          href={`https://github.com/${USER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-[#d9dbde] dark:border-[#2a2a2a] px-4 py-2 text-sm text-[#1f1f1f] dark:text-[#cccccc] hover:bg-[#f4f5f6] dark:hover:bg-[#1c1c1c]"
        >
          <Github className="h-4 w-4" /> @{USER}
        </a>
      </div>
      <ul className="mt-6 divide-y divide-[#eceef0] dark:divide-[#1f1f1f]">
        {pushes.map((e) => {
          const commit = e.payload.commits![e.payload.commits!.length - 1];
          const repo = e.repo.name.split("/")[1];
          return (
            <li key={e.id}>
              <a
                href={`https://github.com/${e.repo.name}/commit/${commit.sha}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 py-3 group"
              >
                <GitCommitHorizontal className="h-4 w-4 shrink-0 text-stone-400" />
                <span className="shrink-0 rounded-full bg-[#f4f5f6] dark:bg-[#1f1f1f] px-2.5 py-0.5 text-sm text-stone-600 dark:text-stone-400">{repo}</span>
                <span className="min-w-0 truncate text-[#1f1f1f] dark:text-[#cccccc] group-hover:underline underline-offset-4">
                  {commit.message.split("\n")[0]}
                </span>
                <span className="ml-auto shrink-0 text-sm text-stone-500 tabular-nums">{ago(e.created_at)}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
