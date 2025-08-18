// Client Component - インタラクティブチャート
"use client"; // 【重要】Client Componentの宣言

import { useState } from "react";

interface ChartData {
  date: string;
  completed: number;
  created: number;
}

interface ClientInteractiveChartProps {
  initialData: ChartData[];
}

export default function ClientInteractiveChart({
  initialData,
}: ClientInteractiveChartProps) {
  // 【重要】Client Componentでのみ使用可能な状態管理
  const [selectedPeriod, setSelectedPeriod] = useState<
    "week" | "month" | "year"
  >("week");
  const [chartData, setChartData] = useState<ChartData[]>(initialData);

  // 期間変更ハンドラー（インタラクション処理）
  const handlePeriodChange = (period: "week" | "month" | "year") => {
    setSelectedPeriod(period);

    // 期間に応じてデータをフィルタリング（簡易実装）
    let filteredData = initialData;
    if (period === "month") {
      filteredData = initialData.slice(0, 30);
    } else if (period === "year") {
      filteredData = initialData.slice(0, 365);
    }

    setChartData(filteredData);
  };

  // 最大値を計算してチャートの高さ基準にする
  const maxValue = Math.max(
    ...chartData.map((d) => Math.max(d.completed, d.created))
  );

  return (
    <div className="space-y-4">
      {/* 期間選択ボタン */}
      <div className="flex gap-2">
        {["week", "month", "year"].map((period) => (
          <button
            key={period}
            onClick={() =>
              handlePeriodChange(period as "week" | "month" | "year")
            }
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedPeriod === period
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {period === "week" ? "週" : period === "month" ? "月" : "年"}
          </button>
        ))}
      </div>

      {/* 簡易チャート表示 */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-end justify-between h-48 gap-2">
          {chartData.slice(0, 7).map((data, index) => (
            <div
              key={index}
              className="flex-1 flex flex-col items-center gap-1"
            >
              {/* 完了タスクバー */}
              <div
                className="w-full bg-green-500 rounded-t-sm transition-all duration-300"
                style={{
                  height: `${
                    maxValue > 0 ? (data.completed / maxValue) * 180 : 0
                  }px`,
                }}
                title={`完了: ${data.completed}`}
              />

              {/* 作成タスクバー */}
              <div
                className="w-full bg-blue-500 rounded-b-sm transition-all duration-300"
                style={{
                  height: `${
                    maxValue > 0 ? (data.created / maxValue) * 180 : 0
                  }px`,
                }}
                title={`作成: ${data.created}`}
              />

              {/* 日付ラベル */}
              <div className="text-xs text-gray-600 mt-2">
                {new Date(data.date).toLocaleDateString("ja-JP", {
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </div>
          ))}
        </div>

        {/* 凡例 */}
        <div className="flex justify-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-sm text-gray-600">完了タスク</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-sm text-gray-600">作成タスク</span>
          </div>
        </div>
      </div>
    </div>
  );
}
