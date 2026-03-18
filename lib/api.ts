// API client for Dentl admin dashboard

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('admin_token');
}

async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
}

// ── Types ──────────────────────────────────────────────────────────────────

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  service: string;
  doctor: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  email: string;
  phone: string;
  bio: string;
  photo?: string;
  status: 'active' | 'inactive';
  availability: Record<string, { from: string; to: string; available: boolean }>;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published';
  featuredImage?: string;
  author: string;
  publishedAt?: string;
  createdAt: string;
  views: number;
  seoTitle?: string;
  seoDescription?: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  category: string;
  alt: string;
  createdAt: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  starred: boolean;
  createdAt: string;
  replies?: { body: string; sentAt: string }[];
}

export interface ClinicSettings {
  clinicName: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  workingHours: Record<string, { open: string; close: string; closed: boolean }>;
  emailSettings: {
    smtpHost: string;
    smtpPort: number;
    smtpUser: string;
    fromName: string;
    fromEmail: string;
  };
  googleCalendar: {
    enabled: boolean;
    calendarId: string;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  perPage: number;
}

export interface LoginResponse {
  token: string;
  user: AdminUser;
}

// ── Auth ───────────────────────────────────────────────────────────────────

export const login = (email: string, password: string) =>
  apiFetch<LoginResponse>('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });

export const logout = () => {
  if (typeof window !== 'undefined') localStorage.removeItem('admin_token');
};

export const getCurrentUser = () =>
  apiFetch<{ user: AdminUser }>('/api/auth/me');

// ── Appointments ───────────────────────────────────────────────────────────

export const getAppointments = (params?: Record<string, string>) => {
  const qs = params ? '?' + new URLSearchParams(params).toString() : '';
  return apiFetch<PaginatedResponse<Appointment>>(`/api/appointments${qs}`);
};

export const createAppointment = (data: Omit<Appointment, 'id'>) =>
  apiFetch<Appointment>('/api/appointments', { method: 'POST', body: JSON.stringify(data) });

export const updateAppointment = (id: string, data: Partial<Appointment>) =>
  apiFetch<Appointment>(`/api/appointments/${id}`, { method: 'PUT', body: JSON.stringify(data) });

// ── Doctors ────────────────────────────────────────────────────────────────

export const getDoctors = () =>
  apiFetch<Doctor[]>('/api/doctors');

export const createDoctor = (data: Omit<Doctor, 'id'>) =>
  apiFetch<Doctor>('/api/doctors', { method: 'POST', body: JSON.stringify(data) });

export const updateDoctor = (id: string, data: Partial<Doctor>) =>
  apiFetch<Doctor>(`/api/doctors/${id}`, { method: 'PUT', body: JSON.stringify(data) });

// ── Blog ───────────────────────────────────────────────────────────────────

export const getBlogPosts = (params?: Record<string, string>) => {
  const qs = params ? '?' + new URLSearchParams(params).toString() : '';
  return apiFetch<PaginatedResponse<BlogPost>>(`/api/blog${qs}`);
};

export const createBlogPost = (data: Omit<BlogPost, 'id' | 'createdAt' | 'views'>) =>
  apiFetch<BlogPost>('/api/blog', { method: 'POST', body: JSON.stringify(data) });

export const updateBlogPost = (id: string, data: Partial<BlogPost>) =>
  apiFetch<BlogPost>(`/api/blog/${id}`, { method: 'PUT', body: JSON.stringify(data) });

// ── Gallery ────────────────────────────────────────────────────────────────

export const getGallery = (category?: string) => {
  const qs = category ? `?category=${encodeURIComponent(category)}` : '';
  return apiFetch<GalleryImage[]>(`/api/gallery${qs}`);
};

// ── Contacts ───────────────────────────────────────────────────────────────

export const getContacts = (params?: Record<string, string>) => {
  const qs = params ? '?' + new URLSearchParams(params).toString() : '';
  return apiFetch<ContactSubmission[]>(`/api/contacts${qs}`);
};

export const updateContact = (id: string, data: Partial<ContactSubmission>) =>
  apiFetch<ContactSubmission>(`/api/contacts/${id}`, { method: 'PUT', body: JSON.stringify(data) });

// ── Settings ───────────────────────────────────────────────────────────────

export const getSettings = () =>
  apiFetch<ClinicSettings>('/api/settings');

export const updateSettings = (data: Partial<ClinicSettings>) =>
  apiFetch<ClinicSettings>('/api/settings', { method: 'PUT', body: JSON.stringify(data) });
