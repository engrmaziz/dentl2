"use client";

import { create } from "zustand";
import type { AppState } from "@/types";

export const useAppStore = create<AppState>((set) => ({
  isMenuOpen: false,
  isTransitioning: false,
  scrollY: 0,
  cursor: {
    x: 0,
    y: 0,
    isHovering: false,
    isClicking: false,
    isOnImage: false,
    cursorText: "",
  },
  setMenuOpen: (open) => set({ isMenuOpen: open }),
  setTransitioning: (t) => set({ isTransitioning: t }),
  setScrollY: (y) => set({ scrollY: y }),
  setCursor: (cursor) =>
    set((state) => ({ cursor: { ...state.cursor, ...cursor } })),
}));
