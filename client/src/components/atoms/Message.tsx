type MessageProps = {
  text: string;
  type?: "error" | "success" | "warning";
  className?: string;
};

const Message = ({ text, type = "success", className }: MessageProps) => {
  const typeStyles = {
    error: "text-red-600",
    success: "text-green-600",
    warning: "text-yellow-600",
  };

  return (
    <p className={`font-medium text-sm ${typeStyles[type]} ${className}`}>
      {text}
    </p>
  );
};

export default Message;
