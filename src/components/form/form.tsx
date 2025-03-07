import { ReactNode } from "react";

interface FormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
}

export default function Form({ onSubmit, children }: FormProps) {
  return (
    <form className="bg-gray-800 w-96 p-6 rounded-lg" onSubmit={onSubmit}>
      {children}
    </form>
  );
}
