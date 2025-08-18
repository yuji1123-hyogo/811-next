// 分析ダッシュボードページ（Server-Side Rendering）

import ClientInteractiveChart from "@/components/ClientInteractiveChart";
import ServerTaskStats from "@/components/ServerTaskStata";
import { getAnalyticsData } from "@/lib/analytics";

export default async function AnalyticsPage() {
  // TODO: getAnalyticsData()を呼び出してリアルタイムデータを取得
  // ヒント: await getAnalyticsData()
  const analyticsData = await getAnalyticsData();

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">
        分析ダッシュボード
      </h1>

      <div className="space-y-8">
        {/* リアルタイム統計（Server Component） */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            タスク統計（リアルタイム）
          </h2>
          {/* TODO: ServerTaskStatsコンポーネントを配置 */}
          {/* ヒント: stats propsでanalyticsData.statsを渡す */}
          <ServerTaskStats stats={analyticsData.stats} />
        </div>

        {/* インタラクティブチャート（Client Component） */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            パフォーマンスチャート
          </h2>
          {/* TODO: ClientInteractiveChartコンポーネントを配置 */}
          {/* ヒント: initialData propsでanalyticsData.chartDataを渡す */}
          <ClientInteractiveChart initialData={analyticsData.chartData} />
        </div>

        {/* システム情報表示 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            システム情報
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {/* TODO: analyticsData.systemInfo.uptime表示 */}
                {analyticsData.systemInfo.uptime}
              </div>
              <div className="text-sm text-gray-600">稼働時間(時間)</div>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {/* TODO: analyticsData.systemInfo.activeUsers表示 */}
                {analyticsData.systemInfo.activeUsers}
              </div>
              <div className="text-sm text-gray-600">アクティブユーザー</div>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {/* TODO: analyticsData.systemInfo.totalRequests表示 */}
                {analyticsData.systemInfo.totalRequests}
              </div>
              <div className="text-sm text-gray-600">総リクエスト数</div>
            </div>

            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {/* TODO: analyticsData.systemInfo.avgResponseTime表示 */}
                {analyticsData.systemInfo.avgResponseTime}ms
              </div>
              <div className="text-sm text-gray-600">平均レスポンス時間</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// TODO: 動的レンダリングを強制する設定を追加
// ヒント: export const dynamic = '設定値';
export const dynamic = "force-dynamic";
