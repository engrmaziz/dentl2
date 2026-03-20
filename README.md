<div align="center">

# 🦷 Smile Dental Clinic — Management Platform

**A full-stack, enterprise-grade dental clinic management system built with Next.js 15, Express.js, and SQLite.**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Express](https://img.shields.io/badge/Express.js-5-000000?style=flat-square&logo=express)](https://expressjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![SQLite](https://img.shields.io/badge/SQLite-3-003B57?style=flat-square&logo=sqlite)](https://www.sqlite.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Database](#database)
- [API Reference](#api-reference)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

**Smile Dental Clinic Management Platform** is an end-to-end solution for modern dental practices. It combines a beautiful, animated public-facing website with a powerful admin dashboard to manage appointments, doctors, blog content, gallery images, and patient inquiries — all backed by a secure REST API.

### Key Highlights

| Attribute | Detail |
|-----------|--------|
| **Frontend** | Next.js 15 (App Router), React 19, Tailwind CSS 4 |
| **Backend** | Express.js 5 REST API, TypeScript |
| **Database** | SQLite 3 (WAL mode, indexed queries) |
| **Auth** | JWT + Bcrypt, role-based access |
| **Integrations** | Google Calendar, SMTP Email, iCal |
| **Security** | Helmet, CORS, Rate Limiting, Input Validation (Zod) |

---

## Features

### 🌐 Public Website

- **Homepage** — hero section, services showcase, team profiles, patient testimonials, and a 3D animated banner (Three.js)
- **Services** — detailed pages per dental service with procedures, FAQs, and benefits
- **Doctor Profiles** — individual pages with specialization, education, and availability
- **Appointment Booking** — interactive modal for selecting service, doctor, date, and time
- **Blog** — categorized articles with featured images, read-time estimates, and view tracking
- **Image Gallery** — categorized clinic photos with featured-image support
- **Contact Form** — patient inquiry submission with email confirmation and rate limiting
- **Smooth UX** — GSAP and Framer Motion animations, Lenis smooth scroll, responsive design

### 🔒 Admin Dashboard

- **Authentication** — secure JWT login, password change, session management
- **Appointment Management** — full CRUD, status workflow, Google Calendar sync, email reminders
- **Doctor Management** — profile photos, availability scheduling, activation/deactivation
- **Blog CMS** — rich content management with draft/publish workflow, featured images, tag management
- **Gallery Management** — multi-image upload, categorization, sort order, featured flags
- **Contact Center** — read/unread tracking, starred messages, reply timestamps
- **Clinic Settings** — key-value store for clinic-wide configuration
- **Dashboard Analytics** — appointment stats, today's schedule, contact overview

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     CLIENT LAYER                        │
│  Next.js 15 (App Router)  ·  React 19  ·  Tailwind 4   │
│  Zustand (state)  ·  GSAP / Framer Motion  ·  Three.js │
└────────────────────────┬────────────────────────────────┘
                         │ HTTP (REST)
┌────────────────────────▼────────────────────────────────┐
│                      API LAYER                          │
│       Express.js 5  ·  TypeScript  ·  Zod Validation    │
│  Helmet · CORS · Rate Limiting · JWT Middleware · Multer │
└────────────────────────┬────────────────────────────────┘
                         │ better-sqlite3
┌────────────────────────▼────────────────────────────────┐
│                    DATA LAYER                           │
│  SQLite 3 (WAL mode)  ·  8 normalized tables            │
│  Indexed queries  ·  Foreign key constraints            │
└─────────────────────────────────────────────────────────┘
          │                    │
   ┌──────▼──────┐    ┌────────▼───────┐
   │   SMTP/Email │    │ Google Calendar│
   │  (Nodemailer)│    │   (googleapis) │
   └─────────────┘    └────────────────┘
```

---

## Tech Stack

### Frontend

| Package | Version | Purpose |
|---------|---------|---------|
| [Next.js](https://nextjs.org/) | 15 | React meta-framework (App Router) |
| [React](https://react.dev/) | 19 | UI library |
| [TypeScript](https://www.typescriptlang.org/) | 5 | Static type checking |
| [Tailwind CSS](https://tailwindcss.com/) | 4 | Utility-first styling |
| [Zustand](https://zustand-demo.pmnd.rs/) | 5 | Lightweight global state |
| [GSAP](https://gsap.com/) | 3.14 | High-performance animations |
| [Framer Motion](https://www.framer.com/motion/) | 12 | Declarative React animations |
| [Lenis](https://lenis.darkroom.engineering/) | 1.3 | Smooth scroll |
| [Three.js](https://threejs.org/) | 0.183 | 3D WebGL graphics |
| [Lucide React](https://lucide.dev/) | latest | SVG icon library |

### Backend

| Package | Version | Purpose |
|---------|---------|---------|
| [Express.js](https://expressjs.com/) | 5 | HTTP server framework |
| [TypeScript](https://www.typescriptlang.org/) | 5.3 | Static type checking |
| [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) | 12 | Synchronous SQLite driver |
| [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) | 9 | JWT authentication |
| [bcrypt](https://github.com/kelektiv/node.bcrypt.js) | — | Password hashing |
| [Zod](https://zod.dev/) | 3.22 | Runtime schema validation |
| [Multer](https://github.com/expressjs/multer) | 2 | Multipart file uploads |
| [Sharp](https://sharp.pixelplumbing.com/) | 0.33 | Image processing & resizing |
| [Nodemailer](https://nodemailer.com/) | 8 | Email delivery (SMTP) |
| [googleapis](https://github.com/googleapis/google-api-nodejs-client) | 140 | Google Calendar integration |
| [Helmet](https://helmetjs.github.io/) | 7 | HTTP security headers |
| [Morgan](https://github.com/expressjs/morgan) | — | HTTP request logging |

---

## Project Structure

```
dentl2/
├── app/                          # Next.js App Router pages
│   ├── admin/                    # Admin dashboard (protected)
│   ├── api/                      # Next.js API routes (proxy layer)
│   ├── blog/                     # Blog listing & detail pages
│   ├── contact/                  # Contact page
│   ├── gallery/                  # Gallery page
│   ├── services/                 # Services listing & detail pages
│   ├── team/                     # Team/doctors page
│   ├── about/                    # About page
│   ├── privacy/                  # Privacy policy
│   ├── terms/                    # Terms of service
│   ├── layout.tsx                # Root layout (fonts, metadata)
│   ├── page.tsx                  # Homepage
│   └── globals.css               # Global CSS & Tailwind directives
│
├── components/
│   ├── layout/                   # Navbar, Footer, Header
│   ├── three/                    # Three.js 3D components
│   └── ui/                       # Reusable UI primitives (Button, Modal, Input…)
│
├── lib/
│   ├── api.ts                    # Typed API client (fetch wrapper)
│   ├── animations.ts             # Shared GSAP animation helpers
│   ├── gsap.ts                   # GSAP initialization & plugins
│   ├── lenis.ts                  # Smooth scroll setup
│   └── utils.ts                  # General utility functions
│
├── store/                        # Zustand state slices
├── data/                         # Static seed data (services, team, blog, testimonials)
├── types/                        # Shared TypeScript interfaces
├── public/                       # Static assets (SVG, images)
│
├── server/                       # Express.js backend
│   └── src/
│       ├── controllers/          # Business logic (7 domain controllers)
│       ├── routes/               # Route definitions (7 resource routers)
│       ├── middleware/           # Auth, validation, upload, rate-limit
│       ├── services/             # Email, Google Calendar, iCal services
│       ├── db/                   # Database initialization, migrations & seed
│       ├── types/                # Backend TypeScript interfaces
│       ├── validators/           # Zod request validation schemas
│       └── server.ts             # Express application entry point
│
├── next.config.ts                # Next.js configuration
├── tailwind.config.mjs           # Tailwind CSS configuration
├── tsconfig.json                 # Frontend TypeScript config
└── package.json                  # Frontend dependencies & scripts
```

---

## Prerequisites

| Requirement | Version |
|-------------|---------|
| Node.js | ≥ 18.x |
| npm | ≥ 9.x |
| Git | any recent version |

Optional integrations (configured via environment variables):

- **Google Cloud Project** with Calendar API enabled (for calendar sync)
- **SMTP mail server** or Gmail App Password (for email notifications)

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/engrmaziz/dentl2.git
cd dentl2
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Install backend dependencies

```bash
cd server
npm install
cd ..
```

### 4. Configure environment variables

Create the required environment files (see [Configuration](#configuration) below).

### 5. Initialize the database

```bash
cd server
npm run seed          # Creates SQLite DB and populates initial data
cd ..
```

### 6. Start development servers

Open **two terminals**:

**Terminal 1 — Frontend (port 3000)**
```bash
npm run dev
```

**Terminal 2 — Backend (port 3001)**
```bash
cd server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
The admin panel is available at [http://localhost:3000/admin](http://localhost:3000/admin).

---

## Configuration

### Frontend — `.env.local` (project root)

```dotenv
# URL of the Express backend API
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Backend — `server/.env`

```dotenv
# ── Server ─────────────────────────────────────────────────
PORT=3001
NODE_ENV=development          # development | production

# ── Security ───────────────────────────────────────────────
JWT_SECRET=replace-with-a-long-random-secret

# ── Database ───────────────────────────────────────────────
DB_PATH=./data/clinic.db
UPLOAD_DIR=./uploads

# ── CORS ───────────────────────────────────────────────────
FRONTEND_URL=http://localhost:3000

# ── Email (SMTP) ───────────────────────────────────────────
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=clinic@example.com
SMTP_PASS=your-app-specific-password

# ── Google Calendar (optional) ─────────────────────────────
GOOGLE_CLIENT_ID=xxxxxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:3001/auth/google/callback
GOOGLE_CALENDAR_ID=primary
```

> **Security Note:** Never commit `.env` or `.env.local` files to version control. Both files are listed in `.gitignore`.

---

## Database

The backend uses **SQLite 3** in WAL (Write-Ahead Logging) mode for concurrency and performance. The database file is created automatically on first run.

### Schema Overview

| Table | Description |
|-------|-------------|
| `admin_users` | Admin accounts with hashed passwords and roles |
| `doctors` | Doctor profiles, specializations, and JSON availability |
| `appointments` | Patient bookings linked to doctors with Google event IDs |
| `blog_posts` | CMS articles with draft/publish workflow and JSON tags |
| `gallery_images` | Clinic photos with categories and sort ordering |
| `contact_submissions` | Patient inquiries with read/starred tracking |
| `clinic_settings` | Key-value store for clinic-wide configuration |

### Initialization & Seeding

```bash
cd server

# Run schema migrations
npm run migrate

# Seed with demo data (creates default admin user)
npm run seed
```

Default admin credentials after seeding:

| Field | Value |
|-------|-------|
| Email | `admin@smiledentalclinic.com` |
| Password | `Admin@123` |

> **⚠️ Change the default password immediately after first login.**

---

## API Reference

All API routes are prefixed with `/api`. Protected routes require a valid JWT token in the `Authorization: Bearer <token>` header or an `auth_token` cookie.

### Authentication

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/auth/login` | Public | Obtain JWT token |
| `GET` | `/auth/me` | 🔒 | Get current user profile |
| `POST` | `/auth/change-password` | 🔒 | Update password |

### Appointments

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/appointments` | Public | Book an appointment |
| `GET` | `/appointments` | 🔒 | List appointments (paginated) |
| `GET` | `/appointments/stats` | 🔒 | Appointment statistics |
| `GET` | `/appointments/today` | 🔒 | Today's schedule |
| `GET` | `/appointments/:id` | 🔒 | Get appointment details |
| `PATCH` | `/appointments/:id` | 🔒 | Update status or notes |
| `DELETE` | `/appointments/:id` | 🔒 | Delete appointment |

### Doctors

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/doctors` | Public | List active doctors |
| `GET` | `/doctors/:id` | Public | Doctor detail |
| `GET` | `/doctors/admin/all` | 🔒 | All doctors (incl. inactive) |
| `POST` | `/doctors` | 🔒 | Create doctor (with photo upload) |
| `PUT` | `/doctors/:id` | 🔒 | Update doctor profile |
| `DELETE` | `/doctors/:id` | 🔒 | Remove doctor |

### Blog

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/blog` | Public | List published posts (paginated) |
| `GET` | `/blog/categories` | Public | Available categories |
| `GET` | `/blog/slug/:slug` | Public | Post by slug (increments view count) |
| `GET` | `/blog/:id` | 🔒 | Post by ID |
| `POST` | `/blog` | 🔒 | Create post (with image upload) |
| `PUT` | `/blog/:id` | 🔒 | Update post |
| `DELETE` | `/blog/:id` | 🔒 | Delete post |

### Gallery

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/gallery` | Public | List images (paginated) |
| `GET` | `/gallery/featured` | Public | Featured images |
| `GET` | `/gallery/categories` | Public | Available categories |
| `POST` | `/gallery` | 🔒 | Upload image |
| `PATCH` | `/gallery/:id` | 🔒 | Update image metadata |
| `DELETE` | `/gallery/:id` | 🔒 | Delete image |

### Contact

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/contact` | Public | Submit patient inquiry (rate-limited: 3/hr) |
| `GET` | `/contact` | 🔒 | List submissions (paginated) |
| `GET` | `/contact/stats` | 🔒 | Inquiry statistics |
| `GET` | `/contact/:id` | 🔒 | Submission detail |
| `PATCH` | `/contact/:id` | 🔒 | Mark read / starred |
| `DELETE` | `/contact/:id` | 🔒 | Delete submission |

### Settings

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/settings` | Public | All clinic settings |
| `GET` | `/settings/:key` | Public | Single setting by key |
| `PUT` | `/settings` | 🔒 | Bulk update settings |
| `PUT` | `/settings/:key` | 🔒 | Update single setting |
| `DELETE` | `/settings/:key` | 🔒 | Delete setting |

### Health Check

```
GET /health
```

Returns server status and uptime.

---

## Available Scripts

### Frontend (project root)

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Next.js development server with hot reload |
| `npm run build` | Create optimized production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint across the codebase |

### Backend (`server/`)

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Express with `tsx watch` for hot reload |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm run start` | Run the compiled production server |
| `npm run seed` | Initialize and seed the SQLite database |
| `npm run migrate` | Run pending database migrations |

---

## Deployment

### Frontend — Vercel (recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Set `NEXT_PUBLIC_API_URL` to the public backend URL in the Vercel project's environment variables.

### Backend — Node.js Server

```bash
cd server

# Build TypeScript
npm run build

# Start the production server
NODE_ENV=production npm run start
```

The backend can be hosted on any Node.js-compatible platform (Render, Railway, Heroku, AWS EC2, DigitalOcean Droplet, etc.).

### Environment Checklist for Production

- [ ] Set `NODE_ENV=production`
- [ ] Use a strong, unique `JWT_SECRET` (≥ 32 random characters)
- [ ] Configure `SMTP_*` variables for transactional email
- [ ] Set `FRONTEND_URL` to the production frontend domain for CORS
- [ ] Mount a persistent volume for `DB_PATH` and `UPLOAD_DIR`
- [ ] Place the backend behind a reverse proxy (nginx / Caddy) with TLS
- [ ] Change the default admin password immediately after first login

---

## Security

The platform implements multiple layers of security:

| Layer | Mechanism |
|-------|-----------|
| **Authentication** | JWT tokens signed with `JWT_SECRET`; `bcrypt` password hashing |
| **Authorization** | Role-based access control on all protected routes |
| **HTTP Headers** | Helmet.js sets security headers (CSP, HSTS, X-Frame-Options, etc.) |
| **CORS** | Restricted to the configured `FRONTEND_URL` origin |
| **Rate Limiting** | Global API limit + stricter limits on `/auth/login` and `/contact` |
| **Input Validation** | All request bodies validated with Zod schemas before processing |
| **File Uploads** | MIME-type and file-size validation; Sharp resizes images server-side |
| **SQL Safety** | Parameterized queries via `better-sqlite3` prepared statements |
| **Cookies** | `HttpOnly`, `Secure`, `SameSite=Strict` cookie attributes |

### Reporting Vulnerabilities

Please do **not** open a public GitHub issue for security vulnerabilities. Instead, contact the maintainers directly at the email listed in the repository's contact section.

---

## Contributing

Contributions are welcome! Please follow this workflow:

1. **Fork** the repository and create a feature branch:
   ```bash
   git checkout -b feat/your-feature-name
   ```
2. **Commit** your changes using [Conventional Commits](https://www.conventionalcommits.org/):
   ```
   feat: add appointment reminder email template
   fix: correct doctor availability timezone handling
   ```
3. **Lint** your code before pushing:
   ```bash
   npm run lint
   ```
4. **Open a Pull Request** with a clear description of the change and the problem it solves.

### Code Style

- TypeScript strict mode is enforced across both frontend and backend.
- Follow existing naming conventions (camelCase for variables, PascalCase for components/classes).
- Keep components small and single-responsibility.
- Add Zod validation schemas for any new API endpoints.

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

<div align="center">

Built with ❤️ for modern dental practices.

</div>
