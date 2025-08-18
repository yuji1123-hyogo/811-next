// ローディングスピナーコンポーネント（完全実装）

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: "blue" | "gray" | "white";
  text?: string;
}

export default function LoadingSpinner({
  size = "md",
  color = "blue",
  text = "Loading...",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const colorClasses = {
    blue: "border-blue-600",
    gray: "border-gray-600",
    white: "border-white",
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <div
        className={`${sizeClasses[size]} ${colorClasses[color]} border-2 border-solid border-t-transparent rounded-full animate-spin`}
      />
      {text && <span className="text-sm text-gray-600">{text}</span>}
    </div>
  );
}
