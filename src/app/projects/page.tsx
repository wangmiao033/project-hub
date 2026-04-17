import { AppHeader } from "@/src/components/layout/app-header";
import { AppSidebar } from "@/src/components/layout/app-sidebar";
import { ProjectsView } from "@/src/components/projects/projects-view";
import { projectCatalogItems } from "@/src/lib/mock/dashboard";

export default function ProjectsPage() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <AppSidebar currentPath="/projects" />
      <main className="flex-1 p-6">
        <AppHeader
          title="项目聚合"
          description="集中查看全部项目，支持筛选、搜索、卡片与列表切换。"
        />
        <div className="mt-6">
          <ProjectsView items={projectCatalogItems} />
        </div>
      </main>
    </div>
  );
}
