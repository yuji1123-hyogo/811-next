"use client";

import { loginAction, LoginResult } from "@/app/actions/auth-actions";
import { useActionState } from "react";

/**
 * ログインフォームコンポーネント
 * useActionStateを使った非同期処理
 */
export default function LoginForm() {
  // useActionStateを使うことでエラー状態、ローディング状態の管理が楽になる。
  // stateはサーバーから返される送信結果
  // useActionState<stateの型,FormData型>
  // useActionState(アクション関数, initialState)
  const [state, formAction, pending] = useActionState<LoginResult, FormData>(
    loginAction,
    { error: undefined, success: false }
  );

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            アカウントにログイン
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            テスト用：test@example.com / password
          </p>
        </div>
        <form className="mt-8 space-y-6" action={formAction}>
          <div className="space-y-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              メールアドレス
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              placeholder="メールアドレス"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="password"></label>
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="パスワード"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          {state.error && <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md ">{state.error}</div>}
          <button
            type="submit"
            disabled={pending}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {pending ? "ログイン中..." : "ログイン"}
          </button>
        </form>
      </div>
    </div>
  );
}
