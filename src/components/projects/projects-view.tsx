"use client";

import { useMemo, useState } from "react";
import type { ProjectCatalogItem } from "@/src/lib/mock/dashboard";
import { ProjectsNotice } from "./projects-notice";

type ProjectsViewProps = {
  items: ProjectCatalogItem[];
};

type FilterKey = "全部" | "仅WPS" | "需更新";
type ViewMode = "卡片" | "列表";

export function ProjectsView({ items }: ProjectsViewProps) {
  const [filter, setFilter] = useState<FilterKey>("全部");
  const [keyword, setKeyword] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("卡片");

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const byFilter =
        filter === "全部" ||
        (filter === "仅WPS" && item.source === "WPS") ||
        (filter === "需更新" && item.status === "需更新");

      const byKeyword =
        item.name.includes(keyword) ||
        item.owner.includes(keyword) ||
        item.resources.some((resource) => resource.name.includes(keyword));

      return byFilter && byKeyword;
    });
  }, [filter, items, keyword]);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {(["全部", "仅WPS", "需更新"] as FilterKey[]).map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`rounded-xl px-3 py-2 text-sm ${
                filter === item
                  ? "bg-slate-900 text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="搜索项目、负责人、资源"
            className="h-10 min-w-60 rounded-xl border border-slate-200 px-3 text-sm text-slate-700 outline-none focus:border-slate-400"
          />
          <div className="flex rounded-xl border border-slate-200 bg-white p-1">
            {(["卡片", "列表"] as ViewMode[]).map((item) => (
              <button
                key={item}
                onClick={() => setViewMode(item)}
                className={`rounded-lg px-3 py-1.5 text-sm ${
                  viewMode === item
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          <button className="h-10 rounded-xl bg-slate-900 px-4 text-sm font-medium text-white hover:bg-slate-800">
            新增项目
          </button>
        </div>
      </div>

      <ProjectsNotice />

      {viewMode === "卡片" ? (
        <div className="mt-5 grid gap-4 xl:grid-cols-2">
          {filteredItems.map((item) => (
            <article key={item.id} className="rounded-2xl border border-slate-200 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-semibold text-slate-900">{item.name}</h3>
                  <p className="mt-1 text-xs text-slate-500">
                    负责人：{item.owner} · 最近更新：{item.updatedAt}
                  </p>
                </div>
                <span
                  className={`rounded-lg px-2 py-1 text-xs ${
                    item.status === "需更新"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  {item.status}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.resources.map((resource) => (
                  <span
                    key={resource.id}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-600"
                  >
                    {resource.name}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-left text-slate-500">
              <tr>
                <th className="px-4 py-3 font-medium">项目名</th>
                <th className="px-4 py-3 font-medium">来源</th>
                <th className="px-4 py-3 font-medium">负责人</th>
                <th className="px-4 py-3 font-medium">状态</th>
                <th className="px-4 py-3 font-medium">资源入口</th>
                <th className="px-4 py-3 font-medium">最近更新</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id} className="border-t border-slate-100 text-slate-700">
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3">{item.source}</td>
                  <td className="px-4 py-3">{item.owner}</td>
                  <td className="px-4 py-3">{item.status}</td>
                  <td className="px-4 py-3">{item.resources.length} 个</td>
                  <td className="px-4 py-3">{item.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
