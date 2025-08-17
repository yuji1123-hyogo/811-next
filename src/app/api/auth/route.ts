// 認証用の簡易DBとAPI
import { NextRequest, NextResponse } from "next/server";
import { generateToken, getCurrentUser } from "@/lib/jwt";
import { getCookie } from "@/lib/cookies";

// 簡易ユーザーデータベース（実際の開発ではデータベース使用）
const USERS = [
  { id: "1", email: "test@example.com", password: "password" },
  { id: "2", email: "admin@example.com", password: "admin123" },
];

/**
 * ログイン処理
 * POST /api/auth
 */
export async function POST(request: NextRequest) {
  console.log("📡API AUTH/POST 実行開始");
  try {
    const { email, password } = await request.json();

    // 入力値検証
    if (!email || !password) {
      return NextResponse.json(
        { error: "メールアドレスとパスワードは必須です" },
        { status: 400 }
      );
    }

    // ユーザー認証（実際の開発ではハッシュ化されたパスワードと比較）
    const user = USERS.find(
      (u) => u.email === email && u.password === password
    );

    console.log("☑API AUTH/POST user", user);

    if (!user) {
      // セキュリティ: 具体的な失敗理由は明かさない
      return NextResponse.json(
        { error: "認証に失敗しました" },
        { status: 401 }
      );
    }

    // JWT生成とCookie設定
    const token = await generateToken({
      userId: user.id,
      email: user.email,
    });

    console.log("☑API AUTH/POST token", token);
    // レスポンス作成
    const response = NextResponse.json({
      success: true,
      user: { userId: user.id, email: user.email },
    });

    // cookieにJWTをセット
    response.cookies.set("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60, // 24時間
    });

    console.log("☑API AUTH/POST user", response);

    return response;
  } catch (error) {
    console.log("🙅API AUTH/POSTで例外が発生しました", error);

    return NextResponse.json(
      { error: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
}

/**
 * 現在のユーザー情報取得
 * GET /api/auth
 */
export async function GET() {
  try {
    const token = await getCookie();

    if (!token) {
      return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
    }

    const user = await getCurrentUser(token);

    if (!user) {
      return NextResponse.json(
        { error: "無効なトークンです" },
        { status: 401 }
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Get user error:", error);
    return NextResponse.json(
      { error: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
}

/**
 * ログアウト処理
 * DELETE /api/auth
 */
export async function DELETE() {
  try {
    // JWTはサーバー側で無効化できないため、Cookieを削除

    const response = NextResponse.json({
      success: true,
      message: "ログアウトしました",
    });

    response.cookies.set("token", "", {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 0, // 即座に期限切れにする
    });

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
}
