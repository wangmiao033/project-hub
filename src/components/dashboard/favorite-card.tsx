import type { FavoriteItem } from "@/src/lib/mock/dashboard";

type FavoriteCardProps = {
  item: FavoriteItem;
};

export function FavoriteCard({ item }: FavoriteCardProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
        <span className="rounded-lg bg-slate-100 px-2 py-1 text-xs text-slate-600">
          {item.tag}
        </span>
      </div>
      <button className="mt-4 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
        {item.actionLabel}
      </button>
    </article>
  );
}
