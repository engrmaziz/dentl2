"use client";

import React, { useRef, useEffect } from "react";
import { magneticHover } from "@/lib/animations";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  as?: "button" | "a";
  href?: string;
  magnetic?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  iconRight,
  magnetic = true,
  children,
  className = "",
  as: Tag = "button",
  href,
  style,
  ...props
}: ButtonProps) {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null);

  useEffect(() => {
    if (!magnetic || !ref.current) return;
    return magneticHover(ref.current, 0.3);
  }, [magnetic]);

  const sizes: Record<string, string> = {
    sm: "padding: 0.55rem 1.2rem; font-size: var(--text-xs);",
    md: "padding: 0.85rem 1.8rem; font-size: var(--text-xs);",
    lg: "padding: 1.05rem 2.4rem; font-size: var(--text-sm);",
  };

  const variants: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: "var(--gold)",
      color: "var(--ink)",
      border: "none",
      fontWeight: 600,
    },
    secondary: {
      backgroundColor: "transparent",
      color: "var(--ivory)",
      border: "1.5px solid rgba(247,243,238,0.35)",
      fontWeight: 500,
    },
    ghost: {
      backgroundColor: "transparent",
      color: "var(--gold)",
      border: "none",
      fontWeight: 500,
    },
  };

  const sizeCSS: Record<string, React.CSSProperties> = {
    sm: { padding: "0.55rem 1.2rem", fontSize: "var(--text-xs)" },
    md: { padding: "0.85rem 1.8rem", fontSize: "var(--text-xs)" },
    lg: { padding: "1.05rem 2.4rem", fontSize: "var(--text-sm)" },
  };

  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    borderRadius: "2px",
    fontFamily: "var(--font-body)",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    cursor: loading ? "wait" : "pointer",
    transition: "transform 0.2s, box-shadow 0.2s, background-color 0.2s, color 0.2s",
    position: "relative",
    overflow: "hidden",
    textDecoration: "none",
    opacity: loading ? 0.7 : 1,
    ...variants[variant],
    ...sizeCSS[size],
    ...style,
  };

  const shimmer = (
    <span
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 2s linear infinite",
        pointerEvents: "none",
      }}
    />
  );

  sizes[size]; // consume to avoid lint warning

  if (Tag === "a") {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        style={baseStyle}
        className={className}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {shimmer}
        {icon && <span style={{ display: "flex" }}>{icon}</span>}
        {loading ? (
          <span
            style={{
              width: "1em",
              height: "1em",
              border: "2px solid currentColor",
              borderTopColor: "transparent",
              borderRadius: "50%",
              animation: "spin 0.7s linear infinite",
              display: "inline-block",
            }}
          />
        ) : (
          children
        )}
        {iconRight && <span style={{ display: "flex" }}>{iconRight}</span>}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      style={baseStyle}
      className={className}
      disabled={loading || props.disabled}
      {...props}
    >
      {shimmer}
      {icon && <span style={{ display: "flex" }}>{icon}</span>}
      {loading ? (
        <span
          style={{
            width: "1em",
            height: "1em",
            border: "2px solid currentColor",
            borderTopColor: "transparent",
            borderRadius: "50%",
            animation: "spin 0.7s linear infinite",
            display: "inline-block",
          }}
        />
      ) : (
        children
      )}
      {iconRight && <span style={{ display: "flex" }}>{iconRight}</span>}
    </button>
  );
}
