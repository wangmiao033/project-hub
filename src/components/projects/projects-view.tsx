"use client";

import { useEffect, useMemo, useState } from "react";
import { ProjectsNotice } from "./projects-notice";
import {
  createProject,
  deleteProject,
  listProjects,
  type Project,
  type ProjectInput,
  type ProjectSource,
  type ProjectStatus,
  updateProject,
} from "@/src/lib/services/projects-service";
import {
  createResource,
  deleteResource,
  deleteResourcesByProject,
  listResourcesByProject,
  type Resource,
  type ResourceInput,
  updateResource,
} from "@/src/lib/services/resources-service";

type ProjectWithResources = Project & {
  resources: Resource[];
};

type FilterKey = "全部" | "仅WPS" | ProjectStatus;
type ViewMode = "卡片" | "列表";

type ProjectModalState = {
  mode: "create" | "edit";
  project?: Project;
} | null;

type ResourceModalState = {
  mode: "create" | "edit";
  projectId: string;
  resource?: Resource;
} | null;

const defaultProjectForm: ProjectInput = {
  name: "",
  owner: "",
  status: "正常",
  source: "WPS",
};

const defaultResourceForm: Omit<ResourceInput, "projectId"> = {
  name: "",
  url: "",
  description: "",
};

export function ProjectsView() {
  const [projects, setProjects] = useState<ProjectWithResources[]>([]);
  const [filter, setFilter] = useState<FilterKey>("全部");
  const [keyword, setKeyword] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("卡片");
  const [projectModal, setProjectModal] = useState<ProjectModalState>(null);
  const [projectForm, setProjectForm] = useState<ProjectInput>(defaultProjectForm);
  const [resourceModal, setResourceModal] = useState<ResourceModalState>(null);
  const [resourceForm, setResourceForm] = useState(defaultResourceForm);

  const loadData = () => {
    const projectRows = listProjects();
    const rowsWithResources: ProjectWithResources[] = projectRows.map((project) => ({
      ...project,
      resources: listResourcesByProject(project.id),
    }));
    setProjects(rowsWithResources);
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredItems = useMemo(() => {
    return projects.filter((item) => {
      const byFilter =
        filter === "全部" ||
        (filter === "仅WPS" && item.source === "WPS") ||
        (filter === "需更新" && item.status === "需更新");

      const byKeyword =
        item.name.includes(keyword) ||
        item.owner.includes(keyword) ||
        item.resources.some(
          (resource) =>
            resource.name.includes(keyword) ||
            resource.description.includes(keyword) ||
            resource.url.includes(keyword),
        );

      return byFilter && byKeyword;
    });
  }, [filter, keyword, projects]);

  const openCreateProject = () => {
    setProjectForm(defaultProjectForm);
    setProjectModal({ mode: "create" });
  };

  const openEditProject = (project: Project) => {
    setProjectForm({
      name: project.name,
      owner: project.owner,
      status: project.status,
      source: project.source,
    });
    setProjectModal({ mode: "edit", project });
  };

  const submitProject = () => {
    if (!projectForm.name.trim() || !projectForm.owner.trim()) {
      window.alert("请填写项目名称和负责人");
      return;
    }

    if (projectModal?.mode === "create") {
      createProject(projectForm);
    }

    if (projectModal?.mode === "edit" && projectModal.project) {
      updateProject(projectModal.project.id, projectForm);
    }

    setProjectModal(null);
    loadData();
  };

  const removeProject = (projectId: string) => {
    if (!window.confirm("确定删除这个项目吗？关联资源也会一并删除。")) {
      return;
    }

    deleteProject(projectId);
    deleteResourcesByProject(projectId);
    loadData();
  };

  const openCreateResource = (projectId: string) => {
    setResourceForm(defaultResourceForm);
    setResourceModal({ mode: "create", projectId });
  };

  const openEditResource = (projectId: string, resource: Resource) => {
    setResourceForm({
      name: resource.name,
      url: resource.url,
      description: resource.description,
    });
    setResourceModal({ mode: "edit", projectId, resource });
  };

  const submitResource = () => {
    if (!resourceModal) {
      return;
    }

    if (!resourceForm.name.trim() || !resourceForm.url.trim()) {
      window.alert("请填写资源名称和链接");
      return;
    }

    if (resourceModal.mode === "create") {
      createResource({
        projectId: resourceModal.projectId,
        ...resourceForm,
      });
    }

    if (resourceModal.mode === "edit" && resourceModal.resource) {
      updateResource(resourceModal.resource.id, resourceForm);
    }

    setResourceModal(null);
    loadData();
  };

  const removeResource = (id: string) => {
    if (!window.confirm("确定删除这个资源入口吗？")) {
      return;
    }
    deleteResource(id);
    loadData();
  };

  const openLink = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const copyText = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      window.alert(`${label}已复制`);
    } catch {
      window.alert("复制失败，请检查浏览器权限");
    }
  };

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
          <button
            onClick={openCreateProject}
            className="h-10 rounded-xl bg-slate-900 px-4 text-sm font-medium text-white hover:bg-slate-800"
          >
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
                <button
                  onClick={() => openEditProject(item)}
                  className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs text-slate-600 hover:bg-slate-50"
                >
                  编辑项目
                </button>
                <button
                  onClick={() => removeProject(item.id)}
                  className="rounded-lg border border-rose-200 bg-rose-50 px-2 py-1 text-xs text-rose-700 hover:bg-rose-100"
                >
                  删除项目
                </button>
                <button
                  onClick={() => openCreateResource(item.id)}
                  className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs text-slate-600 hover:bg-slate-50"
                >
                  新增资源
                </button>
              </div>
              <div className="mt-3 space-y-2">
                {item.resources.length === 0 ? (
                  <p className="text-xs text-slate-500">暂无资源入口</p>
                ) : null}
                {item.resources.map((resource) => (
                  <div
                    key={resource.id}
                    className="rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs text-slate-700"
                  >
                    <p className="font-medium text-slate-900">{resource.name}</p>
                    <p className="mt-1 truncate text-slate-500">{resource.url}</p>
                    <p className="mt-1 text-slate-600">{resource.description}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <button
                        onClick={() => openEditResource(item.id, resource)}
                        className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-600 hover:bg-slate-100"
                      >
                        编辑
                      </button>
                      <button
                        onClick={() => removeResource(resource.id)}
                        className="rounded-md border border-rose-200 bg-rose-50 px-2 py-1 text-xs text-rose-700 hover:bg-rose-100"
                      >
                        删除
                      </button>
                      <button
                        onClick={() => openLink(resource.url)}
                        className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-600 hover:bg-slate-100"
                      >
                        打开链接
                      </button>
                      <button
                        onClick={() => copyText(resource.url, "链接")}
                        className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-600 hover:bg-slate-100"
                      >
                        复制链接
                      </button>
                    </div>
                  </div>
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
                <th className="px-4 py-3 font-medium">操作</th>
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
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditProject(item)}
                        className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-600 hover:bg-slate-50"
                      >
                        编辑
                      </button>
                      <button
                        onClick={() => removeProject(item.id)}
                        className="rounded-md border border-rose-200 bg-rose-50 px-2 py-1 text-xs text-rose-700 hover:bg-rose-100"
                      >
                        删除
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {projectModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-xl">
            <h3 className="text-base font-semibold text-slate-900">
              {projectModal.mode === "create" ? "新建项目" : "编辑项目"}
            </h3>
            <div className="mt-4 space-y-3">
              <input
                value={projectForm.name}
                onChange={(event) =>
                  setProjectForm((prev) => ({ ...prev, name: event.target.value }))
                }
                placeholder="项目名称"
                className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-slate-400"
              />
              <input
                value={projectForm.owner}
                onChange={(event) =>
                  setProjectForm((prev) => ({ ...prev, owner: event.target.value }))
                }
                placeholder="负责人"
                className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-slate-400"
              />
              <div className="grid grid-cols-2 gap-3">
                <select
                  aria-label="项目来源"
                  value={projectForm.source}
                  onChange={(event) =>
                    setProjectForm((prev) => ({
                      ...prev,
                      source: event.target.value as ProjectSource,
                    }))
                  }
                  className="h-10 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-slate-400"
                >
                  {(["WPS", "飞书", "其他"] as ProjectSource[]).map((item) => (
                    <option key={item} value={item}>
                      来源：{item}
                    </option>
                  ))}
                </select>
                <select
                  aria-label="项目状态"
                  value={projectForm.status}
                  onChange={(event) =>
                    setProjectForm((prev) => ({
                      ...prev,
                      status: event.target.value as ProjectStatus,
                    }))
                  }
                  className="h-10 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-slate-400"
                >
                  {(["正常", "需更新"] as ProjectStatus[]).map((item) => (
                    <option key={item} value={item}>
                      状态：{item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setProjectModal(null)}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50"
              >
                取消
              </button>
              <button
                onClick={submitProject}
                className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm text-white hover:bg-slate-800"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {resourceModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-xl">
            <h3 className="text-base font-semibold text-slate-900">
              {resourceModal.mode === "create" ? "新增资源入口" : "编辑资源入口"}
            </h3>
            <div className="mt-4 space-y-3">
              <input
                value={resourceForm.name}
                onChange={(event) =>
                  setResourceForm((prev) => ({ ...prev, name: event.target.value }))
                }
                placeholder="资源名称"
                className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-slate-400"
              />
              <input
                value={resourceForm.url}
                onChange={(event) =>
                  setResourceForm((prev) => ({ ...prev, url: event.target.value }))
                }
                placeholder="资源链接（https://）"
                className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-slate-400"
              />
              <textarea
                value={resourceForm.description}
                onChange={(event) =>
                  setResourceForm((prev) => ({ ...prev, description: event.target.value }))
                }
                placeholder="资源说明"
                rows={3}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
              />
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setResourceModal(null)}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50"
              >
                取消
              </button>
              <button
                onClick={submitResource}
                className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm text-white hover:bg-slate-800"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
