import { createSupabaseServerClient } from "@/src/lib/supabase/server";

export type UserRole = "admin" | "editor" | "viewer";

export type CurrentUserProfile = {
  id: string;
  email: string;
  name: string;
  department: string;
  role: UserRole;
  status: string;
};

const ROOT_ADMIN_EMAIL = "wangmiao@dxyx6888.com";

export async function getCurrentUser() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.id || !user.email) {
    return null;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, email, name, department, role, status")
    .eq("id", user.id)
    .maybeSingle();

  const role = (profile?.role as UserRole | null) ?? (user.email === ROOT_ADMIN_EMAIL ? "admin" : "editor");

  return {
    id: user.id,
    email: profile?.email ?? user.email,
    name: profile?.name ?? user.email.split("@")[0],
    department: profile?.department ?? "未设置",
    role,
    status: profile?.status ?? "active",
  } satisfies CurrentUserProfile;
}

