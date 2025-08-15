import { ZodSchema, ZodError } from "zod";

// フォームデータのバリデーション
// zodにはフォーム送信時に自動でバリデーションを行う仕組みは備わっていない。
// フォームライブラリを採用しない場合はバリデーションを実行するための関数を自力で定義する必要がある。
export function validateFormData<T>(schema: ZodSchema<T>, data: unknown) {
  // ZodSchema<X>はスキーマX自身の型
  // ジェネリクス<T>を利用し関数の呼び出し時に動的に型を決定
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  } else {
    return {
      success: false,
      errors: formatZodErrors(result.error),
    };
  }
}

// ZodErrorをフィールド別エラーに変換
// {
//    name: "xxxがxxxです",
//    email: "xxxがxxxです"
// }
// のような形式に変換

export function formatZodErrors(error: ZodError): Record<string, string> {
  // zodで最も扱いやすいエラー形式を提供するerror.flatten()を基に独自のエラーオブジェクトを作成する。
  const fieldErrors = error.flatten().fieldErrors;
  const formatted: Record<string, string> = {};

  for (const [field, messages] of Object.entries(fieldErrors)) {
    // オブジェクトのキーバリューを繰り返し扱いたいときに有効なパターン
    // const [key, value] of Object.entries(object){ xxx }
    formatted[field] = messages?.[0] || "入力エラーがあります";
  }

  return formatted;
}

// 型安全なデバウンス関数
export function debounce<T extends (...args: Parameters<T>) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}
