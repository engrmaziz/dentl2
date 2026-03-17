"use client";

import { useEffect, useRef, useState } from "react";
import { useAppStore } from "@/store";

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const setCursor = useAppStore((s) => s.setCursor);

  useEffect(() => {
    setIsMounted(true);

    // Detect touch device — hide cursor
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId: number;
    // Track scale separately to avoid fragile string manipulation
    let dotScale = 1;
    let ringScale = 1;

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }

    function applyDotTransform() {
      dot!.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px) scale(${dotScale})`;
    }

    function onMouseMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setCursor({ x: mouseX, y: mouseY });
      applyDotTransform();
    }

    function onMouseDown() {
      dotScale = 0.8;
      ringScale = 0.8;
      applyDotTransform();
      ring!.style.transform = `scale(${ringScale})`;
      setCursor({ isClicking: true });
    }

    function onMouseUp() {
      setCursor({ isClicking: false });
    }

    function onMouseEnterInteractive(e: Event) {
      const target = e.currentTarget as HTMLElement;
      const isOnImage = target.tagName === "IMG" || target.matches("[data-cursor='image']");
      setCursor({ isHovering: true, isOnImage });

      ring!.style.width = "56px";
      ring!.style.height = "56px";
      ring!.style.marginLeft = "-28px";
      ring!.style.marginTop = "-28px";
      ring!.style.backgroundColor = isOnImage
        ? "rgba(184,149,106,0.2)"
        : "rgba(184,149,106,0.15)";
      ring!.style.borderColor = "var(--gold)";
      dot!.style.opacity = "0";

      if (isOnImage) {
        ring!.setAttribute("data-text", "View");
      }
    }

    function onMouseLeaveInteractive() {
      setCursor({ isHovering: false, isOnImage: false });

      ring!.style.width = "32px";
      ring!.style.height = "32px";
      ring!.style.marginLeft = "-16px";
      ring!.style.marginTop = "-16px";
      ring!.style.backgroundColor = "transparent";
      ring!.style.borderColor = "var(--gold)";
      dot!.style.opacity = "1";
      ring!.removeAttribute("data-text");
    }

    // RAF loop for ring trailing
    function loop() {
      ringX = lerp(ringX, mouseX, 0.12);
      ringY = lerp(ringY, mouseY, 0.12);
      ring!.style.left = `${ringX}px`;
      ring!.style.top = `${ringY}px`;
      rafId = requestAnimationFrame(loop);
    }

    // Click spring-back
    function springBack() {
      ring!.style.transition =
        "width 0.3s, height 0.3s, margin 0.3s, background-color 0.3s, border-color 0.3s, transform 0.5s cubic-bezier(0.34,1.56,0.64,1)";
      dot!.style.transition =
        "opacity 0.3s, transform 0.5s cubic-bezier(0.34,1.56,0.64,1)";
      setTimeout(() => {
        dotScale = 1;
        ringScale = 1;
        if (ring) ring.style.transform = `scale(1)`;
        if (dot) applyDotTransform();
      }, 50);
    }

    // Attach hover listeners to interactive elements
    function attachListeners() {
      const interactives = document.querySelectorAll<HTMLElement>(
        "a, button, [data-cursor], input, textarea, select, label"
      );
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnterInteractive);
        el.addEventListener("mouseleave", onMouseLeaveInteractive);
      });
      return interactives;
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mouseup", springBack);

    rafId = requestAnimationFrame(loop);
    let interactives = attachListeners();

    // MutationObserver to catch dynamically added elements
    const observer = new MutationObserver(() => {
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterInteractive);
        el.removeEventListener("mouseleave", onMouseLeaveInteractive);
      });
      interactives = attachListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseup", springBack);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterInteractive);
        el.removeEventListener("mouseleave", onMouseLeaveInteractive);
      });
      observer.disconnect();
    };
  }, [setCursor]);

  if (!isMounted) return null;

  return (
    <>
      {/* Outer ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "32px",
          height: "32px",
          marginLeft: "-16px",
          marginTop: "-16px",
          borderRadius: "50%",
          border: "1.5px solid var(--gold)",
          backgroundColor: "transparent",
          pointerEvents: "none",
          zIndex: 9999,
          transition: "width 0.3s, height 0.3s, margin 0.3s, background-color 0.3s",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "10px",
          fontFamily: "var(--font-body)",
          color: "var(--ivory)",
          letterSpacing: "0.05em",
          mixBlendMode: "normal",
        }}
        data-cursor-ring
      />
      {/* Inner dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          backgroundColor: "var(--gold)",
          pointerEvents: "none",
          zIndex: 9999,
          transition: "opacity 0.3s",
        }}
        data-cursor-dot
      />

      <style>{`
        [data-cursor-ring]::after {
          content: attr(data-text);
          font-size: 10px;
          font-family: var(--font-body);
          color: var(--ivory);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
      `}</style>
    </>
  );
}
