import type { StatItem } from "@/src/lib/mock/dashboard";

type StatCardProps = {
  item: StatItem;
};

export function StatCard({ item }: StatCardProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">{item.title}</p>
      <p className="mt-2 text-2xl font-semibold text-slate-900">{item.value}</p>
      <p className="mt-2 text-xs text-slate-400">{item.hint}</p>
    </article>
  );
}
