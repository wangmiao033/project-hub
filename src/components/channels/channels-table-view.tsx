"use client";

import { useEffect, useMemo, useState } from "react";
import {
  createChannel,
  deleteChannel,
  listChannels,
  type ChannelAccount,
  type ChannelInput,
  type ChannelStatus,
  updateChannel,
} from "@/src/lib/services/channels-service";
import { ChannelsNotice } from "./channels-notice";

type ChannelModalState = {
  mode: "create" | "edit";
  channel?: ChannelAccount;
} | null;

const defaultChannelForm: ChannelInput = {
  channelName: "",
  projectName: "",
  loginUrl: "",
  account: "",
  password: "",
  lastUser: "",
  status: "正常",
};

type StatusFilter = "全部" | ChannelStatus;

export function ChannelsTableView() {
  const [rows, setRows] = useState<ChannelAccount[]>([]);
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState<StatusFilter>("全部");
  const [modal, setModal] = useState<ChannelModalState>(null);
  const [form, setForm] = useState<ChannelInput>(defaultChannelForm);

  const loadData = () => {
    setRows(listChannels());
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const byStatus = status === "全部" || row.status === status;
      const byKeyword =
        row.channelName.includes(keyword) ||
        row.projectName.includes(keyword) ||
        row.account.includes(keyword) ||
        row.loginUrl.includes(keyword);
      return byStatus && byKeyword;
    });
  }, [keyword, rows, status]);

  const openCreateModal = () => {
    setForm(defaultChannelForm);
    setModal({ mode: "create" });
  };

  const openEditModal = (channel: ChannelAccount) => {
    setForm({
      channelName: channel.channelName,
      projectName: channel.projectName,
      loginUrl: channel.loginUrl,
      account: channel.account,
      password: channel.password,
      lastUser: channel.lastUser,
      status: channel.status,
    });
    setModal({ mode: "edit", channel });
  };

  const submitModal = () => {
    if (!form.channelName.trim() || !form.account.trim() || !form.password.trim()) {
      window.alert("请至少填写渠道名称、账号、密码");
      return;
    }

    if (modal?.mode === "create") {
      createChannel(form);
    }

    if (modal?.mode === "edit" && modal.channel) {
      updateChannel(modal.channel.id, form);
    }

    setModal(null);
    loadData();
  };

  const removeItem = (id: string) => {
    if (!window.confirm("确定删除该渠道账号吗？")) {
      return;
    }
    deleteChannel(id);
    loadData();
  };

  const copyText = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      window.alert(`${label}已复制`);
    } catch {
      window.alert("复制失败，请检查浏览器权限");
    }
  };

  const openBackend = (url: string) => {
    if (!url) {
      window.alert("该记录未配置后台地址");
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  };

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
        <div className="flex items-center gap-2">
          <input
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="搜索渠道名、项目、账号"
            className="h-10 min-w-72 rounded-xl border border-slate-200 px-3 text-sm text-slate-700 outline-none focus:border-slate-400"
          />
          <button
            onClick={openCreateModal}
            className="h-10 rounded-xl bg-slate-900 px-4 text-sm font-medium text-white hover:bg-slate-800"
          >
            新增账号
          </button>
        </div>
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
                    target="_blank"
                    rel="noreferrer"
                  >
                    打开地址
                  </a>
                </td>
                <td className="px-4 py-3">{row.account}</td>
                <td className="px-4 py-3">{"*".repeat(Math.max(6, row.password.length))}</td>
                <td className="px-4 py-3">{row.lastUser}</td>
                <td className="px-4 py-3">{row.updatedAt}</td>
                <td className="px-4 py-3">{row.status ?? "正常"}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => openBackend(row.loginUrl)}
                      className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs text-slate-600 hover:bg-slate-50"
                    >
                      打开后台
                    </button>
                    <button
                      onClick={() => copyText(row.account, "账号")}
                      className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs text-slate-600 hover:bg-slate-50"
                    >
                      复制账号
                    </button>
                    <button
                      onClick={() => copyText(row.password, "密码")}
                      className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs text-slate-600 hover:bg-slate-50"
                    >
                      复制密码
                    </button>
                    <button
                      onClick={() =>
                        copyText(
                          `渠道: ${row.channelName}\n项目: ${row.projectName}\n后台: ${row.loginUrl}\n账号: ${row.account}\n密码: ${row.password}`,
                          "全部信息",
                        )
                      }
                      className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs text-slate-600 hover:bg-slate-50"
                    >
                      复制全部
                    </button>
                    <button
                      onClick={() => openEditModal(row)}
                      className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs text-slate-600 hover:bg-slate-50"
                    >
                      编辑
                    </button>
                    <button
                      onClick={() => removeItem(row.id)}
                      className="rounded-lg border border-rose-200 bg-rose-50 px-2 py-1 text-xs text-rose-700 hover:bg-rose-100"
                    >
                      删除
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-5 shadow-xl">
            <h3 className="text-base font-semibold text-slate-900">
              {modal.mode === "create" ? "新增渠道账号" : "编辑渠道账号"}
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
              <input
                value={form.channelName}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, channelName: event.target.value }))
                }
                placeholder="渠道名称"
                className="h-10 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-slate-400"
              />
              <input
                value={form.projectName}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, projectName: event.target.value }))
                }
                placeholder="所属项目"
                className="h-10 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-slate-400"
              />
              <input
                value={form.loginUrl}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, loginUrl: event.target.value }))
                }
                placeholder="后台地址"
                className="h-10 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-slate-400 md:col-span-2"
              />
              <input
                value={form.account}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, account: event.target.value }))
                }
                placeholder="账号"
                className="h-10 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-slate-400"
              />
              <input
                value={form.password}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, password: event.target.value }))
                }
                placeholder="密码"
                className="h-10 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-slate-400"
              />
              <input
                value={form.lastUser}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, lastUser: event.target.value }))
                }
                placeholder="最近使用人"
                className="h-10 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-slate-400"
              />
              <select
                aria-label="渠道状态"
                value={form.status}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    status: event.target.value as ChannelStatus,
                  }))
                }
                className="h-10 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-slate-400"
              >
                {(["正常", "需更新"] as ChannelStatus[]).map((item) => (
                  <option key={item} value={item}>
                    状态：{item}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setModal(null)}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50"
              >
                取消
              </button>
              <button
                onClick={submitModal}
                className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm text-white hover:bg-slate-800"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
