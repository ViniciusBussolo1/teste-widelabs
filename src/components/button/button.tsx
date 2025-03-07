interface ButtonProps {
  type: "submit" | "reset" | "button" | undefined;
  content: string;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

export function Button({
  content,
  type,
  className,
  onClick,
  disabled,
}: ButtonProps) {
  const baseClasses =
    "p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer";

  return (
    <button
      type={type}
      className={`${baseClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
}
