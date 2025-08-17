"use client";

import { useActionState } from "react";
import { deleteTask } from "@/app/actions/task-actions";
import { type Task } from "@/lib/validation";

interface TaskListProps {
  tasks: Task[];
}

export default function TaskList({ tasks }: TaskListProps) {
  const [, deleteAction, isPending] = useActionState(deleteTask, {});

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "todo":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center py-8">タスクがありません</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white p-4 rounded-lg shadow-md border"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-lg text-gray-900">
                {task.title}
              </h3>

              <form action={deleteAction}>
                <input type="hidden" name="id" value={task.id} />
                <button
                  type="submit"
                  disabled={isPending}
                  className="text-red-600 hover:text-red-800 disabled:opacity-50"
                >
                  削除
                </button>
              </form>
            </div>

            {task.description && (
              <p className="text-gray-600 mb-3">{task.description}</p>
            )}

            <div className="flex gap-2 text-sm">
              <span
                className={`px-2 py-1 rounded-full ${getPriorityColor(
                  task.priority
                )}`}
              >
                優先度:{" "}
                {task.priority === "high"
                  ? "高"
                  : task.priority === "medium"
                  ? "中"
                  : "低"}
              </span>

              <span
                className={`px-2 py-1 rounded-full ${getStatusColor(
                  task.status
                )}`}
              >
                {task.status === "todo"
                  ? "未着手"
                  : task.status === "in-progress"
                  ? "進行中"
                  : "完了"}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
