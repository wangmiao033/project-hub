import type { ProjectItem } from "@/src/lib/mock/dashboard";
import { ResourceCard } from "./resource-card";

type ProjectCardProps = {
  item: ProjectItem;
};

export function ProjectCard({ item }: ProjectCardProps) {
  const statusClass =
    item.status === "需更新"
      ? "bg-amber-100 text-amber-700"
      : "bg-emerald-100 text-emerald-700";

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{item.name}</h3>
          <p className="mt-1 text-sm text-slate-500">
            负责人：{item.owner} · 最近更新：{item.updatedAt}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            协作成员：{item.members.join("、")}
          </p>
        </div>
        <span className={`w-fit rounded-lg px-2 py-1 text-xs ${statusClass}`}>
          {item.status}
        </span>
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        {item.resources.map((resource) => (
          <ResourceCard key={resource.id} item={resource} />
        ))}
      </div>
    </article>
  );
}
