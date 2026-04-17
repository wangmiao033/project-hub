type AppHeaderProps = {
  title: string;
  description: string;
};

export function AppHeader({ title, description }: AppHeaderProps) {
  return (
    <header className="rounded-3xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
          <input
            type="text"
            placeholder="搜索项目、资源、渠道"
            className="h-10 min-w-64 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none ring-0 placeholder:text-slate-400 focus:border-slate-400"
          />
          <button className="h-10 rounded-xl bg-slate-900 px-4 text-sm font-medium text-white hover:bg-slate-800">
            新增项目
          </button>
          <button className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 hover:bg-slate-50">
            新增渠道
          </button>
        </div>
      </div>
    </header>
  );
}
