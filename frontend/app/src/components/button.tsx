import React from "react";

type ButtonProps = {
  variant?: "orange" | "default";
  className?: string;
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  variant = "default",
  className = "",
  children,
}) => {
  const base =
    "px-6 py-2 rounded-full font-medium transition duration-200";
  const variants = {
    orange:
      "bg-orange-600 hover:bg-orange-700 text-white shadow-md hover:shadow-lg",
    default:
      "bg-gray-800 hover:bg-gray-900 text-white shadow-md hover:shadow-lg",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

export default Button;
