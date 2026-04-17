import { redirect } from "next/navigation";
import { AppHeader } from "@/src/components/layout/app-header";
import { AppSidebar } from "@/src/components/layout/app-sidebar";
import { UsersView } from "@/src/components/users/users-view";
import { getCurrentUser } from "@/src/lib/auth/get-current-user";

export default async function UsersPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <AppSidebar currentPath="/users" role={currentUser.role} />
      <main className="flex-1 p-6">
        <AppHeader
          title="用户管理"
          description="查看并维护内部成员资料与权限。"
          currentUser={{
            name: currentUser.name,
            department: currentUser.department,
            role: currentUser.role,
          }}
        />
        <div className="mt-6">
          <UsersView currentUserRole={currentUser.role} />
        </div>
      </main>
    </div>
  );
}

