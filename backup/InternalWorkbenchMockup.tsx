export default function InternalWorkbenchMockup() {
  const projects = [
    {
      name: "六界仙尊",
      owner: "运营组",
      updated: "今天 10:12",
      status: "正常",
      resources: [
        { label: "策划文档", type: "WPS文档" },
        { label: "结算表", type: "WPS表格" },
        { label: "渠道后台", type: "后台地址" },
      ],
      members: ["王", "刘", "陈"],
    },
    {
      name: "一起来修仙",
      owner: "商务组",
      updated: "今天 09:46",
      status: "正常",
      resources: [
        { label: "投放表", type: "WPS表格" },
        { label: "活动文档", type: "WPS文档" },
      ],
      members: ["李", "赵"],
    },
    {
      name: "创世封神",
      owner: "发行组",
      updated: "昨天 18:20",
      status: "需更新",
      resources: [
        { label: "发行后台", type: "后台地址" },
        { label: "版本说明", type: "WPS文档" },
      ],
      members: ["吴", "周", "黄"],
    },
  ];

  const recentEntries = [
    { title: "六界仙尊 / 结算表", meta: "今天 10:12 · 王淼访问" },
    { title: "OPPO渠道 / 登录后台", meta: "今天 09:55 · 财务-小陈访问" },
    { title: "一起来修仙 / 活动文档", meta: "今天 09:21 · 商务-小刘访问" },
  ];

  const channels = [
    {
      name: "OPPO渠道",
      project: "六界仙尊",
      account: "oppo_admin",
      pwd: "••••••••",
      updated: "今天 09:10",
      recentUser: "财务-小陈",
    },
    {
      name: "vivo渠道",
      project: "一起来修仙",
      account: "vivo_ops",
      pwd: "••••••••",
      updated: "昨天 16:40",
      recentUser: "商务-小刘",
    },
    {
      name: "应用宝渠道",
      project: "创世封神",
      account: "yyb_admin",
      pwd: "••••••••",
      updated: "04-16 19:22",
      recentUser: "王淼",
    },
  ];

  const onlineUsers = [
    { name: "王淼", action: "正在查看 六界仙尊 / 结算表", time: "刚刚" },
    { name: "财务-小陈", action: "打开 OPPO渠道", time: "1分钟前" },
    { name: "商务-小刘", action: "编辑 一起来修仙", time: "3分钟前" },
  ];

  const logs = [
    "六界仙尊 链接已更新为最新版 WPS 文档",
    "创世封神 被标记为“需更新”",
    "新增渠道：应用宝渠道",
    "财务复制了 vivo 渠道账号",
  ];

  return (
    <div className="min-h-screen bg-[#eef2f7] text-slate-900">
      <div className="flex min-h-screen">
        <aside className="w-72 bg-[#0b1220] px-5 py-6 text-white">
          <div className="mb-8">
            <div className="text-2xl font-semibold tracking-tight">熊动项目聚合台</div>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              统一管理项目入口、WPS 文档、渠道账号与最近使用记录
            </p>
          </div>

          <div className="mb-6 rounded-3xl border border-white/10 bg-white/5 p-3">
            <div className="mb-2 px-3 text-xs uppercase tracking-[0.22em] text-slate-400">
              导航
            </div>
            <div className="space-y-1.5">
              {[
                "首页总览",
                "项目聚合",
                "渠道账号",
                "最近访问",
                "在线人员",
                "操作日志",
                "系统设置",
              ].map((item, idx) => (
                <div
                  key={item}
                  className={`rounded-2xl px-4 py-3 text-sm transition ${
                    idx === 0
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-200 hover:bg-white/10"
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <div className="text-sm font-medium">当前账号</div>
            <div className="mt-3 text-sm text-slate-200">wangmiao@company.com</div>
            <div className="mt-1 text-xs text-slate-400">管理员</div>
            <div className="mt-4 rounded-2xl bg-emerald-500/10 px-3 py-2 text-xs text-emerald-300">
              当前 3 人在线
            </div>
          </div>
        </aside>

        <main className="flex-1 p-6">
          <header className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">首页总览</h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
                首页优先展示高频动作：找项目、开文档、开渠道、看谁在使用、看最近更新。减少翻
                Excel，直接从聚合台进入。
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <input
                  placeholder="搜索项目 / WPS文档 / 渠道 / 负责人"
                  className="w-96 bg-transparent text-sm outline-none"
                />
              </div>
              <button className="rounded-2xl bg-white px-4 py-3 text-sm font-medium shadow-sm ring-1 ring-slate-200">
                + 新增项目
              </button>
              <button className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-sm">
                + 新增渠道
              </button>
            </div>
          </header>

          <section className="mb-6 grid grid-cols-4 gap-4">
            {[
              { label: "项目总数", value: "7", sub: "其中 5 个为 WPS 文档项目" },
              { label: "渠道总数", value: "12", sub: "常用 8 个" },
              { label: "当前在线", value: "3", sub: "可实时看到谁正在使用" },
              { label: "待更新入口", value: "1", sub: "链接异常或需替换" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="text-sm text-slate-500">{item.label}</div>
                <div className="mt-2 text-3xl font-bold tracking-tight">{item.value}</div>
                <div className="mt-2 text-xs text-slate-400">{item.sub}</div>
              </div>
            ))}
          </section>

          <section className="mb-6 grid grid-cols-12 gap-6">
            <div className="col-span-8 space-y-6">
              <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">项目聚合</h2>
                    <p className="text-sm text-slate-500">
                      每个项目下挂多个资源入口，适合接 WPS 文档、后台地址、下载地址
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="rounded-xl bg-slate-900 px-3 py-2 text-sm text-white">
                      全部项目
                    </button>
                    <button className="rounded-xl border border-slate-200 px-3 py-2 text-sm">
                      仅 WPS
                    </button>
                    <button className="rounded-xl border border-slate-200 px-3 py-2 text-sm">
                      需更新
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {projects.map((item) => (
                    <div
                      key={item.name}
                      className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0 flex-1">
                          <div className="mb-2 flex flex-wrap items-center gap-2">
                            <div className="text-lg font-semibold">{item.name}</div>
                            <span
                              className={`rounded-full px-3 py-1 text-xs ${
                                item.status === "正常"
                                  ? "bg-emerald-50 text-emerald-700"
                                  : "bg-amber-50 text-amber-700"
                              }`}
                            >
                              {item.status}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                            <span>负责人：{item.owner}</span>
                            <span>最近更新：{item.updated}</span>
                            <span>协作成员：{item.members.join("、")}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="rounded-xl bg-slate-900 px-3 py-2 text-sm text-white">
                            查看详情
                          </button>
                          <button className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm">
                            编辑项目
                          </button>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-3 gap-3">
                        {item.resources.map((resource) => (
                          <div
                            key={resource.label}
                            className="rounded-2xl border border-slate-200 bg-white p-4"
                          >
                            <div className="text-sm font-medium">{resource.label}</div>
                            <div className="mt-1 text-xs text-slate-400">{resource.type}</div>
                            <div className="mt-3 flex gap-2">
                              <button className="rounded-lg bg-slate-900 px-3 py-2 text-xs text-white">
                                打开
                              </button>
                              <button className="rounded-lg border border-slate-200 px-3 py-2 text-xs">
                                复制链接
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">常用渠道账号</h2>
                    <p className="text-sm text-slate-500">
                      常用渠道放首页，打开和复制一步完成
                    </p>
                  </div>
                  <button className="rounded-xl border border-slate-200 px-3 py-2 text-sm">
                    查看全部
                  </button>
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-200">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500">
                      <tr>
                        <th className="px-4 py-3 font-medium">渠道名称</th>
                        <th className="px-4 py-3 font-medium">所属项目</th>
                        <th className="px-4 py-3 font-medium">账号</th>
                        <th className="px-4 py-3 font-medium">密码</th>
                        <th className="px-4 py-3 font-medium">最近使用人</th>
                        <th className="px-4 py-3 font-medium">更新时间</th>
                        <th className="px-4 py-3 font-medium">操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      {channels.map((item) => (
                        <tr key={item.name} className="border-t border-slate-100 hover:bg-slate-50">
                          <td className="px-4 py-4 font-medium">{item.name}</td>
                          <td className="px-4 py-4 text-slate-500">{item.project}</td>
                          <td className="px-4 py-4">{item.account}</td>
                          <td className="px-4 py-4">{item.pwd}</td>
                          <td className="px-4 py-4 text-slate-500">{item.recentUser}</td>
                          <td className="px-4 py-4 text-slate-500">{item.updated}</td>
                          <td className="px-4 py-4">
                            <div className="flex flex-wrap gap-2">
                              <button className="rounded-lg bg-slate-900 px-3 py-2 text-xs text-white">
                                打开
                              </button>
                              <button className="rounded-lg bg-white px-3 py-2 text-xs ring-1 ring-slate-200">
                                复制账号
                              </button>
                              <button className="rounded-lg bg-white px-3 py-2 text-xs ring-1 ring-slate-200">
                                复制密码
                              </button>
                              <button className="rounded-lg bg-white px-3 py-2 text-xs ring-1 ring-slate-200">
                                查看记录
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="col-span-4 space-y-6">
              <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold">最近访问</h2>
                  <p className="text-sm text-slate-500">返回后继续用，不用重新翻找</p>
                </div>
                <div className="space-y-3">
                  {recentEntries.map((item) => (
                    <div key={item.title} className="rounded-2xl border border-slate-200 p-4 hover:bg-slate-50">
                      <div className="text-sm font-medium">{item.title}</div>
                      <div className="mt-1 text-xs text-slate-400">{item.meta}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold">在线人员</h2>
                  <p className="text-sm text-slate-500">可看到谁正在使用当前系统</p>
                </div>
                <div className="space-y-3">
                  {onlineUsers.map((user) => (
                    <div key={user.name + user.time} className="rounded-2xl bg-slate-50 p-4">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{user.name}</div>
                        <div className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs text-emerald-700">
                          在线
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-slate-600">{user.action}</div>
                      <div className="mt-1 text-xs text-slate-400">{user.time}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
                <div>
                  <h2 className="text-xl font-semibold">最近动态</h2>
                  <p className="text-sm text-slate-500">记录入口更新与账号使用痕迹</p>
                </div>
                <div className="mt-4 space-y-3">
                  {logs.map((log, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-slate-200 p-3 text-sm text-slate-600"
                    >
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
