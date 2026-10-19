import React from "react";

type BtnProps = {
  children: React.ReactNode;
  variant?: "dark" | "light";
  onClick?: () => void;
  className?: string;
};

export default function Button({
  variant = "dark",
  children,
  className,
}: BtnProps) {
  const css =
    "px-16 py-3 rounded-full transition-colors duration-200 text-base font-light";
  const variants = {
    dark: "bg-black text-white hover:bg-black/80",
    light: "bg-white text-black hover:bg-gray/100 border border-[#0000001A]",
  };
  return (
    <div>
      <button className={`${css} ${variants[variant]} ${className}`}>
        {children}
      </button>
    </div>
  );
}
