import Link from "next/link";

const navItems = [
  { name: "首页总览", href: "/dashboard" },
  { name: "项目聚合", href: "/projects" },
  { name: "渠道账号", href: "/channels" },
  { name: "协作成员", href: "#" },
  { name: "系统设置", href: "#" },
];

type AppSidebarProps = {
  currentPath?: string;
};

export function AppSidebar({ currentPath = "/dashboard" }: AppSidebarProps) {
  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col bg-slate-900 px-4 py-5 text-slate-100">
      <div className="mb-8 rounded-2xl border border-slate-700/80 bg-slate-800/70 px-4 py-3">
        <p className="text-sm text-slate-300">熊动项目聚合台</p>
        <p className="mt-1 text-base font-semibold">内部工作台</p>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`block rounded-xl px-3 py-2 text-sm transition ${
              currentPath === item.href
                ? "bg-slate-100 text-slate-900"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="mt-auto rounded-2xl border border-slate-700/80 bg-slate-800/70 p-4">
        <p className="text-xs text-slate-300">当前版本</p>
        <p className="mt-1 text-sm font-medium">Phase 1 · Mock 模式</p>
      </div>
    </aside>
  );
}
