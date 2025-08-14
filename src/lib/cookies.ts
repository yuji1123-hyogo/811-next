// cookie設定の型定義を作成
// httpOnly
// secure
// samesite

import { cookies } from "next/headers";

interface CookieConfig {
  httpOnly: boolean;
  secure: boolean;
  sameSite: "strict" | "lax" | "none";
  maxAge: number;
}

// 開発環境と本番環境で設定を使い分け
export function getCookieConfig(): CookieConfig {
  const isProduction = process.env.Node_ENV === "production";

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "strict" : "lax",
    maxAge: 365 * 24 * 60 * 60,
  };
}

// cookieを取得
// 解答にはセッションクッキーと書かれているが実際は永続クッキー
export async function getCookie(): Promise<string | undefined> {
  return (await cookies()).get("token")?.value;
}

export async function setCookie(token: string): Promise<void> {
  const config = getCookieConfig();
  (await cookies()).set("token", token, config);
}

export async function deleteCookie(): Promise<void> {
  (await cookies()).delete("token");
}
