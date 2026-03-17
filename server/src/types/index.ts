import { Request } from 'express';

export interface AdminUser {
  id: number;
  email: string;
  password_hash: string;
  name: string;
  role: string;
  created_at: string;
  last_login: string | null;
}

export interface Doctor {
  id: number;
  name: string;
  title: string;
  specialization: string;
  bio: string | null;
  education: string; // JSON string
  languages: string; // JSON string
  photo_url: string | null;
  availability: string; // JSON string
  is_active: number;
  created_at: string;
  updated_at: string;
}

export interface Appointment {
  id: number;
  patient_name: string;
  patient_email: string;
  patient_phone: string;
  service: string;
  doctor_id: number | null;
  appointment_date: string;
  appointment_time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'deleted';
  notes: string | null;
  google_event_id: string | null;
  reminder_sent: number;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  author_id: number | null;
  category: string;
  tags: string; // JSON string
  featured_image_url: string | null;
  status: 'draft' | 'published';
  read_time: number | null;
  view_count: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface GalleryImage {
  id: number;
  url: string;
  thumbnail_url: string | null;
  category: string;
  caption: string | null;
  alt_text: string | null;
  sort_order: number;
  is_featured: number;
  created_at: string;
}

export interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  service_interest: string | null;
  message: string;
  is_read: number;
  is_starred: number;
  replied_at: string | null;
  ip_address: string | null;
  submitted_at: string;
}

export interface ClinicSetting {
  key: string;
  value: string;
  updated_at: string;
}

export interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
    name: string;
    role: string;
  };
}

export interface JwtPayload {
  id: number;
  email: string;
  name: string;
  role: string;
  iat?: number;
  exp?: number;
}

export interface PaginationQuery {
  page?: string;
  limit?: string;
}

export interface AppointmentWithDoctor extends Appointment {
  doctor_name?: string;
}
