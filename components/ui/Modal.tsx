"use client";

import React, { useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: string;
  title?: string;
}

export default function Modal({ open, onClose, children, maxWidth = "640px", title }: ModalProps) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, handleKey]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(10,22,40,0.82)",
              backdropFilter: "blur(6px)",
              zIndex: "var(--z-overlay)" as unknown as number,
            }}
          />
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0, 0.25, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: "calc(var(--z-overlay) + 1)" as unknown as number,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1.5rem",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                background: "var(--ink)",
                borderRadius: "4px",
                border: "1px solid rgba(184,149,106,0.15)",
                boxShadow: "var(--shadow-modal)",
                width: "100%",
                maxWidth,
                maxHeight: "90vh",
                overflowY: "auto",
                pointerEvents: "auto",
                position: "relative",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                aria-label="Close modal"
                style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                  background: "transparent",
                  border: "none",
                  color: "rgba(247,243,238,0.5)",
                  cursor: "pointer",
                  fontSize: "1.4rem",
                  lineHeight: 1,
                  transition: "color 0.2s",
                  zIndex: 1,
                  padding: "0.25rem",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ivory)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(247,243,238,0.5)")}
              >
                ✕
              </button>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
