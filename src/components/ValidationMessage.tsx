interface ValidationMessageProps {
  error?: string;
  type?: "error" | "warning" | "success";
}

export default function ValidationMessage({
  error,
  type = "error",
}: ValidationMessageProps) {
  if (!error) return null;

  const styles = {
    error: "text-red-600 bg-red-50 border-red-200",
    warning: "text-yellow-600 bg-yellow-50 border-yellow-200",
    success: "text-green-600 bg-green-50 border-green-200",
  };

  return (
    <div className={`mt-1 p-2 text-sm border rounded-md ${styles[type]}`}>
      {error}
    </div>
  );
}
