import React from "react";

type InputFieldProps = {
  type: string;
  label: string;
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
  error?: string;
};

const InputField: React.FC<InputFieldProps> = ({
  type,
  label,
  value,
  setValue,
  placeholder,
  error,
}) => {
  return (
    <div>
      <label className="block font-medium">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
        placeholder={placeholder}
      />
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
};

export default InputField;
