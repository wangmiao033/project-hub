import type { ActivityItem } from "@/src/lib/mock/dashboard";

type ActivityListProps = {
  items: ActivityItem[];
};

export function ActivityList({ items }: ActivityListProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-base font-semibold text-slate-900">最近动态</h3>
      <ul className="mt-3 space-y-3">
        {items.map((item) => (
          <li key={item.id} className="rounded-xl border border-slate-100 p-3">
            <p className="text-sm text-slate-700">{item.content}</p>
            <p className="mt-1 text-xs text-slate-500">{item.time}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
