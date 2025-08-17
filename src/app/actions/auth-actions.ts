"use server";

import { redirect } from "next/navigation";

export interface LoginResult {
  error?: string;
  success?: boolean;
}

export async function loginAction(
  prevState: LoginResult,
  formData: FormData
): Promise<LoginResult> {
  console.log("📡 serverActions:loginAction呼び出し");
  try {
    // サーバーアクションでは型アサーションでフォームデータの各入力の型を定義する
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return { error: "メールアドレスとパスワードは必須です" };
    }

    // api routesは相対パスで呼び出せる
    const response = await fetch("http://localhost:3000/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    console.log("☑auth-actions/loginActions response", response);

    if (response.ok) {
      console.log("☑auth-actions/loginActions response.ok", response.ok);
    } else {
      const responseData = await response.json();
      return {
        error: responseData.error || "ログインに失敗しました",
        success: false,
      };
    }
  } catch {
    console.log("🙅ネットワークエラーが発生");
    return { error: "ネットワークエラーが発生しました", success: false };
  }

  redirect("/tasks");
}
