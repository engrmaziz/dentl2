"use client";

import React, { useState } from "react";
import Link from "next/link";
import { blogPosts } from "@/data/blog-posts";
import type { BlogPost } from "@/types";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

const allCategories = ["All", ...Array.from(new Set(blogPosts.map((p) => p.category)))];

function PostCard({ post }: { post: BlogPost }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/blog/${post.slug}`}
      style={{ textDecoration: "none", display: "flex", flexDirection: "column", height: "100%" }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          borderRadius: "4px",
          overflow: "hidden",
          border: "1px solid var(--ash)",
          background: "white",
          transition: "box-shadow 0.35s ease, transform 0.35s ease",
          boxShadow: hovered ? "0 20px 50px rgba(10,22,40,0.14)" : "0 2px 12px rgba(10,22,40,0.06)",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
        }}
      >
        {/* Image */}
        <div
          style={{
            height: "200px",
            background: post.featuredImage,
            position: "relative",
            flexShrink: 0,
          }}
        >
          <Badge
            variant="gold"
            size="sm"
            style={{ position: "absolute", bottom: "1rem", left: "1rem" }}
          >
            {post.category}
          </Badge>
        </div>
        {/* Content */}
        <div style={{ padding: "1.75rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-xs)",
              color: "var(--charcoal)",
              letterSpacing: "0.05em",
              margin: "0 0 0.75rem",
            }}
          >
            {post.author} &middot; {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} &middot; {post.readTime} min read
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-md)",
              color: "var(--ink)",
              margin: "0 0 0.75rem",
              lineHeight: "var(--leading-tight)",
            }}
          >
            {post.title}
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-sm)",
              lineHeight: "var(--leading-loose)",
              color: "var(--charcoal)",
              margin: "0 0 1.5rem",
              flexGrow: 1,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {post.excerpt}
          </p>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-xs)",
              color: "var(--gold)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              transition: "gap 0.25s ease",
            }}
          >
            Read Article →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  const [featured, ...rest] = filtered;

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
            Expert Insights
          </Badge>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-hero)",
              lineHeight: "var(--leading-tight)",
              color: "var(--ivory)",
              margin: "0 0 1.25rem",
              maxWidth: "620px",
            }}
          >
            The Dentl Journal
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-md)",
              lineHeight: "var(--leading-loose)",
              color: "rgba(247,243,238,0.65)",
              maxWidth: "520px",
              margin: 0,
            }}
          >
            In-depth articles on dental health, cosmetic treatments, and the science behind a
            perfect smile — written by our specialist team.
          </p>
        </div>
      </section>

      {/* ── ARTICLES ── */}
      <section style={{ backgroundColor: "var(--ivory)", paddingBlock: "clamp(5rem, 10vw, 9rem)" }}>
        <div className="container">
          {/* Category Filter */}
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              flexWrap: "wrap",
              marginBottom: "3rem",
            }}
          >
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-sm)",
                  fontWeight: 500,
                  letterSpacing: "0.05em",
                  padding: "0.5rem 1.1rem",
                  borderRadius: "100px",
                  border: activeCategory === cat ? "1px solid var(--gold)" : "1px solid var(--ash)",
                  background: activeCategory === cat ? "var(--gold)" : "transparent",
                  color: activeCategory === cat ? "var(--ink)" : "var(--charcoal)",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured Post */}
          {featured && (
            <Link
              href={`/blog/${featured.slug}`}
              style={{ textDecoration: "none", display: "block", marginBottom: "3rem" }}
            >
              <div
                style={{
                  borderRadius: "4px",
                  overflow: "hidden",
                  border: "1px solid var(--ash)",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  background: "white",
                }}
              >
                <div
                  style={{
                    minHeight: "340px",
                    background: featured.featuredImage,
                    position: "relative",
                  }}
                >
                  <Badge
                    variant="gold"
                    size="md"
                    style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem" }}
                  >
                    Featured
                  </Badge>
                </div>
                <div
                  style={{
                    padding: "3rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Badge variant="mist" size="sm" style={{ marginBottom: "1rem", alignSelf: "flex-start" }}>
                    {featured.category}
                  </Badge>
                  <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "var(--text-xl)",
                      color: "var(--ink)",
                      margin: "0 0 1rem",
                      lineHeight: "var(--leading-tight)",
                    }}
                  >
                    {featured.title}
                  </h2>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-base)",
                      lineHeight: "var(--leading-loose)",
                      color: "var(--charcoal)",
                      margin: "0 0 1.5rem",
                    }}
                  >
                    {featured.excerpt}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-xs)",
                      color: "var(--charcoal)",
                      margin: "0 0 1.5rem",
                    }}
                  >
                    {featured.author} &middot; {new Date(featured.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} &middot; {featured.readTime} min read
                  </p>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-xs)",
                      color: "var(--gold)",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                    }}
                  >
                    Read Article →
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* Post Grid */}
          {rest.length > 0 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "2rem",
              }}
            >
              {rest.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
