import React from "react";
import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  link?: boolean;
  href?: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
};

export default function Button({
  children,
  type = "button",
  link = false,
  href = "#",
  className = "",
  disabled = false,
  onClick,
}: ButtonProps) {
  const styles = `flex items-center cursor-pointer outline-none text-green-800 font-semibold justify-center gap-1 rounded-lg bg-green-50 px-2 py-1 transition select-none hover:opacity-90 active:scale-95 ${className}`;

  if (link) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={styles}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
