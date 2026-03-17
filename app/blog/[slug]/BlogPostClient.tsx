"use client";

import React, { useState } from "react";
import Link from "next/link";
import type { BlogPost } from "@/types";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import AppointmentModal from "@/components/ui/AppointmentModal";

export default function BlogPostClient({
  post,
  related,
}: {
  post: BlogPost;
  related: BlogPost[];
}) {
  const [modalOpen, setModalOpen] = useState(false);

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
        <div className="container" style={{ position: "relative", zIndex: 1, maxWidth: "860px" }}>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-xs)",
              letterSpacing: "0.2em",
              color: "var(--gold)",
              marginBottom: "1.5rem",
            }}
          >
            <Link href="/blog" style={{ color: "inherit", textDecoration: "none", opacity: 0.7 }}>
              Journal
            </Link>
            {" · "}
            {post.category}
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-hero)",
              lineHeight: "var(--leading-tight)",
              color: "var(--ivory)",
              margin: "0 0 1.5rem",
            }}
          >
            {post.title}
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-md)",
              lineHeight: "var(--leading-loose)",
              color: "rgba(247,243,238,0.65)",
              margin: "0 0 2rem",
            }}
          >
            {post.excerpt}
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "rgba(184,149,106,0.2)",
                border: "1px solid rgba(184,149,106,0.35)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
              </svg>
            </div>
            <div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-sm)",
                  color: "var(--ivory)",
                  margin: 0,
                  fontWeight: 500,
                }}
              >
                {post.author}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-xs)",
                  color: "rgba(247,243,238,0.5)",
                  margin: 0,
                }}
              >
                {new Date(post.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}{" "}
                · {post.readTime} min read
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED IMAGE ── */}
      <div
        style={{
          height: "clamp(200px, 40vw, 480px)",
          background: post.featuredImage,
        }}
      />

      {/* ── ARTICLE BODY ── */}
      <section style={{ backgroundColor: "var(--ivory)", paddingBlock: "clamp(4rem, 8vw, 8rem)" }}>
        <div
          className="container"
          style={{ maxWidth: "760px" }}
        >
          <article
            className="prose-dentl"
            dangerouslySetInnerHTML={{ __html: post.content }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-base)",
              lineHeight: "var(--leading-loose)",
              color: "var(--charcoal)",
            }}
          />

          {/* Tags */}
          <div
            style={{
              marginTop: "3rem",
              paddingTop: "2rem",
              borderTop: "1px solid var(--ash)",
              display: "flex",
              gap: "0.5rem",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-xs)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--charcoal)",
                marginRight: "0.5rem",
              }}
            >
              Topics:
            </span>
            {post.tags.map((tag) => (
              <Badge key={tag} variant="mist" size="sm">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOKING CTA ── */}
      <section
        style={{
          backgroundColor: "var(--ink)",
          paddingBlock: "clamp(4rem, 8vw, 8rem)",
          textAlign: "center",
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
            Ready to Begin?
          </Badge>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-xl)",
              color: "var(--ivory)",
              margin: "0 0 1rem",
            }}
          >
            Book Your Consultation
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-base)",
              color: "rgba(247,243,238,0.65)",
              maxWidth: "440px",
              margin: "0 auto 2.5rem",
              lineHeight: "var(--leading-loose)",
            }}
          >
            Have questions about the treatments discussed in this article? Our specialist team
            is ready to help.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Button variant="primary" size="lg" onClick={() => setModalOpen(true)}>
              Book Appointment
            </Button>
            <Button variant="secondary" size="lg" as="a" href="/blog">
              Back to Journal
            </Button>
          </div>
        </div>
      </section>

      {/* ── RELATED POSTS ── */}
      {related.length > 0 && (
        <section style={{ backgroundColor: "var(--ivory)", paddingBlock: "clamp(4rem, 8vw, 8rem)" }}>
          <div className="container">
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
              Further Reading
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-xl)",
                color: "var(--ink)",
                margin: "0 0 2.5rem",
              }}
            >
              Related Articles
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "2rem",
              }}
            >
              {related.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/blog/${rel.slug}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{
                      borderRadius: "4px",
                      overflow: "hidden",
                      border: "1px solid var(--ash)",
                      background: "white",
                    }}
                  >
                    <div
                      style={{
                        height: "160px",
                        background: rel.featuredImage,
                        position: "relative",
                      }}
                    >
                      <Badge
                        variant="gold"
                        size="sm"
                        style={{ position: "absolute", bottom: "0.75rem", left: "0.75rem" }}
                      >
                        {rel.category}
                      </Badge>
                    </div>
                    <div style={{ padding: "1.25rem" }}>
                      <h3
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "var(--text-md)",
                          color: "var(--ink)",
                          margin: "0 0 0.5rem",
                          lineHeight: "var(--leading-tight)",
                        }}
                      >
                        {rel.title}
                      </h3>
                      <p
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "var(--text-xs)",
                          color: "var(--charcoal)",
                          margin: 0,
                        }}
                      >
                        {rel.readTime} min read
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <AppointmentModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
}
