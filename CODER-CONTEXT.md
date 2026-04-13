# Enflow — Coder Context

## Project
Enflow is a white-label agency client portal SaaS. Agencies give clients a single branded login for Google Drive files and campaign reporting.

## Stack
- Next.js 16 (App Router, TypeScript, Turbopack)
- Tailwind CSS v4
- Supabase (PostgreSQL, Auth, RLS)
- Google Drive API

## Design System
- Fonts: Bricolage Grotesque (700, headings), Instrument Sans (400/500, body)
- Primary: #0A7B7B (teal)
- Accent: #12BFBF (bright teal)
- Dark surfaces: #1A3A3A, #1A3535
- Background: #EDEEED (off-white)
- Login bg: #060909 (near-black)
- Error: #E24B4A, Warning: #FAC775, Info: #185FA5
- Border radius: 8px default
- Borders: 0.5px hairline
- Transitions: 0.15s

## Database (Supabase)
7 tables with RLS: PLAN_TIERS, AGENCIES, AGENCY_USERS, CLIENTS, DRIVE_FOLDERS, REPORT_EMBEDS, NOTIFICATIONS

## MVP Scope — ALL 18 STORIES COMPLETE ✓
- Batch 1: Foundation — design system (globals.css), Supabase client/server, schema (supabase/schema.sql), types
- Batch 2: Auth + Layouts — middleware (proxy.ts), login page/actions, dashboard layout, portal layout
- Batch 3: Agency Dashboard — client list, client detail tabs (brief, Drive folders, report embeds), branding form
- Batch 4: Client Portal — overview (activity feed), file browser (Drive), report viewer (embed), notifications
- Batch 5: White-label engine + Account settings
  - US-017: subdomain detection in proxy.ts → cookie → root layout reads cookie → getAgencyBranding() → <style> injection
  - US-018: PasswordChangeForm (shared), dashboard/settings page, portal/settings page

## Key Files
- `src/proxy.ts` — auth middleware + subdomain detection → sets `enflow-subdomain` cookie
- `src/lib/branding.ts` — getAgencyBranding(), generateBrandCSS() with tier gating
- `src/app/layout.tsx` — reads subdomain cookie, injects brand CSS into <head>
- `src/components/shared/PasswordChangeForm.tsx` — client component, re-auth + updateUser
- `src/app/dashboard/settings/page.tsx` — agency user settings
- `src/app/portal/settings/page.tsx` — client settings

## Exclusions
No chat, no invoicing, no native charts, no mobile app, no AI summarizer

## Build Status
All 14 routes build cleanly. Zero TypeScript errors. Branch: claude/epic-fermat.
