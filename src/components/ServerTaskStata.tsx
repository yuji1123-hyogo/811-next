// Server Component - タスク統計表示
// ヒント: このファイルには"use client"を記述しない（Server Component）

interface TaskStats {
  total: number;
  completed: number;
  inProgress: number;
  pending: number;
}

interface ServerTaskStatsProps {
  stats: TaskStats;
}

export default function ServerTaskStats({ stats }: ServerTaskStatsProps) {
  // TODO: 完了率を計算する
  // ヒント: Math.round((stats.completed / stats.total) * 100)
  const completionRate = Math.round((stats.completed / stats.total) * 100);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* 総タスク数 */}
      <div className="text-center p-4 bg-gray-50 rounded-lg">
        <div className="text-3xl font-bold text-gray-800">
          {/* TODO: stats.totalを表示 */}
          {stats.total}
        </div>
        <div className="text-sm text-gray-600 mt-1">総タスク数</div>
      </div>

      {/* 完了タスク数 */}
      <div className="text-center p-4 bg-green-50 rounded-lg">
        <div className="text-3xl font-bold text-green-600">
          {/* TODO: stats.completedを表示 */}
          {stats.completed}
        </div>
        <div className="text-sm text-gray-600 mt-1">完了</div>
      </div>

      {/* 進行中タスク数 */}
      <div className="text-center p-4 bg-blue-50 rounded-lg">
        <div className="text-3xl font-bold text-blue-600">
          {/* TODO: stats.inProgressを表示 */}
          {stats.inProgress}
        </div>
        <div className="text-sm text-gray-600 mt-1">進行中</div>
      </div>

      {/* 未着手タスク数 */}
      <div className="text-center p-4 bg-yellow-50 rounded-lg">
        <div className="text-3xl font-bold text-yellow-600">
          {/* TODO: stats.pendingを表示 */}
          {stats.pending}
        </div>
        <div className="text-sm text-gray-600 mt-1">未着手</div>
      </div>

      {/* 完了率（全体表示） */}
      <div className="col-span-1 md:col-span-4 mt-4">
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">完了率</span>
            <span className="text-sm font-medium text-gray-900">
              {/* TODO: 計算した完了率を表示 */}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{
                // TODO: 完了率をwidthに設定
                // ヒント: width: `${完了率}%`
                width: `${completionRate}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
