import { getTasks } from "@/app/actions/task-actions";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";

export default async function TasksPage() {
    // サーバーコンポーネントのデータフェッチでは通常例外処理をおこなわない
    // error.tsxにゆだねる
  const tasks = await getTasks();

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">タスク管理</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            新しいタスク
          </h2>
          <TaskForm />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            タスク一覧
          </h2>
          <TaskList tasks={tasks} />
        </div>
      </div>
    </div>
  );
}
