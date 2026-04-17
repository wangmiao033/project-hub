"use client";

import { useRouter } from "next/navigation";
import { getSupabaseClient } from "@/src/lib/supabase/client";
import { showErrorToast } from "@/src/lib/toast";

type AppHeaderProps = {
  title: string;
  description: string;
  currentUser?: {
    name: string;
    department: string;
    role: string;
  };
};

export function AppHeader({ title, description, currentUser }: AppHeaderProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      showErrorToast("Supabase 环境变量缺失，无法退出登录");
      return;
    }

    const { error } = await supabase.auth.signOut();
    if (error) {
      showErrorToast(`退出失败：${error.message}`);
      return;
    }

    router.replace("/login");
    router.refresh();
  };

  return (
    <header className="rounded-3xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        </div>

        <div className="flex items-center gap-2">
          {currentUser ? (
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm">
              <p className="font-medium text-slate-900">
                {currentUser.name} · {currentUser.department}
              </p>
              <p className="text-xs text-slate-500">角色：{currentUser.role}</p>
            </div>
          ) : null}
          <button
            onClick={handleSignOut}
            className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            退出登录
          </button>
        </div>
      </div>
    </header>
  );
}
