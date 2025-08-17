"use server";

import { validateFormData } from "@/lib/form-utils";
import { CreateTaskSchema, Task, UpdateTaskSchema } from "@/lib/validation";
import { revalidatePath } from "next/cache";

// serverActionsの戻り値型を定義
interface ActionResult {
  // ヒント: success/error状態、メッセージ、エラー詳細を含める
  errors?: Record<string, string>;
  message?: string;
  success?: boolean;
}

// 簡易データストア（実際の開発ではDB使用）
let tasks: Task[] = [
  // TODO: サンプルデータを2-3件追加
  // ヒント: id, title, description, priority, statusを含める
  {
    id: "1",
    title: "サンプルタスク1",
    description: "これは最初のサンプルタスクです",
    priority: "medium",
    status: "todo",
  },
];

// タスクの作成server Actions
export async function createTask(
  prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  try {
    // formdataから値を取得
    const rawData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      priority: formData.get("priority") as string,
      status: formData.get("status") as string,
    };
    // CreateTaskSchemaでバリデーション
    const validation = validateFormData(CreateTaskSchema, rawData);

    //Result型を返す
    if (!validation.success) {
      return {
        success: false,
        message: "タスクの作成に失敗しました",
        errors: validation.errors,
      };
    }

    // バリデーション成功時はtasks配列に追加
    const newTask = {
      id: crypto.randomUUID(),
      ...validation.data,
    } as Task;

    tasks.push(newTask);

    // revalidatePath('/tasks')でキャッシュを更新
    revalidatePath("/tasks");

    // ヒント: 成功時とエラー時の適切な戻り値を返す
    return {
      success: true,
      message: "タスクを作成しました",
    };
  } catch {
    // ヒント: 予期しないエラーのハンドリング
    return {
      success: false,
      message: "不明なエラーが発生しました",
    };
  }
}

export async function updateTask(
  id: string,
  prevState: ActionResult,
  formData: FormData
) {
  try {
    const rawData = {
      title: formData.get("title"),
      description: formData.get("description"),
      priority: formData.get("priority"),
      status: formData.get("status"),
    };

    const validation = validateFormData(UpdateTaskSchema, rawData);
    if (!validation.success) {
      return {
        success: false,
        message: "タスクの更新に失敗しました",
        error: validation.errors,
      };
    }

    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      return { message: "タスクが見つかりませんでした" };
    }

    tasks[taskIndex] = {
      ...tasks[taskIndex],
      ...validation.data,
    };

    return {
      success: true,
      message: "タスクの更新に成功しました",
    };
  } catch {
    return {
      success: false,
      message: "タスクの更新に失敗しました",
    };
  }
}

// タスク削除のserver actions
export async function deleteTask(
  prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const id = formData.get("id");
  tasks = tasks.filter((task) => task.id !== id);
  revalidatePath("/tasks");
  return { success: true, message: "タスクを削除しました" };
}

// TODO: タスク一覧取得の関数
export async function getTasks(): Promise<Task[]> {
  // ヒント: 現在のtasks配列を返す
  return tasks;
}
