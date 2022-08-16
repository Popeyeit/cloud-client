import React from "react";

function Input({
  value,
  type = "text",
  name,
  placeholder = "name",
  onChange,
  accept = "",
}) {
  return (
    <input
      accept={accept}
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className="block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
    />
  );
}

export default Input;
