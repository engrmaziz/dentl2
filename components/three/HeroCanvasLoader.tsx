"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), {
  ssr: false,
  loading: () => null,
});

export default function HeroCanvasLoader() {
  return (
    <Suspense fallback={null}>
      <HeroCanvas />
    </Suspense>
  );
}
