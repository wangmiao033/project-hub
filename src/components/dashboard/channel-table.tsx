import type { ChannelRow } from "@/src/lib/mock/dashboard";

type ChannelTableProps = {
  rows: ChannelRow[];
};

export function ChannelTable({ rows }: ChannelTableProps) {
  return (
    <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full text-left text-sm">
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
          {rows.map((row) => (
            <tr key={row.id} className="border-t border-slate-100 text-slate-700">
              <td className="px-4 py-3">{row.channelName}</td>
              <td className="px-4 py-3">{row.projectName}</td>
              <td className="px-4 py-3">{row.account}</td>
              <td className="px-4 py-3">{row.passwordMasked}</td>
              <td className="px-4 py-3">{row.lastUser}</td>
              <td className="px-4 py-3">{row.updatedAt}</td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-2">
                  {["打开", "复制账号", "复制密码", "复制全部", "查看记录"].map(
                    (action) => (
                      <button
                        key={action}
                        className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs text-slate-600 hover:bg-slate-50"
                      >
                        {action}
                      </button>
                    ),
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
