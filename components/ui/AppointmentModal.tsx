"use client";

import React, { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { services } from "@/data/services";
import { team } from "@/data/team";

interface Props {
  open: boolean;
  onClose: () => void;
}

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const TIMES = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDay(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}
const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export default function AppointmentModal({ open, onClose }: Props) {
  const [step, setStep] = useState(0);
  const [service, setService] = useState("");
  const [doctor, setDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [calMonth, setCalMonth] = useState(new Date().getMonth());
  const [calYear, setCalYear] = useState(new Date().getFullYear());
  const [time, setTime] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [bookingRef] = useState(() => "DT-" + Math.random().toString(36).slice(2,8).toUpperCase());
  const [direction, setDirection] = useState(1);

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  React.useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, handleKey]);

  const goNext = () => { setDirection(1); setStep(s => s + 1); };
  const goBack = () => { setDirection(-1); setStep(s => s - 1); };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          service,
          doctor,
          date: selectedDate ? `${calYear}-${String(calMonth+1).padStart(2,"0")}-${String(selectedDate).padStart(2,"0")}` : "",
          time,
          reference: bookingRef,
        }),
      });
    } catch {/* ignore */} finally {
      setLoading(false);
      goNext();
    }
  };

  const days = getDaysInMonth(calYear, calMonth);
  const firstDay = getFirstDay(calYear, calMonth);
  const today = new Date();

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
  };

  const selectStyle: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: "1.5px solid rgba(247,243,238,0.2)",
    color: "var(--ivory)",
    fontFamily: "var(--font-body)",
    fontSize: "var(--text-sm)",
    padding: "0.75rem 0 0.4rem",
    outline: "none",
    cursor: "pointer",
    appearance: "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23B8956A' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 0 center",
    paddingRight: "1.5rem",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: "1.5px solid rgba(247,243,238,0.2)",
    color: "var(--ivory)",
    fontFamily: "var(--font-body)",
    fontSize: "var(--text-sm)",
    padding: "0.75rem 0 0.4rem",
    outline: "none",
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: "fixed", inset: 0,
              backgroundColor: "rgba(10,22,40,0.88)",
              backdropFilter: "blur(8px)",
              zIndex: 200,
            }}
          />
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ duration: 0.32, ease: [0.25,0,0.25,1] }}
            style={{
              position: "fixed", inset: 0, zIndex: 201,
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "1.5rem", pointerEvents: "none",
            }}
          >
            <div
              onClick={e => e.stopPropagation()}
              style={{
                background: "var(--ink)",
                border: "1px solid rgba(184,149,106,0.2)",
                borderRadius: "6px",
                boxShadow: "0 8px 48px rgba(10,22,40,0.4)",
                width: "100%", maxWidth: "560px",
                overflow: "hidden",
                pointerEvents: "auto",
              }}
            >
              {/* Header */}
              <div style={{ padding: "2rem 2rem 1.5rem", borderBottom: "1px solid rgba(184,149,106,0.12)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", color: "var(--gold)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.25rem" }}>Book Appointment</p>
                    <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(20px,3vw,28px)", color: "var(--ivory)", fontWeight: 400 }}>
                      {step === 0 ? "Choose Service" : step === 1 ? "Select Date & Time" : step === 2 ? "Your Details" : "Confirmed!"}
                    </h2>
                  </div>
                  <button onClick={onClose} style={{ background: "none", border: "none", color: "rgba(247,243,238,0.4)", cursor: "pointer", fontSize: "1.2rem", padding: "0.25rem", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--ivory)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(247,243,238,0.4)")}
                  >✕</button>
                </div>
                {/* Steps progress */}
                {step < 4 && (
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "1.25rem" }}>
                    {[0,1,2,3].map(i => (
                      <div key={i} style={{
                        height: "3px",
                        flex: 1,
                        borderRadius: "2px",
                        backgroundColor: i <= step ? "var(--gold)" : "rgba(247,243,238,0.1)",
                        transition: "background-color 0.3s",
                      }} />
                    ))}
                  </div>
                )}
              </div>

              {/* Body */}
              <div style={{ overflow: "hidden", position: "relative", minHeight: "320px" }}>
                <AnimatePresence custom={direction} mode="wait">
                  <motion.div
                    key={step}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.28, ease: [0.25,0,0.25,1] }}
                    style={{ padding: "2rem" }}
                  >
                    {/* Step 0: Service & Doctor */}
                    {step === 0 && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
                        <div>
                          <label style={{ display: "block", fontSize: "var(--text-xs)", color: "var(--gold)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.5rem", fontFamily: "var(--font-body)" }}>Service</label>
                          <select value={service} onChange={e => setService(e.target.value)} style={selectStyle}>
                            <option value="" style={{ background: "var(--ink)" }}>Select a service</option>
                            {services.map(s => (
                              <option key={s.slug} value={s.slug} style={{ background: "var(--ink)" }}>{s.name}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: "var(--text-xs)", color: "var(--gold)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.5rem", fontFamily: "var(--font-body)" }}>Doctor (optional)</label>
                          <select value={doctor} onChange={e => setDoctor(e.target.value)} style={selectStyle}>
                            <option value="" style={{ background: "var(--ink)" }}>Any available doctor</option>
                            {team.map(d => (
                              <option key={d.id} value={String(d.id)} style={{ background: "var(--ink)" }}>{d.name} — {d.specialization}</option>
                            ))}
                          </select>
                        </div>
                        <button
                          onClick={goNext}
                          disabled={!service}
                          style={{
                            alignSelf: "flex-end",
                            padding: "0.75rem 2rem",
                            background: service ? "var(--gold)" : "rgba(184,149,106,0.3)",
                            color: "var(--ink)",
                            border: "none",
                            borderRadius: "2px",
                            fontFamily: "var(--font-body)",
                            fontSize: "var(--text-xs)",
                            fontWeight: 600,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            cursor: service ? "pointer" : "not-allowed",
                            transition: "background 0.2s",
                          }}
                        >Next →</button>
                      </div>
                    )}

                    {/* Step 1: Date & Time */}
                    {step === 1 && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                        {/* Calendar */}
                        <div>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                            <button onClick={() => { if (calMonth === 0) { setCalMonth(11); setCalYear(y => y-1); } else setCalMonth(m => m-1); }}
                              style={{ background: "none", border: "none", color: "var(--gold)", cursor: "pointer", fontSize: "1.1rem" }}>‹</button>
                            <span style={{ fontFamily: "var(--font-display)", color: "var(--ivory)", fontSize: "var(--text-sm)" }}>{MONTH_NAMES[calMonth]} {calYear}</span>
                            <button onClick={() => { if (calMonth === 11) { setCalMonth(0); setCalYear(y => y+1); } else setCalMonth(m => m+1); }}
                              style={{ background: "none", border: "none", color: "var(--gold)", cursor: "pointer", fontSize: "1.1rem" }}>›</button>
                          </div>
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: "2px", textAlign: "center" }}>
                            {DAYS.map(d => <div key={d} style={{ fontSize: "var(--text-xs)", color: "rgba(247,243,238,0.4)", padding: "0.25rem 0", fontFamily: "var(--font-body)" }}>{d}</div>)}
                            {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
                            {Array.from({ length: days }).map((_, i) => {
                              const day = i + 1;
                              const isPast = new Date(calYear, calMonth, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
                              const isSelected = selectedDate === day;
                              return (
                                <button
                                  key={day}
                                  onClick={() => !isPast && setSelectedDate(day)}
                                  disabled={isPast}
                                  style={{
                                    padding: "0.4rem",
                                    fontSize: "var(--text-xs)",
                                    fontFamily: "var(--font-body)",
                                    borderRadius: "2px",
                                    border: "none",
                                    cursor: isPast ? "not-allowed" : "pointer",
                                    background: isSelected ? "var(--gold)" : "transparent",
                                    color: isPast ? "rgba(247,243,238,0.2)" : isSelected ? "var(--ink)" : "var(--ivory)",
                                    fontWeight: isSelected ? 600 : 400,
                                    transition: "background 0.15s, color 0.15s",
                                  }}
                                >{day}</button>
                              );
                            })}
                          </div>
                        </div>
                        {/* Time slots */}
                        {selectedDate && (
                          <div>
                            <p style={{ fontSize: "var(--text-xs)", color: "var(--gold)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem", fontFamily: "var(--font-body)" }}>Available Times</p>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "0.5rem" }}>
                              {TIMES.map(t => (
                                <button key={t} onClick={() => setTime(t)} style={{
                                  padding: "0.4rem",
                                  fontSize: "var(--text-xs)",
                                  fontFamily: "var(--font-mono)",
                                  border: `1px solid ${time === t ? "var(--gold)" : "rgba(247,243,238,0.15)"}`,
                                  background: time === t ? "rgba(184,149,106,0.15)" : "transparent",
                                  color: time === t ? "var(--gold)" : "rgba(247,243,238,0.7)",
                                  borderRadius: "2px",
                                  cursor: "pointer",
                                  transition: "all 0.15s",
                                }}>{t}</button>
                              ))}
                            </div>
                          </div>
                        )}
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <button onClick={goBack} style={{ background: "none", border: "1px solid rgba(247,243,238,0.2)", color: "rgba(247,243,238,0.6)", padding: "0.65rem 1.5rem", borderRadius: "2px", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", letterSpacing: "0.1em" }}>← Back</button>
                          <button onClick={goNext} disabled={!selectedDate || !time} style={{ padding: "0.75rem 2rem", background: (selectedDate && time) ? "var(--gold)" : "rgba(184,149,106,0.3)", color: "var(--ink)", border: "none", borderRadius: "2px", fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", cursor: (selectedDate && time) ? "pointer" : "not-allowed", transition: "background 0.2s" }}>Next →</button>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Personal Details */}
                    {step === 2 && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                        {(["name","email","phone"] as const).map(field => (
                          <div key={field}>
                            <label style={{ display: "block", fontSize: "var(--text-xs)", color: "var(--gold)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.4rem", fontFamily: "var(--font-body)" }}>
                              {field === "name" ? "Full Name" : field === "email" ? "Email Address" : "Phone Number"}
                            </label>
                            <input
                              type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                              value={form[field]}
                              onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                              style={inputStyle}
                              placeholder={field === "name" ? "Your full name" : field === "email" ? "your@email.com" : "+44 ..."}
                            />
                          </div>
                        ))}
                        <div>
                          <label style={{ display: "block", fontSize: "var(--text-xs)", color: "var(--gold)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.4rem", fontFamily: "var(--font-body)" }}>Message (optional)</label>
                          <textarea
                            value={form.message}
                            onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                            rows={3}
                            style={{ ...inputStyle, resize: "vertical", borderBottom: "none", border: "1px solid rgba(247,243,238,0.15)", padding: "0.75rem", borderRadius: "2px" }}
                            placeholder="Any notes or concerns..."
                          />
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <button onClick={goBack} style={{ background: "none", border: "1px solid rgba(247,243,238,0.2)", color: "rgba(247,243,238,0.6)", padding: "0.65rem 1.5rem", borderRadius: "2px", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", letterSpacing: "0.1em" }}>← Back</button>
                          <button onClick={handleSubmit} disabled={loading || !form.name || !form.email || !form.phone} style={{
                            padding: "0.75rem 2rem",
                            background: (!loading && form.name && form.email && form.phone) ? "var(--gold)" : "rgba(184,149,106,0.3)",
                            color: "var(--ink)", border: "none", borderRadius: "2px",
                            fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", fontWeight: 600,
                            letterSpacing: "0.12em", textTransform: "uppercase",
                            cursor: (!loading && form.name && form.email && form.phone) ? "pointer" : "not-allowed",
                            transition: "background 0.2s",
                          }}>
                            {loading ? "Sending..." : "Confirm Booking"}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Confirmation */}
                    {step === 3 && (
                      <div style={{ textAlign: "center", padding: "1rem 0" }}>
                        <svg viewBox="0 0 80 80" style={{ width: "80px", height: "80px", margin: "0 auto 1.5rem" }}>
                          <circle cx="40" cy="40" r="36" fill="none" stroke="var(--gold)" strokeWidth="2" strokeDasharray="226" strokeDashoffset="0" style={{ animation: "drawCircle 0.6s ease forwards" }} />
                          <path d="M25 40 l10 12 l20-22" fill="none" stroke="var(--gold)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="50" strokeDashoffset="0" style={{ animation: "drawCheck 0.4s 0.5s ease forwards" }} />
                        </svg>
                        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(22px,3vw,30px)", color: "var(--ivory)", fontWeight: 400, marginBottom: "0.75rem" }}>Booking Confirmed!</h3>
                        <p style={{ fontFamily: "var(--font-body)", color: "rgba(247,243,238,0.6)", marginBottom: "1.5rem", lineHeight: "1.6" }}>
                          We&apos;ll be in touch to confirm your appointment. Your reference:
                        </p>
                        <div style={{ display: "inline-block", padding: "0.6rem 1.5rem", border: "1px solid var(--gold)", borderRadius: "2px", fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", color: "var(--gold)", letterSpacing: "0.15em", marginBottom: "1.5rem" }}>
                          {bookingRef}
                        </div>
                        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
                          <button onClick={onClose} style={{ padding: "0.75rem 2rem", background: "var(--gold)", color: "var(--ink)", border: "none", borderRadius: "2px", fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer" }}>Done</button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
