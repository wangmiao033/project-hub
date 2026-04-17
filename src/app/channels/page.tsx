import { ChannelsTableView } from "@/src/components/channels/channels-table-view";
import { AppHeader } from "@/src/components/layout/app-header";
import { AppSidebar } from "@/src/components/layout/app-sidebar";

export default function ChannelsPage() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <AppSidebar currentPath="/channels" />
      <main className="flex-1 p-6">
        <AppHeader
          title="渠道账号"
          description="查看全部渠道登录信息，支持搜索和状态筛选。"
        />
        <div className="mt-6">
          <ChannelsTableView />
        </div>
      </main>
    </div>
  );
}
