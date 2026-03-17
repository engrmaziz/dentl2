// ─── Service Types ───────────────────────────────────────────────────────────
export interface ServiceFAQ {
  q: string;
  a: string;
}

export interface ServiceStep {
  step: number;
  title: string;
  description: string;
}

export interface Service {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  whatIsIt: string;
  whoNeedsIt: string;
  procedure: ServiceStep[];
  benefits: string[];
  faqs: ServiceFAQ[];
  duration: string;
  priceRange: string;
  icon: string;
  relatedServices: string[];
}

// ─── Team Types ──────────────────────────────────────────────────────────────
export interface DoctorAvailability {
  [day: string]: string[];
}

export interface Doctor {
  id: number;
  name: string;
  title: string;
  specialization: string;
  bio: string[];
  education: string[];
  experience: number;
  languages: string[];
  availability: DoctorAvailability;
  image: string;
}

// ─── Testimonial Types ───────────────────────────────────────────────────────
export interface TestimonialAvatar {
  initials: string;
  color: string;
}

export interface Testimonial {
  id: number;
  name: string;
  treatment: string;
  rating: number;
  text: string;
  date: string;
  avatar: TestimonialAvatar;
}

// ─── Blog Types ──────────────────────────────────────────────────────────────
export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  readTime: number;
  date: string;
  tags: string[];
  featuredImage: string;
}

// ─── Navigation Types ────────────────────────────────────────────────────────
export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

// ─── Animation Types ─────────────────────────────────────────────────────────
export interface AnimationPreset {
  opacity?: number;
  y?: number;
  x?: number;
  scale?: number;
  filter?: string;
  duration: number;
  ease: string;
}

export interface ScrollTriggerConfig {
  trigger: string | Element;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  markers?: boolean;
}

// ─── Form Types ──────────────────────────────────────────────────────────────
export interface AppointmentForm {
  name: string;
  email: string;
  phone: string;
  service: string;
  doctor?: string;
  date: string;
  time: string;
  message?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// ─── Store Types ─────────────────────────────────────────────────────────────
export interface CursorState {
  x: number;
  y: number;
  isHovering: boolean;
  isClicking: boolean;
  isOnImage: boolean;
  cursorText: string;
}

export interface AppState {
  isMenuOpen: boolean;
  isTransitioning: boolean;
  scrollY: number;
  cursor: CursorState;
  setMenuOpen: (open: boolean) => void;
  setTransitioning: (t: boolean) => void;
  setScrollY: (y: number) => void;
  setCursor: (cursor: Partial<CursorState>) => void;
}
