import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void;
};

export default function Button({
  children,
  type = "button",
  className = "",
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex items-center justify-center gap-1 rounded-lg bg-green-50 px-2 py-1 transition select-none hover:opacity-95 active:scale-95 ${className}`}
    >
      {children}
    </button>
  );
}
