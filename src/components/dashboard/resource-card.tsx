import type { ResourceItem } from "@/src/lib/mock/dashboard";

type ResourceCardProps = {
  item: ResourceItem;
};

export function ResourceCard({ item }: ResourceCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-slate-900">{item.name}</h4>
        <span className="rounded-md bg-white px-2 py-1 text-xs text-slate-500">
          {item.type}
        </span>
      </div>
      <p className="mt-2 text-xs text-slate-500">{item.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs text-white hover:bg-slate-800">
          打开
        </button>
        <button className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50">
          复制链接
        </button>
        <button className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50">
          常用
        </button>
      </div>
    </article>
  );
}
