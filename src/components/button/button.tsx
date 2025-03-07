interface ButtonProps {
  type: "submit" | "reset" | "button" | undefined;
  content: string;
}

export function Button({ content, type }: ButtonProps) {
  return (
    <button
      type={type}
      className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
    >
      {content}
    </button>
  );
}
