-- ========================================================
-- ETHIOPIAN SIGNATURE COFFEE — Supabase Database Schema
-- Run this in your Supabase Project -> SQL Editor
-- ========================================================

-- 1. Create Inquiries Table (Client Consultation & Training Leads)
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null check (char_length(full_name) >= 2),
  phone text not null check (char_length(phone) >= 7),
  email text,
  service text not null,
  notes text,
  status text not null default 'new' check (status in ('new', 'contacted', 'scheduled', 'completed', 'archived')),
  preferred_contact_method text default 'whatsapp' check (preferred_contact_method in ('whatsapp', 'phone', 'email', 'telegram'))
);

-- 2. Performance Indexes
create index if not exists idx_inquiries_created_at on public.inquiries (created_at desc);
create index if not exists idx_inquiries_service on public.inquiries (service);
create index if not exists idx_inquiries_status on public.inquiries (status);

-- 3. Enable Row Level Security (RLS)
alter table public.inquiries enable row level security;

-- Policy 1: Allow public visitors (unauthenticated) to submit new inquiries
create policy "Allow anonymous visitors to insert inquiries"
  on public.inquiries
  for insert
  to anon, authenticated
  with check (true);

-- Policy 2: Restrict viewing inquiries to authenticated administrators only
create policy "Allow authenticated admin users to read inquiries"
  on public.inquiries
  for select
  to authenticated
  using (true);

-- Policy 3: Restrict updating status to authenticated administrators only
create policy "Allow authenticated admin users to update inquiries"
  on public.inquiries
  for update
  to authenticated
  using (true);

-- 4. Optional: Barista Academy Course Enrollments Table (for syllabus / workshops)
create table if not exists public.academy_enrollments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  student_name text not null,
  phone text not null,
  email text,
  course_level text not null default 'Stage 01: Sensory & Cupping Fundamentals',
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'graduated', 'cancelled'))
);

alter table public.academy_enrollments enable row level security;

create policy "Allow public to enroll in academy"
  on public.academy_enrollments
  for insert
  to anon, authenticated
  with check (true);

create policy "Allow admin to view academy enrollments"
  on public.academy_enrollments
  for select
  to authenticated
  using (true);
