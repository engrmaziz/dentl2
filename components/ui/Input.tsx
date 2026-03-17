"use client";

import React, { useId, useState, useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: string;
  error?: string;
  helperText?: string;
  size?: "md" | "lg";
}

export default function Input({
  label,
  error,
  helperText,
  size = "md",
  className = "",
  style,
  value,
  defaultValue,
  onChange,
  onFocus,
  onBlur,
  ...props
}: InputProps) {
  const id = useId();
  const [filled, setFilled] = useState(
    !!(value !== undefined ? value : defaultValue)
  );
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value !== undefined) {
      setFilled(String(value).length > 0);
    }
  }, [value]);

  const shakeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (error && shakeRef.current) {
      gsap.fromTo(
        shakeRef.current,
        { x: 0 },
        {
          x: [-6, 6, -4, 4, -2, 2, 0],
          duration: 0.4,
          ease: "power2.inOut",
        }
      );
    }
  }, [error]);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    setFilled(e.target.value.length > 0);
    onBlur?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilled(e.target.value.length > 0);
    onChange?.(e);
  };

  const isFloated = filled || focused;

  return (
    <div
      ref={shakeRef}
      className={className}
      style={{ position: "relative", marginBottom: error ? "0.25rem" : "0", ...style }}
    >
      <label
        htmlFor={id}
        style={{
          position: "absolute",
          left: 0,
          top: isFloated ? "-1.1rem" : size === "lg" ? "1.1rem" : "0.9rem",
          fontSize: isFloated ? "var(--text-xs)" : size === "lg" ? "var(--text-base)" : "var(--text-sm)",
          color: error ? "var(--error)" : focused ? "var(--gold)" : "rgba(247,243,238,0.5)",
          pointerEvents: "none",
          transition: "all 0.2s var(--ease-smooth)",
          fontFamily: "var(--font-body)",
          letterSpacing: isFloated ? "0.08em" : "0.04em",
          fontWeight: isFloated ? 500 : 400,
        }}
      >
        {label}
      </label>
      <input
        ref={inputRef}
        id={id}
        value={value}
        defaultValue={defaultValue}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        style={{
          width: "100%",
          background: "transparent",
          border: "none",
          borderBottom: `1.5px solid ${
            error ? "var(--error)" : focused ? "var(--gold)" : "rgba(247,243,238,0.2)"
          }`,
          color: "var(--ivory)",
          fontFamily: "var(--font-body)",
          fontSize: size === "lg" ? "var(--text-base)" : "var(--text-sm)",
          padding: size === "lg" ? "0.9rem 0 0.5rem" : "0.75rem 0 0.4rem",
          outline: "none",
          transition: "border-color 0.25s",
        }}
        {...props}
      />
      {/* Gold underline slide animation */}
      <span
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "1.5px",
          width: "100%",
          backgroundColor: "var(--gold)",
          transform: focused ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 0.3s var(--ease-snap)",
          pointerEvents: "none",
        }}
      />
      {error && (
        <p
          style={{
            fontSize: "var(--text-xs)",
            color: "var(--error)",
            fontFamily: "var(--font-body)",
            marginTop: "0.3rem",
            animation: "fadeDown 0.2s ease forwards",
          }}
        >
          {error}
        </p>
      )}
      {helperText && !error && (
        <p
          style={{
            fontSize: "var(--text-xs)",
            color: "rgba(247,243,238,0.4)",
            fontFamily: "var(--font-body)",
            marginTop: "0.3rem",
          }}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}
