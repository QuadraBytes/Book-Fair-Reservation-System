import React from "react";

type ButtonProps = {
  variant?: "orange" | "default" | "white";
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  variant = "default",
  className = "",
  children,
  onClick,
  disabled = false,
}) => {
  const base =
    "px-6 py-2 rounded-full font-medium transition duration-200";

  const variants: Record<string, string> = {
    orange:
      "bg-orange-600 hover:bg-orange-700 text-white shadow-md hover:shadow-lg",
    default:
      "bg-gray-800 hover:bg-gray-900 text-white shadow-md hover:shadow-lg",
    white:
      "bg-white text-gray-900 border border-gray-200 hover:bg-gray-100 shadow-md hover:shadow-lg", // ✅ new white variant
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
