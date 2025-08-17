"use client";

import { useActionState } from "react";
import { createTask } from "@/app/actions/task-actions";
import ValidationMessage from "./ValidationMessage";

export default function TaskForm() {
  const [state, formAction, pending] = useActionState(createTask, {});

  return (
    <form
      action={formAction}
      className="space-y-4 bg-white p-6 rounded-lg shadow-md"
    >
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          タイトル *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="タスクのタイトルを入力"
        />
        <ValidationMessage error={state.errors?.title} />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          説明
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="タスクの詳細説明（任意）"
        />
        <ValidationMessage error={state.errors?.description} />
      </div>

      <div>
        <label
          htmlFor="priority"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          優先度 *
        </label>
        <select
          id="priority"
          name="priority"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">選択してください</option>
          <option value="low">低</option>
          <option value="medium">中</option>
          <option value="high">高</option>
        </select>
        <ValidationMessage error={state.errors?.priority} />
      </div>

      <div>
        <label
          htmlFor="status"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          ステータス *
        </label>
        <select
          id="status"
          name="status"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">選択してください</option>
          <option value="todo">未着手</option>
          <option value="in-progress">進行中</option>
          <option value="completed">完了</option>
        </select>
        <ValidationMessage error={state.errors?.status} />
      </div>

      {state.message && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
          {state.message}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {pending ? "作成中..." : "タスクを作成"}
      </button>
    </form>
  );
}
