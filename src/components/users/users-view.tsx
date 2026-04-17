"use client";

import { useEffect, useState } from "react";
import { getSupabaseClient } from "@/src/lib/supabase/client";
import { showErrorToast, showSuccessToast } from "@/src/lib/toast";

type ProfileRow = {
  id: string;
  email: string;
  name: string | null;
  department: string | null;
  role: "admin" | "editor" | "viewer";
  status: string;
  created_at: string;
};

type EditState = {
  id: string;
  name: string;
  department: string;
  role: "admin" | "editor" | "viewer";
  status: string;
} | null;

type CreateState = {
  email: string;
  password: string;
  name: string;
  department: string;
  role: "admin" | "editor" | "viewer";
  status: "active" | "disabled";
};

const defaultCreateState: CreateState = {
  email: "",
  password: "",
  name: "",
  department: "",
  role: "viewer",
  status: "active",
};

export function UsersView({ currentUserRole }: { currentUserRole: "admin" | "editor" | "viewer" }) {
  const [rows, setRows] = useState<ProfileRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [editState, setEditState] = useState<EditState>(null);
  const [createState, setCreateState] = useState<CreateState>(defaultCreateState);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [creating, setCreating] = useState(false);

  const loadUsers = async () => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      showErrorToast("Supabase 环境变量缺失，无法加载用户");
      return;
    }

    setLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("id, email, name, department, role, status, created_at")
      .order("created_at", { ascending: false });
    setLoading(false);

    if (error) {
      showErrorToast(`加载用户失败：${error.message}`);
      return;
    }

    setRows((data ?? []) as ProfileRow[]);
  };

  useEffect(() => {
    void loadUsers();
  }, []);

  const startEdit = (row: ProfileRow) => {
    setEditState({
      id: row.id,
      name: row.name ?? "",
      department: row.department ?? "",
      role: row.role ?? "editor",
      status: row.status ?? "active",
    });
  };

  const submitEdit = async () => {
    if (!editState) {
      return;
    }

    const supabase = getSupabaseClient();
    if (!supabase) {
      showErrorToast("Supabase 环境变量缺失，无法保存");
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        name: editState.name.trim(),
        department: editState.department.trim(),
        role: editState.role,
        status: editState.status,
      })
      .eq("id", editState.id);

    if (error) {
      showErrorToast(`保存失败：${error.message}`);
      return;
    }

    showSuccessToast("用户信息已更新");
    setEditState(null);
    await loadUsers();
  };

  const quickSetStatus = async (id: string, status: "active" | "disabled") => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      showErrorToast("Supabase 环境变量缺失，无法更新状态");
      return;
    }

    const { error } = await supabase.from("profiles").update({ status }).eq("id", id);
    if (error) {
      showErrorToast(`更新状态失败：${error.message}`);
      return;
    }

    showSuccessToast(status === "active" ? "用户已启用" : "用户已禁用");
    await loadUsers();
  };

  const submitCreate = async () => {
    if (currentUserRole !== "admin") {
      showErrorToast("仅管理员可创建用户");
      return;
    }

    const payload = {
      email: createState.email.trim(),
      password: createState.password,
      name: createState.name.trim(),
      department: createState.department.trim(),
      role: createState.role,
      status: createState.status,
    };

    if (!payload.email || !payload.password) {
      showErrorToast("请填写邮箱和初始密码");
      return;
    }

    setCreating(true);
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { error?: string };
      if (!response.ok) {
        showErrorToast(result.error ?? "创建用户失败");
        return;
      }

      showSuccessToast("用户创建成功");
      setShowCreateModal(false);
      setCreateState(defaultCreateState);
      await loadUsers();
    } catch {
      showErrorToast("创建用户失败，请稍后重试");
    } finally {
      setCreating(false);
    }
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-900">用户列表</h3>
        <div className="flex items-center gap-2">
          {currentUserRole === "admin" ? (
            <button
              onClick={() => setShowCreateModal(true)}
              className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm text-white hover:bg-slate-800"
            >
              新建用户
            </button>
          ) : null}
          <button
            onClick={() => void loadUsers()}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
          >
            刷新
          </button>
        </div>
      </div>

      {loading ? <p className="text-sm text-slate-500">加载中...</p> : null}

      <div className="overflow-x-auto rounded-2xl border border-slate-200">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-left text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">邮箱</th>
              <th className="px-4 py-3 font-medium">姓名</th>
              <th className="px-4 py-3 font-medium">部门</th>
              <th className="px-4 py-3 font-medium">角色</th>
              <th className="px-4 py-3 font-medium">状态</th>
              <th className="px-4 py-3 font-medium">创建时间</th>
              <th className="px-4 py-3 font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-slate-100 text-slate-700">
                <td className="px-4 py-3">{row.email}</td>
                <td className="px-4 py-3">{row.name || "-"}</td>
                <td className="px-4 py-3">{row.department || "-"}</td>
                <td className="px-4 py-3">{row.role || "editor"}</td>
                <td className="px-4 py-3">{row.status || "active"}</td>
                <td className="px-4 py-3">
                  {row.created_at ? new Date(row.created_at).toLocaleString() : "-"}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => startEdit(row)}
                      className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-600 hover:bg-slate-50"
                    >
                      编辑
                    </button>
                    {row.status === "active" ? (
                      <button
                        onClick={() => void quickSetStatus(row.id, "disabled")}
                        className="rounded-md border border-rose-200 bg-rose-50 px-2 py-1 text-xs text-rose-700 hover:bg-rose-100"
                      >
                        禁用
                      </button>
                    ) : (
                      <button
                        onClick={() => void quickSetStatus(row.id, "active")}
                        className="rounded-md border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs text-emerald-700 hover:bg-emerald-100"
                      >
                        启用
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editState ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-xl">
            <h3 className="text-base font-semibold text-slate-900">编辑用户</h3>
            <div className="mt-4 space-y-3">
              <input
                value={editState.name}
                onChange={(event) =>
                  setEditState((prev) => (prev ? { ...prev, name: event.target.value } : prev))
                }
                placeholder="姓名"
                className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-slate-400"
              />
              <input
                value={editState.department}
                onChange={(event) =>
                  setEditState((prev) =>
                    prev ? { ...prev, department: event.target.value } : prev,
                  )
                }
                placeholder="部门"
                className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-slate-400"
              />
              <div className="grid grid-cols-2 gap-3">
                <select
                  aria-label="用户角色"
                  value={editState.role}
                  onChange={(event) =>
                    setEditState((prev) =>
                      prev ? { ...prev, role: event.target.value as ProfileRow["role"] } : prev,
                    )
                  }
                  className="h-10 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-slate-400"
                >
                  <option value="admin">角色：admin</option>
                  <option value="editor">角色：editor</option>
                  <option value="viewer">角色：viewer</option>
                </select>
                <select
                  aria-label="用户状态"
                  value={editState.status}
                  onChange={(event) =>
                    setEditState((prev) =>
                      prev ? { ...prev, status: event.target.value } : prev,
                    )
                  }
                  className="h-10 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-slate-400"
                >
                  <option value="active">状态：active</option>
                  <option value="disabled">状态：disabled</option>
                </select>
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setEditState(null)}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50"
              >
                取消
              </button>
              <button
                onClick={() => void submitEdit()}
                className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm text-white hover:bg-slate-800"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {showCreateModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-xl">
            <h3 className="text-base font-semibold text-slate-900">创建用户</h3>
            <div className="mt-4 space-y-3">
              <input
                type="email"
                value={createState.email}
                onChange={(event) =>
                  setCreateState((prev) => ({ ...prev, email: event.target.value }))
                }
                placeholder="邮箱"
                className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-slate-400"
              />
              <input
                type="password"
                value={createState.password}
                onChange={(event) =>
                  setCreateState((prev) => ({ ...prev, password: event.target.value }))
                }
                placeholder="初始密码"
                className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-slate-400"
              />
              <input
                value={createState.name}
                onChange={(event) =>
                  setCreateState((prev) => ({ ...prev, name: event.target.value }))
                }
                placeholder="姓名"
                className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-slate-400"
              />
              <input
                value={createState.department}
                onChange={(event) =>
                  setCreateState((prev) => ({ ...prev, department: event.target.value }))
                }
                placeholder="部门"
                className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-slate-400"
              />
              <div className="grid grid-cols-2 gap-3">
                <select
                  aria-label="新用户角色"
                  value={createState.role}
                  onChange={(event) =>
                    setCreateState((prev) => ({
                      ...prev,
                      role: event.target.value as CreateState["role"],
                    }))
                  }
                  className="h-10 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-slate-400"
                >
                  <option value="admin">角色：admin</option>
                  <option value="editor">角色：editor</option>
                  <option value="viewer">角色：viewer</option>
                </select>
                <select
                  aria-label="新用户状态"
                  value={createState.status}
                  onChange={(event) =>
                    setCreateState((prev) => ({
                      ...prev,
                      status: event.target.value as CreateState["status"],
                    }))
                  }
                  className="h-10 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-slate-400"
                >
                  <option value="active">状态：active</option>
                  <option value="disabled">状态：disabled</option>
                </select>
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => {
                  if (!creating) {
                    setShowCreateModal(false);
                    setCreateState(defaultCreateState);
                  }
                }}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50"
              >
                取消
              </button>
              <button
                disabled={creating}
                onClick={() => void submitCreate()}
                className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {creating ? "创建中..." : "确认创建"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

