"use client";

import React, { useState } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

const officeHours = [
  { day: "Monday – Thursday", hours: "8:00am – 7:00pm" },
  { day: "Friday", hours: "8:00am – 5:00pm" },
  { day: "Saturday", hours: "9:00am – 2:00pm" },
  { day: "Sunday", hours: "Closed" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  const fieldStyle = (hasError: boolean): React.CSSProperties => ({
    width: "100%",
    padding: "0.85rem 1rem",
    fontFamily: "var(--font-body)",
    fontSize: "var(--text-base)",
    color: "var(--ink)",
    background: "white",
    border: `1px solid ${hasError ? "var(--error, #c0392b)" : "var(--ash)"}`,
    borderRadius: "4px",
    outline: "none",
    transition: "border-color 0.25s ease",
    boxSizing: "border-box",
  });

  return (
    <main>
      {/* ── HERO ── */}
      <section
        style={{
          backgroundColor: "var(--ink)",
          paddingBlock: "clamp(6rem, 12vw, 10rem)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(184,149,106,0.06) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <Badge variant="gold" size="md" style={{ marginBottom: "1.5rem" }}>
            Get in Touch
          </Badge>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-hero)",
              lineHeight: "var(--leading-tight)",
              color: "var(--ivory)",
              margin: "0 0 1.25rem",
              maxWidth: "600px",
            }}
          >
            We&apos;d Love to Hear From You
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-md)",
              lineHeight: "var(--leading-loose)",
              color: "rgba(247,243,238,0.65)",
              maxWidth: "500px",
              margin: 0,
            }}
          >
            Whether you have a question about a treatment, want to book a consultation, or simply
            want to say hello — we&apos;re here.
          </p>
        </div>
      </section>

      {/* ── CONTACT CONTENT ── */}
      <section style={{ backgroundColor: "var(--ivory)", paddingBlock: "clamp(5rem, 10vw, 9rem)" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.4fr",
              gap: "5rem",
              alignItems: "flex-start",
            }}
          >
            {/* Left — Info */}
            <div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-xs)",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  marginBottom: "1rem",
                }}
              >
                Our Details
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-xl)",
                  color: "var(--ink)",
                  margin: "0 0 2rem",
                  lineHeight: "var(--leading-tight)",
                }}
              >
                Find Us
              </h2>

              {/* Address */}
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "flex-start",
                  marginBottom: "1.5rem",
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "rgba(184,149,106,0.1)",
                    border: "1px solid rgba(184,149,106,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-base)",
                      fontWeight: 600,
                      color: "var(--ink)",
                      margin: "0 0 0.25rem",
                    }}
                  >
                    Address
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-base)",
                      color: "var(--charcoal)",
                      lineHeight: "var(--leading-normal)",
                      margin: 0,
                    }}
                  >
                    12 Harley Street
                    <br />
                    Marylebone
                    <br />
                    London W1G 9PG
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "flex-start",
                  marginBottom: "1.5rem",
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "rgba(184,149,106,0.1)",
                    border: "1px solid rgba(184,149,106,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.49 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.4 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.4a16 16 0 0 0 6.06 6.06l.76-.76a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-base)",
                      fontWeight: 600,
                      color: "var(--ink)",
                      margin: "0 0 0.25rem",
                    }}
                  >
                    Telephone
                  </p>
                  <a
                    href="tel:+442071234567"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-base)",
                      color: "var(--charcoal)",
                      textDecoration: "none",
                    }}
                  >
                    +44 (0) 20 7123 4567
                  </a>
                </div>
              </div>

              {/* Email */}
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "flex-start",
                  marginBottom: "2.5rem",
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "rgba(184,149,106,0.1)",
                    border: "1px solid rgba(184,149,106,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-base)",
                      fontWeight: 600,
                      color: "var(--ink)",
                      margin: "0 0 0.25rem",
                    }}
                  >
                    Email
                  </p>
                  <a
                    href="mailto:hello@dentl.co.uk"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-base)",
                      color: "var(--charcoal)",
                      textDecoration: "none",
                    }}
                  >
                    hello@dentl.co.uk
                  </a>
                </div>
              </div>

              {/* Hours */}
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-xs)",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  marginBottom: "1rem",
                }}
              >
                Opening Hours
              </p>
              <div
                style={{
                  background: "var(--mist)",
                  borderRadius: "4px",
                  border: "1px solid var(--ash)",
                  overflow: "hidden",
                }}
              >
                {officeHours.map((row, i) => (
                  <div
                    key={row.day}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "0.85rem 1.25rem",
                      borderBottom: i < officeHours.length - 1 ? "1px solid var(--ash)" : "none",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "var(--text-sm)",
                        color: "var(--ink)",
                        fontWeight: 500,
                      }}
                    >
                      {row.day}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "var(--text-sm)",
                        color: row.hours === "Closed" ? "var(--charcoal)" : "var(--gold)",
                        fontWeight: row.hours === "Closed" ? 400 : 500,
                      }}
                    >
                      {row.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Form */}
            <div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-xs)",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  marginBottom: "1rem",
                }}
              >
                Send a Message
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-xl)",
                  color: "var(--ink)",
                  margin: "0 0 2rem",
                  lineHeight: "var(--leading-tight)",
                }}
              >
                How Can We Help?
              </h2>

              {submitted ? (
                <div
                  style={{
                    padding: "3rem 2.5rem",
                    background: "rgba(46,125,94,0.06)",
                    border: "1px solid rgba(46,125,94,0.3)",
                    borderRadius: "4px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "50%",
                      background: "rgba(46,125,94,0.12)",
                      border: "1px solid rgba(46,125,94,0.35)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 1.5rem",
                    }}
                  >
                    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" fill="none" stroke="var(--success, #2E7D5E)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "var(--text-md)",
                      color: "var(--ink)",
                      margin: "0 0 0.5rem",
                    }}
                  >
                    Message Received
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-base)",
                      color: "var(--charcoal)",
                      lineHeight: "var(--leading-normal)",
                      margin: 0,
                    }}
                  >
                    Thank you, {form.name}. We&apos;ll be in touch within one business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "1.25rem",
                      marginBottom: "1.25rem",
                    }}
                  >
                    <div>
                      <label
                        htmlFor="contact-name"
                        style={{
                          display: "block",
                          fontFamily: "var(--font-body)",
                          fontSize: "var(--text-sm)",
                          color: "var(--ink)",
                          marginBottom: "0.5rem",
                          fontWeight: 500,
                        }}
                      >
                        Full Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        autoComplete="name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        style={fieldStyle(!!errors.name)}
                        onFocus={(e) =>
                          ((e.target as HTMLInputElement).style.borderColor = "var(--gold)")
                        }
                        onBlur={(e) =>
                          ((e.target as HTMLInputElement).style.borderColor = errors.name
                            ? "var(--error, #c0392b)"
                            : "var(--ash)")
                        }
                      />
                      {errors.name && (
                        <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", color: "var(--error, #c0392b)", margin: "0.35rem 0 0" }}>
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="contact-email"
                        style={{
                          display: "block",
                          fontFamily: "var(--font-body)",
                          fontSize: "var(--text-sm)",
                          color: "var(--ink)",
                          marginBottom: "0.5rem",
                          fontWeight: 500,
                        }}
                      >
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        style={fieldStyle(!!errors.email)}
                        onFocus={(e) =>
                          ((e.target as HTMLInputElement).style.borderColor = "var(--gold)")
                        }
                        onBlur={(e) =>
                          ((e.target as HTMLInputElement).style.borderColor = errors.email
                            ? "var(--error, #c0392b)"
                            : "var(--ash)")
                        }
                      />
                      {errors.email && (
                        <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", color: "var(--error, #c0392b)", margin: "0.35rem 0 0" }}>
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div style={{ marginBottom: "1.25rem" }}>
                    <label
                      htmlFor="contact-subject"
                      style={{
                        display: "block",
                        fontFamily: "var(--font-body)",
                        fontSize: "var(--text-sm)",
                        color: "var(--ink)",
                        marginBottom: "0.5rem",
                        fontWeight: 500,
                      }}
                    >
                      Subject *
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      style={fieldStyle(!!errors.subject)}
                      onFocus={(e) =>
                        ((e.target as HTMLInputElement).style.borderColor = "var(--gold)")
                      }
                      onBlur={(e) =>
                        ((e.target as HTMLInputElement).style.borderColor = errors.subject
                          ? "var(--error, #c0392b)"
                          : "var(--ash)")
                      }
                    />
                    {errors.subject && (
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", color: "var(--error, #c0392b)", margin: "0.35rem 0 0" }}>
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div style={{ marginBottom: "2rem" }}>
                    <label
                      htmlFor="contact-message"
                      style={{
                        display: "block",
                        fontFamily: "var(--font-body)",
                        fontSize: "var(--text-sm)",
                        color: "var(--ink)",
                        marginBottom: "0.5rem",
                        fontWeight: 500,
                      }}
                    >
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={6}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      style={{
                        ...fieldStyle(!!errors.message),
                        resize: "vertical",
                        minHeight: "140px",
                      }}
                      onFocus={(e) =>
                        ((e.target as HTMLTextAreaElement).style.borderColor = "var(--gold)")
                      }
                      onBlur={(e) =>
                        ((e.target as HTMLTextAreaElement).style.borderColor = errors.message
                          ? "var(--error, #c0392b)"
                          : "var(--ash)")
                      }
                    />
                    {errors.message && (
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", color: "var(--error, #c0392b)", margin: "0.35rem 0 0" }}>
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <Button type="submit" variant="primary" size="lg">
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── MAP PLACEHOLDER ── */}
      <div
        style={{
          height: "360px",
          background: "var(--mist)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderTop: "1px solid var(--ash)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <svg viewBox="0 0 24 24" width="48" height="48" aria-hidden="true" fill="none" stroke="var(--gold)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "1rem" }}>
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-sm)",
              color: "var(--charcoal)",
              margin: "0 0 0.5rem",
            }}
          >
            12 Harley Street, Marylebone, London W1G 9PG
          </p>
          <a
            href="https://maps.google.com/?q=Harley+Street+London"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-xs)",
              color: "var(--gold)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Open in Maps →
          </a>
        </div>
      </div>
    </main>
  );
}
