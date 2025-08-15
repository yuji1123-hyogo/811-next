import z from "zod";

// タスクの基本バリデーションスキーマ
export const TaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high"], {
    errorMap: () => ({ message: "優先度を選択してください" }),
  }),
  status: z.enum(["todo", "in-progress", "completes"], {
    errorMap: () => ({ message: "ステータスを選択してください" }),
  }),
});

// 作成用スキーマ
export const CreateTaskSchema = TaskSchema.omit({ id: true });

// 更新用スキーマ
// 全てのフィールドがオプショナル。idだけ必須。
export const UpdateTaskSchema = TaskSchema.partial().extend({
  id: z.string(),
});

// TypeScript型の生成
export type Task = z.infer<typeof TaskSchema>;
export type CreateTaskInput = z.infer<typeof CreateTaskSchema>;
export type UpdateTaskInput = z.infer<typeof UpdateTaskSchema>;
