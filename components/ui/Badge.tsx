"use client";

import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "gold" | "ink" | "ivory" | "mist" | "error" | "success";
  size?: "sm" | "md";
  className?: string;
  style?: React.CSSProperties;
}

export default function Badge({ children, variant = "gold", size = "sm", className = "", style }: BadgeProps) {
  const colors: Record<string, string> = {
    gold:    "background-color: rgba(184,149,106,0.15); color: var(--gold); border: 1px solid rgba(184,149,106,0.3);",
    ink:     "background-color: var(--ink); color: var(--ivory);",
    ivory:   "background-color: var(--ivory); color: var(--ink);",
    mist:    "background-color: var(--mist); color: var(--charcoal);",
    error:   "background-color: rgba(192,57,43,0.1); color: var(--error); border: 1px solid rgba(192,57,43,0.3);",
    success: "background-color: rgba(45,106,79,0.1); color: var(--success); border: 1px solid rgba(45,106,79,0.3);",
  };
  const padding = size === "sm" ? "0.2rem 0.6rem" : "0.35rem 0.9rem";
  const fontSize = size === "sm" ? "var(--text-xs)" : "var(--text-sm)";

  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding,
        fontSize,
        fontFamily: "var(--font-body)",
        fontWeight: 500,
        letterSpacing: "0.06em",
        borderRadius: "100px",
        whiteSpace: "nowrap",
        ...(Object.fromEntries(
          colors[variant].split(";").filter(Boolean).map((s) => {
            const [k, v] = s.split(":").map((x) => x.trim());
            const camel = k.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
            return [camel, v];
          })
        ) as React.CSSProperties),
        ...style,
      }}
    >
      {children}
    </span>
  );
}
