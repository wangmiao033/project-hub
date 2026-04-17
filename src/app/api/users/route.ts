import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/src/lib/supabase/server";
import { createSupabaseServiceRoleClient } from "@/src/lib/supabase/service-role";

type CreateUserPayload = {
  email?: string;
  password?: string;
  name?: string;
  department?: string;
  role?: "admin" | "editor" | "viewer";
  status?: "active" | "disabled";
};

const roleOptions = new Set(["admin", "editor", "viewer"]);
const statusOptions = new Set(["active", "disabled"]);

export async function POST(request: Request) {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user?.id) {
      return NextResponse.json({ error: "未登录或登录态失效" }, { status: 401 });
    }

    const { data: currentProfile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();

    if (profileError) {
      return NextResponse.json({ error: profileError.message }, { status: 500 });
    }

    if (currentProfile?.role !== "admin") {
      return NextResponse.json({ error: "仅管理员可创建用户" }, { status: 403 });
    }

    const payload = (await request.json()) as CreateUserPayload;
    const email = payload.email?.trim().toLowerCase() ?? "";
    const password = payload.password?.trim() ?? "";
    const name = payload.name?.trim() ?? "";
    const department = payload.department?.trim() ?? "";
    const role = payload.role ?? "viewer";
    const status = payload.status ?? "active";

    if (!email || !password) {
      return NextResponse.json({ error: "邮箱和初始密码不能为空" }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ error: "初始密码至少 6 位" }, { status: 400 });
    }
    if (!roleOptions.has(role)) {
      return NextResponse.json({ error: "角色不合法" }, { status: 400 });
    }
    if (!statusOptions.has(status)) {
      return NextResponse.json({ error: "状态不合法" }, { status: 400 });
    }

    const adminClient = createSupabaseServiceRoleClient();
    const { data: createdAuthUser, error: createAuthError } = await adminClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { name, department },
    });

    if (createAuthError || !createdAuthUser.user?.id) {
      return NextResponse.json(
        { error: createAuthError?.message ?? "创建认证用户失败" },
        { status: 400 },
      );
    }

    const authUserId = createdAuthUser.user.id;

    const { error: insertProfileError } = await adminClient.from("profiles").insert({
      id: authUserId,
      email,
      name,
      department,
      role,
      status,
    });

    if (insertProfileError) {
      await adminClient.auth.admin.deleteUser(authUserId);
      return NextResponse.json({ error: `创建档案失败：${insertProfileError.message}` }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "创建用户时出现未知错误";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
