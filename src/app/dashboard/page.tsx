import { ActivityList } from "@/src/components/dashboard/activity-list";
import { ChannelTable } from "@/src/components/dashboard/channel-table";
import { FavoriteCard } from "@/src/components/dashboard/favorite-card";
import { OnlineUserList } from "@/src/components/dashboard/online-user-list";
import { ProjectCard } from "@/src/components/dashboard/project-card";
import { RecentVisitList } from "@/src/components/dashboard/recent-visit-list";
import { StatCard } from "@/src/components/dashboard/stat-card";
import { AppHeader } from "@/src/components/layout/app-header";
import { AppSidebar } from "@/src/components/layout/app-sidebar";
import {
  activityItems,
  alerts,
  channelRows,
  dashboardStats,
  favoriteItems,
  onlineUsers,
  projectItems,
  recentVisits,
} from "@/src/lib/mock/dashboard";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <AppSidebar currentPath="/dashboard" />
      <main className="flex-1 p-6">
        <AppHeader
          title="首页总览"
          description="集中展示找项目、开文档、开渠道、看谁在使用、看最近更新等高频动作。"
        />

        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <section className="space-y-6">
            <section>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {dashboardStats.map((item) => (
                  <StatCard key={item.title} item={item} />
                ))}
              </div>
            </section>

            <section>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">我的常用</h2>
              </div>
              <div className="grid gap-4 lg:grid-cols-3">
                {favoriteItems.map((item) => (
                  <FavoriteCard key={item.title} item={item} />
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">项目聚合</h2>
              </div>
              {alerts.map((alert) => (
                <div
                  key={alert.title}
                  className="rounded-3xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 shadow-sm"
                >
                  <p className="font-semibold">{alert.title}</p>
                  <p className="mt-1">{alert.content}</p>
                </div>
              ))}
              {projectItems.map((item) => (
                <ProjectCard key={item.id} item={item} />
              ))}
            </section>

            <section>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">常用渠道账号</h2>
              </div>
              <ChannelTable rows={channelRows} />
            </section>
          </section>

          <aside className="space-y-4">
            <RecentVisitList items={recentVisits} />
            <OnlineUserList items={onlineUsers} />
            <ActivityList items={activityItems} />
          </aside>
        </div>
      </main>
    </div>
  );
}
