"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useAppStore } from "@/store";

const CLINIC_NAME = "Dentl";

const overlayVariants = {
  initial: { scaleY: 0, transformOrigin: "bottom" },
  animate: { scaleY: 1, transformOrigin: "bottom" },
  exit: { scaleY: 0, transformOrigin: "top" },
};

const goldBarVariants = {
  initial: { scaleY: 0, transformOrigin: "bottom" },
  animate: { scaleY: 1, transformOrigin: "bottom" },
  exit: { scaleY: 0, transformOrigin: "top" },
};

const ivoryFillVariants = {
  initial: { scaleY: 0, transformOrigin: "bottom" },
  animate: { scaleY: 1, transformOrigin: "bottom" },
  exit: { scaleY: 0, transformOrigin: "top" },
};

const labelVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const setTransitioning = useAppStore((s) => s.setTransitioning);
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      prevPathRef.current = pathname;
      setTransitioning(true);
      const timer = setTimeout(() => setTransitioning(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [pathname, setTransitioning]);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0, 0.25, 1] }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* Page transition overlay */}
      <AnimatePresence>
        <motion.div
          key={`overlay-${pathname}`}
          variants={overlayVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.6, ease: [0.6, 0, 0.4, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9000,
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* Gold leading bar */}
          <motion.div
            variants={goldBarVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2, ease: [0.6, 0, 0.4, 1] }}
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "var(--gold)",
              zIndex: 1,
            }}
          />
          {/* Ivory fill */}
          <motion.div
            variants={ivoryFillVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.6, 0, 0.4, 1], delay: 0.1 }}
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "var(--ivory)",
              zIndex: 2,
            }}
          />
          {/* Clinic name */}
          <motion.span
            variants={labelVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, delay: 0.25 }}
            style={{
              position: "relative",
              zIndex: 3,
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-xl)",
              color: "var(--ink)",
              letterSpacing: "0.1em",
              fontWeight: 400,
            }}
          >
            {CLINIC_NAME}
          </motion.span>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
