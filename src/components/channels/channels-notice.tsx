"use client";

import { useEffect, useState } from "react";

type NoticeData = {
  title: string;
  content: string;
  publisher: string;
  publishedAt: string;
  pinned: boolean;
};

const STORAGE_KEY = "channels-system-notice";

const defaultNotice: NoticeData = {
  title: "渠道账号规范提醒",
  content:
    "请在使用渠道账号后及时更新最近使用记录；涉及密码变更时请同步在本页更新，避免影响协作成员登录。",
  publisher: "系统管理员",
  publishedAt: "2026-04-17 18:00",
  pinned: true,
};

function getNowString() {
  const now = new Date();
  const pad = (v: number) => String(v).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(
    now.getDate(),
  )} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
}

export function ChannelsNotice() {
  const [notice, setNotice] = useState<NoticeData | null>(null);
  const [draft, setDraft] = useState<NoticeData>(defaultNotice);
  const [editing, setEditing] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        setNotice(defaultNotice);
        setDraft(defaultNotice);
      } else {
        const parsed = JSON.parse(raw) as NoticeData;
        setNotice(parsed);
        setDraft(parsed);
      }
    } catch {
      setNotice(defaultNotice);
      setDraft(defaultNotice);
    } finally {
      setHydrated(true);
    }
  }, []);

  const handleEdit = () => {
    setDraft(notice ?? defaultNotice);
    setEditing(true);
    setExpanded(false);
  };

  const handleCancel = () => {
    setDraft(notice ?? defaultNotice);
    setEditing(false);
    setExpanded(false);
  };

  const handleSave = () => {
    const nextNotice: NoticeData = {
      ...draft,
      publishedAt: getNowString(),
    };
    setNotice(nextNotice);
    setDraft(nextNotice);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextNotice));
    setEditing(false);
    setExpanded(false);
  };

  const handleClear = () => {
    if (!window.confirm("确定要清空公告吗？此操作无法撤销。")) {
      return;
    }

    window.localStorage.removeItem(STORAGE_KEY);
    setNotice(null);
    setDraft(defaultNotice);
    setEditing(false);
    setExpanded(false);
  };

  if (!hydrated) {
    return (
      <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
        <p className="text-sm text-slate-400">公告加载中...</p>
      </section>
    );
  }

  return (
    <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-900">系统公告</h3>
        {!editing ? (
          <button
            onClick={handleEdit}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
          >
            编辑公告
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm text-white hover:bg-slate-800"
            >
              保存
            </button>
            <button
              onClick={handleCancel}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
            >
              取消
            </button>
            <button
              onClick={handleClear}
              className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-sm text-rose-700 hover:bg-rose-100"
            >
              清空公告
            </button>
          </div>
        )}
      </div>

      {!editing ? (
        notice ? (
          <div className="mt-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-slate-900">{notice.title}</p>
              {notice.pinned ? (
                <span className="rounded-md bg-amber-100 px-2 py-0.5 text-xs text-amber-700">
                  置顶
                </span>
              ) : null}
            </div>
            <p
              className={`mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700 ${
                expanded ? "" : "max-h-[4.5rem] overflow-hidden"
              }`}
            >
              {notice.content}
            </p>
            {notice.content.split("\n").length > 3 || notice.content.length > 90 ? (
              <button
                onClick={() => setExpanded((prev) => !prev)}
                className="mt-2 text-sm text-slate-600 underline decoration-slate-300 underline-offset-2 hover:text-slate-900"
              >
                {expanded ? "收起" : "展开全文"}
              </button>
            ) : null}
            <p className="mt-3 text-xs text-slate-500">
              发布时间：{notice.publishedAt} · 发布人：{notice.publisher}
            </p>
          </div>
        ) : (
          <p className="mt-3 text-sm text-slate-500">暂无公告</p>
        )
      ) : (
        <div className="mt-3 space-y-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
          <div>
            <label htmlFor="notice-title" className="mb-1 block text-xs text-slate-500">
              公告标题
            </label>
            <input
              id="notice-title"
              value={draft.title}
              onChange={(event) =>
                setDraft((prev) => ({ ...prev, title: event.target.value }))
              }
              className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-slate-400"
            />
          </div>
          <div>
            <label
              htmlFor="notice-content"
              className="mb-1 block text-xs text-slate-500"
            >
              公告内容
            </label>
            <textarea
              id="notice-content"
              value={draft.content}
              onChange={(event) =>
                setDraft((prev) => ({ ...prev, content: event.target.value }))
              }
              rows={4}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-slate-400"
            />
          </div>
          <div>
            <label
              htmlFor="notice-publisher"
              className="mb-1 block text-xs text-slate-500"
            >
              发布人
            </label>
            <input
              id="notice-publisher"
              value={draft.publisher}
              onChange={(event) =>
                setDraft((prev) => ({ ...prev, publisher: event.target.value }))
              }
              className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-slate-400"
            />
          </div>
          <label
            htmlFor="notice-pinned"
            className="flex items-center gap-2 text-sm text-slate-700"
          >
            <input
              id="notice-pinned"
              type="checkbox"
              checked={draft.pinned}
              onChange={(event) =>
                setDraft((prev) => ({ ...prev, pinned: event.target.checked }))
              }
              className="h-4 w-4 rounded border-slate-300"
            />
            是否置顶
          </label>
        </div>
      )}
    </section>
  );
}
