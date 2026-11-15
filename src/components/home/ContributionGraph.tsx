import type { Day } from "@/lib/feeds/github";

const LEVELS = [
  "bg-[#ebedf0] dark:bg-[#1f1f1f]",
  "bg-[#9be9a8] dark:bg-[#0e4429]",
  "bg-[#40c463] dark:bg-[#006d32]",
  "bg-[#30a14e] dark:bg-[#26a641]",
  "bg-[#216e39] dark:bg-[#39d353]",
];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const label = (d: Day) => {
  const when = new Date(`${d.date}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
  if (!Number.isFinite(d.count)) return when;
  return `${d.count === 0 ? "No" : d.count} contribution${d.count === 1 ? "" : "s"} on ${when}`;
};

/** A year of contributions as weekly columns, Sunday at the top, like GitHub's own calendar. */
export function ContributionGraph({ days, total }: { days: Day[]; total: number }) {
  const lead = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  const cells: (Day | null)[] = [...Array(lead).fill(null), ...days];
  const weeks: (Day | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  let lastMonth = -1;
  const monthLabels = weeks.map((w) => {
    const first = w.find(Boolean);
    const m = first ? new Date(`${first.date}T00:00:00Z`).getUTCMonth() : -1;
    if (m === lastMonth || m < 0) return "";
    lastMonth = m;
    return MONTHS[m];
  });

  return (
    <figure className="mt-6" role="img" aria-label={`${total.toLocaleString("en-US")} GitHub contributions in the last year`}>
      {/* Fills the card on wide screens; on phones it keeps a readable size and scrolls, opening on the latest weeks. */}
      <div className="overflow-x-auto pb-2 [direction:rtl]">
        <div
          className="grid min-w-[640px] gap-[3px] [direction:ltr]"
          style={{ gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))` }}
        >
          {monthLabels.map((m, i) => (
            <span key={`m${i}`} className="h-4 overflow-visible whitespace-nowrap text-[10px] text-stone-500" style={{ gridRow: 1, gridColumn: i + 1 }}>
              {m}
            </span>
          ))}
          {weeks.map((w, i) =>
            w.map((d, j) => (
              <span
                key={d ? d.date : `pad-${i}-${j}`}
                title={d ? label(d) : undefined}
                className={`aspect-square rounded-[2px] ${d ? LEVELS[Math.min(d.level, 4)] : ""}`}
                style={{ gridRow: j + 2, gridColumn: i + 1 }}
              />
            )),
          )}
        </div>
      </div>
      <figcaption className="mt-2 flex flex-wrap items-center justify-between gap-2 text-sm text-stone-500">
        <span>
          <span className="text-[#1f1f1f] dark:text-[#cccccc]">{total.toLocaleString("en-US")}</span> contributions in the last year
        </span>
        <span className="flex items-center gap-1 text-xs">
          Less
          {LEVELS.map((c) => (
            <span key={c} className={`h-[11px] w-[11px] rounded-[2px] ${c}`} />
          ))}
          More
        </span>
      </figcaption>
    </figure>
  );
}
