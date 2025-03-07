interface InputProps {
  type: string;
  name: string;
  value: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  name,
  value,
  onChange,
  type,
  placeholder,
}: InputProps) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-2 mb-4 text-white placeholder-gray-500 rounded-md 
      focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}
