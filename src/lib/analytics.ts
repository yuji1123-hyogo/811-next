// 分析データ取得ユーティリティ

export interface AnalyticsData {
  stats: {
    total: number;
    completed: number;
    inProgress: number;
    pending: number;
  };
  chartData: Array<{
    date: string;
    completed: number;
    created: number;
  }>;
  systemInfo: {
    uptime: number;
    activeUsers: number;
    totalRequests: number;
    avgResponseTime: number;
  };
}

export async function getAnalyticsData(): Promise<AnalyticsData> {
  // 模擬的な遅延を追加（リアルなAPI呼び出しをシミュレート）
  await new Promise((resolve) => setTimeout(resolve, 100));

  // リアルタイム感のあるデータを生成
  const baseTotal = 50;
  const randomVariation = Math.floor(Math.random() * 20) - 10;
  const total = baseTotal + randomVariation;
  const completed = Math.floor(total * (0.6 + Math.random() * 0.3));
  const inProgress = Math.floor((total - completed) * 0.7);
  const pending = total - completed - inProgress;

  // 過去7日分のチャートデータを生成
  const chartData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));

    return {
      date: date.toISOString().split("T")[0],
      completed: Math.floor(Math.random() * 15) + 5,
      created: Math.floor(Math.random() * 12) + 3,
    };
  });

  return {
    stats: {
      total,
      completed,
      inProgress,
      pending,
    },
    chartData,
    systemInfo: {
      uptime: Math.floor(Math.random() * 720) + 48, // 48-768時間
      activeUsers: Math.floor(Math.random() * 150) + 50, // 50-200人
      totalRequests: Math.floor(Math.random() * 50000) + 10000, // 10k-60k
      avgResponseTime: Math.floor(Math.random() * 200) + 50, // 50-250ms
    },
  };
}
