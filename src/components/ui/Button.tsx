import React from "react";
import Link from "next/link";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", href, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none uppercase tracking-widest text-xs";
    
    const variants = {
      primary: "bg-black text-white hover:bg-gray-800",
      secondary: "bg-blue-600 text-white hover:bg-blue-700",
      outline: "border border-black text-black hover:bg-black hover:text-white",
      ghost: "hover:bg-black/5 text-black",
    };

    const sizes = {
      sm: "px-4 py-2",
      md: "px-6 py-3",
      lg: "px-8 py-4",
    };

    const combinedStyles = cn(baseStyles, variants[variant], sizes[size], className);

    if (href) {
      return (
        <Link href={href} className={combinedStyles}>
          {props.children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={combinedStyles} {...props} />
    );
  }
);

Button.displayName = "Button";
