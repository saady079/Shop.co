import Link from "next/link";
import React from "react";

type BtnProps = {
  children: React.ReactNode;
  variant?: "dark" | "light";
  onClick?: () => void;
  className?: string;
  href?: string;
  type?: "button" | "submit" | "reset";
};

export default function Button({
  variant = "dark",
  children,
  className,
  onClick,
  href,
  type = "button",
}: BtnProps) {
  const css =
    "inline-flex items-center justify-center w-full sm:w-auto px-8 sm:px-16 py-3 rounded-full transition-colors duration-200 text-base font-light";
  const variants = {
    dark: "bg-black text-white hover:bg-black/80",
    light: "bg-white text-black hover:bg-gray/100 border border-[#0000001A]",
  };

  const classes = `${css} ${variants[variant]} ${className}`;
  if (href) {
    return (
      <Link href={href} onClick={onClick} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <div>
      <button type={type} onClick={onClick} className={classes}>
        {children}
      </button>
    </div>
  );
}
