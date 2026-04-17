import type { OnlineUser } from "@/src/lib/mock/dashboard";

type OnlineUserListProps = {
  items: OnlineUser[];
};

export function OnlineUserList({ items }: OnlineUserListProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-base font-semibold text-slate-900">在线人员</h3>
      <ul className="mt-3 space-y-3">
        {items.map((item) => (
          <li
            key={item.name}
            className="flex items-center justify-between rounded-xl border border-slate-100 px-3 py-2"
          >
            <div>
              <p className="text-sm font-medium text-slate-700">{item.name}</p>
              <p className="text-xs text-slate-500">{item.role}</p>
            </div>
            <span
              className={`rounded-lg px-2 py-1 text-xs ${
                item.status === "在线"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {item.status}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
