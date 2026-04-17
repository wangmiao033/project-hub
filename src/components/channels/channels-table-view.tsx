"use client";

import { useMemo, useState } from "react";
import type { ChannelRow } from "@/src/lib/mock/dashboard";
import { ChannelsNotice } from "./channels-notice";

type ChannelsTableViewProps = {
  rows: ChannelRow[];
};

type StatusFilter = "全部" | "正常" | "需更新";

export function ChannelsTableView({ rows }: ChannelsTableViewProps) {
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState<StatusFilter>("全部");

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const byStatus = status === "全部" || row.status === status;
      const byKeyword =
        row.channelName.includes(keyword) ||
        row.projectName.includes(keyword) ||
        row.account.includes(keyword);
      return byStatus && byKeyword;
    });
  }, [keyword, rows, status]);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex gap-2">
          {(["全部", "正常", "需更新"] as StatusFilter[]).map((item) => (
            <button
              key={item}
              onClick={() => setStatus(item)}
              className={`rounded-xl px-3 py-2 text-sm ${
                status === item
                  ? "bg-slate-900 text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <input
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          placeholder="搜索渠道名、项目、账号"
          className="h-10 min-w-72 rounded-xl border border-slate-200 px-3 text-sm text-slate-700 outline-none focus:border-slate-400"
        />
      </div>

      <ChannelsNotice />

      <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-left text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">渠道名称</th>
              <th className="px-4 py-3 font-medium">所属项目</th>
              <th className="px-4 py-3 font-medium">登录地址</th>
              <th className="px-4 py-3 font-medium">账号</th>
              <th className="px-4 py-3 font-medium">密码</th>
              <th className="px-4 py-3 font-medium">最近使用人</th>
              <th className="px-4 py-3 font-medium">更新时间</th>
              <th className="px-4 py-3 font-medium">状态</th>
              <th className="px-4 py-3 font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row) => (
              <tr key={row.id} className="border-t border-slate-100 text-slate-700">
                <td className="px-4 py-3">{row.channelName}</td>
                <td className="px-4 py-3">{row.projectName}</td>
                <td className="px-4 py-3">
                  <a
                    href={row.loginUrl}
                    className="text-slate-600 underline underline-offset-2"
                  >
                    打开地址
                  </a>
                </td>
                <td className="px-4 py-3">{row.account}</td>
                <td className="px-4 py-3">{row.passwordMasked}</td>
                <td className="px-4 py-3">{row.lastUser}</td>
                <td className="px-4 py-3">{row.updatedAt}</td>
                <td className="px-4 py-3">{row.status ?? "正常"}</td>
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
    </section>
  );
}
