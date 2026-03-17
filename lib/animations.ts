"use client";

import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerGSAP } from "./gsap";

// ─── Register plugins on import ───────────────────────────────────────────────
if (typeof window !== "undefined") {
  registerGSAP();
}

// ─── Animation Preset Types ──────────────────────────────────────────────────
export interface TweenVars {
  opacity?: number;
  y?: number;
  x?: number;
  scale?: number;
  filter?: string;
  duration?: number;
  ease?: string;
  stagger?: number | { each: number; from?: number | "start" | "center" | "end" | "edges" | "random" | [number, number] };
  delay?: number;
  transformOrigin?: string;
  scaleX?: number;
  [key: string]: unknown;
}

// ─── Animation Presets ────────────────────────────────────────────────────────
export const presets = {
  fadeUp: {
    from: { y: 60, opacity: 0 },
    to:   { y: 0,  opacity: 1, duration: 0.9, ease: "ease.smooth" },
  },
  fadeIn: {
    from: { opacity: 0 },
    to:   { opacity: 1, duration: 0.6, ease: "ease.smooth" },
  },
  scaleIn: {
    from: { scale: 0.85, opacity: 0 },
    to:   { scale: 1,    opacity: 1, duration: 0.7, ease: "ease.snap" },
  },
  slideLeft: {
    from: { x: 80, opacity: 0 },
    to:   { x: 0,  opacity: 1, duration: 0.8, ease: "ease.smooth" },
  },
  slideRight: {
    from: { x: -80, opacity: 0 },
    to:   { x: 0,   opacity: 1, duration: 0.8, ease: "ease.smooth" },
  },
  blurIn: {
    from: { filter: "blur(12px)", opacity: 0 },
    to:   { filter: "blur(0px)", opacity: 1, duration: 1.0, ease: "ease.smooth" },
  },
} as const;

// ─── Text Animation Utilities ─────────────────────────────────────────────────
function splitIntoChars(element: HTMLElement): HTMLElement[] {
  const text = element.textContent || "";
  element.textContent = "";
  element.setAttribute("aria-label", text);
  return Array.from(text).map((char) => {
    const span = document.createElement("span");
    span.textContent = char === " " ? "\u00A0" : char;
    span.style.display = "inline-block";
    span.setAttribute("aria-hidden", "true");
    element.appendChild(span);
    return span;
  });
}

function splitIntoWords(element: HTMLElement): HTMLElement[] {
  const text = element.textContent || "";
  element.textContent = "";
  element.setAttribute("aria-label", text);
  return text.split(/\s+/).filter(Boolean).map((word, i, arr) => {
    const wrapper = document.createElement("span");
    wrapper.style.display = "inline-block";
    wrapper.style.overflow = "hidden";
    wrapper.style.verticalAlign = "bottom";
    const inner = document.createElement("span");
    inner.textContent = word + (i < arr.length - 1 ? "\u00A0" : "");
    inner.style.display = "inline-block";
    inner.setAttribute("aria-hidden", "true");
    wrapper.appendChild(inner);
    element.appendChild(wrapper);
    return inner;
  });
}

export function letterReveal(
  element: HTMLElement,
  vars: TweenVars = {}
): gsap.core.Tween {
  const chars = splitIntoChars(element);
  return gsap.from(chars, {
    opacity: 0,
    y: 20,
    duration: 0.04,
    stagger: { each: 0.04, from: "start" as const },
    ease: "ease.smooth",
    ...vars,
  });
}

export function wordReveal(
  element: HTMLElement,
  vars: TweenVars = {}
): gsap.core.Tween {
  const words = splitIntoWords(element);
  return gsap.from(words, {
    yPercent: 110,
    opacity: 0,
    duration: 0.7,
    stagger: { each: 0.1, from: "start" as const },
    ease: "ease.snap",
    ...vars,
  });
}

export function lineReveal(
  elements: HTMLElement | HTMLElement[],
  vars: TweenVars = {}
): gsap.core.Tween {
  const els = Array.isArray(elements) ? elements : [elements];
  return gsap.from(els, {
    scaleX: 0,
    transformOrigin: "left center",
    duration: 0.9,
    stagger: 0.12,
    ease: "ease.smooth",
    ...vars,
  });
}

export function countUp(
  element: HTMLElement,
  target: number,
  options: { duration?: number; prefix?: string; suffix?: string } = {}
): gsap.core.Tween {
  const { duration = 2, prefix = "", suffix = "" } = options;
  const obj = { value: 0 };
  return gsap.to(obj, {
    value: target,
    duration,
    ease: "power2.out",
    onUpdate() {
      element.textContent =
        prefix + new Intl.NumberFormat("en-US").format(Math.round(obj.value)) + suffix;
    },
  });
}

// ─── Magnetic Hover Effect ─────────────────────────────────────────────────────
export function magneticHover(element: HTMLElement, strength = 0.35): () => void {
  function onMouseMove(e: MouseEvent) {
    const rect = element.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * strength;
    const dy = (e.clientY - cy) * strength;
    gsap.to(element, { x: dx, y: dy, duration: 0.4, ease: "power3.out" });
  }
  function onMouseLeave() {
    gsap.to(element, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
  }
  element.addEventListener("mousemove", onMouseMove);
  element.addEventListener("mouseleave", onMouseLeave);
  return () => {
    element.removeEventListener("mousemove", onMouseMove);
    element.removeEventListener("mouseleave", onMouseLeave);
  };
}

// ─── 3D Tilt Card ─────────────────────────────────────────────────────────────
export function tiltCard(element: HTMLElement, intensity = 15): () => void {
  function onMouseMove(e: MouseEvent) {
    const rect = element.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotX = (y - 0.5) * -intensity;
    const rotY = (x - 0.5) * intensity;
    gsap.to(element, {
      rotationX: rotX,
      rotationY: rotY,
      transformPerspective: 800,
      duration: 0.4,
      ease: "power2.out",
    });
  }
  function onMouseLeave() {
    gsap.to(element, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    });
  }
  element.addEventListener("mousemove", onMouseMove);
  element.addEventListener("mouseleave", onMouseLeave);
  return () => {
    element.removeEventListener("mousemove", onMouseMove);
    element.removeEventListener("mouseleave", onMouseLeave);
  };
}

// ─── Parallax Y ───────────────────────────────────────────────────────────────
export function parallaxY(
  element: HTMLElement,
  speed = 0.5,
  trigger?: string | HTMLElement
): ScrollTrigger {
  return ScrollTrigger.create({
    trigger: trigger || element,
    start: "top bottom",
    end: "bottom top",
    scrub: true,
    onUpdate(self) {
      gsap.set(element, { y: self.progress * 100 * speed });
    },
  });
}

// ─── ScrollTrigger Helpers ────────────────────────────────────────────────────
export function revealOnScroll(
  selector: string | HTMLElement | HTMLElement[],
  preset: keyof typeof presets = "fadeUp",
  stagger = 0.12
): gsap.core.Tween | gsap.core.Timeline {
  const p = presets[preset];
  return gsap.fromTo(
    selector,
    { ...p.from },
    {
      ...p.to,
      stagger,
      scrollTrigger: {
        trigger:
          typeof selector === "string"
            ? selector
            : Array.isArray(selector)
            ? selector[0]
            : selector,
        start: "top 88%",
        toggleActions: "play none none reverse",
      },
    }
  );
}

export function pinSection(
  trigger: string | HTMLElement,
  start = "top top",
  end = "+=100%"
): ScrollTrigger {
  return ScrollTrigger.create({ trigger, start, end, pin: true, pinSpacing: true });
}

export function horizontalScroll(
  wrapper: HTMLElement,
  items: HTMLElement
): ScrollTrigger {
  const totalWidth = items.scrollWidth;
  const viewWidth = wrapper.offsetWidth;

  gsap.to(items, {
    x: -(totalWidth - viewWidth),
    ease: "none",
    scrollTrigger: {
      trigger: wrapper,
      start: "top top",
      end: () => `+=${totalWidth - viewWidth}`,
      scrub: 1,
      pin: true,
    },
  });

  return ScrollTrigger.getAll().slice(-1)[0];
}

export function progressBar(element: HTMLElement): ScrollTrigger {
  return ScrollTrigger.create({
    start: "top top",
    end: "max",
    scrub: 0.3,
    onUpdate(self) {
      gsap.set(element, { scaleX: self.progress, transformOrigin: "left" });
    },
  });
}

// ─── React Hooks ─────────────────────────────────────────────────────────────
export function useGSAP(
  callback: (context: gsap.Context) => void,
  deps: unknown[] = []
): void {
  const ctx = useRef<gsap.Context | null>(null);
  useEffect(() => {
    registerGSAP();
    ctx.current = gsap.context(callback);
    return () => ctx.current?.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export function useReveal<T extends HTMLElement>(
  preset: keyof typeof presets = "fadeUp",
  stagger = 0
): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    if (!ref.current) return;
    registerGSAP();
    const el = ref.current;
    const p = presets[preset];
    const tween = gsap.fromTo(el, { ...p.from }, {
      ...p.to,
      ...(stagger ? { stagger } : {}),
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        toggleActions: "play none none reverse",
      },
    });
    return () => {
      tween.kill();
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === el)
        .forEach((st) => st.kill());
    };
  }, [preset, stagger]);
  return ref;
}

export function useMagnetic<T extends HTMLElement>(
  strength = 0.35
): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    if (!ref.current) return;
    return magneticHover(ref.current, strength);
  }, [strength]);
  return ref;
}

export function useTilt<T extends HTMLElement>(
  intensity = 15
): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    if (!ref.current) return;
    return tiltCard(ref.current, intensity);
  }, [intensity]);
  return ref;
}

export function useParallax<T extends HTMLElement>(
  speed = 0.5
): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    if (!ref.current) return;
    registerGSAP();
    const st = parallaxY(ref.current, speed);
    return () => st.kill();
  }, [speed]);
  return ref;
}

export function useCountUp(
  target: number,
  options: { duration?: number; prefix?: string; suffix?: string; startOnView?: boolean } = {}
): RefObject<HTMLElement | null> {
  const ref = useRef<HTMLElement | null>(null);
  const { startOnView = true } = options;
  useEffect(() => {
    if (!ref.current) return;
    registerGSAP();
    const el = ref.current;
    let tween: gsap.core.Tween;
    if (startOnView) {
      ScrollTrigger.create({
        trigger: el,
        start: "top 90%",
        once: true,
        onEnter() {
          tween = countUp(el, target, options);
        },
      });
    } else {
      tween = countUp(el, target, options);
    }
    return () => {
      tween?.kill();
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === el)
        .forEach((st) => st.kill());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);
  return ref;
}

export function useCursorGlow(): { x: number; y: number } {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return pos;
}
