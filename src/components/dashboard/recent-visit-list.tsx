import type { VisitItem } from "@/src/lib/mock/dashboard";

type RecentVisitListProps = {
  items: VisitItem[];
};

export function RecentVisitList({ items }: RecentVisitListProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-base font-semibold text-slate-900">最近访问</h3>
      <ul className="mt-3 space-y-3">
        {items.map((item) => (
          <li key={item.title} className="rounded-xl border border-slate-100 p-3">
            <p className="text-sm font-medium text-slate-700">{item.title}</p>
            <p className="mt-1 text-xs text-slate-500">{item.meta}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
