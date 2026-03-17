"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

let registered = false;

export function registerGSAP() {
  if (registered || typeof window === "undefined") return;
  registered = true;

  gsap.registerPlugin(ScrollTrigger, CustomEase);

  CustomEase.create("ease.smooth", "M0,0 C0.25,0 0.25,1 1,1");
  CustomEase.create("ease.snap",   "M0,0 C0.6,0 0.4,1 1,1");
  CustomEase.create("ease.enter",  "M0,0 C0.05,0 0.133,0.142 0.166,0.19 0.208,0.245 0.262,0.5 0.33,0.7 0.384,0.85 0.504,1 1,1");
  CustomEase.create("ease.exit",   "M0,0 C0.3,0 1,0.7 1,1");

  gsap.defaults({
    ease: "ease.smooth",
    duration: 0.8,
  });

  ScrollTrigger.defaults({
    toggleActions: "play none none reverse",
  });
}

export { gsap, ScrollTrigger, CustomEase };
