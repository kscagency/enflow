# Enflow — Coder Context

## Project
Enflow is a white-label agency client portal SaaS. Agencies give clients a single branded login for Google Drive files and campaign reporting.

## Stack
- Next.js 14+ (App Router, TypeScript)
- Tailwind CSS
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

## MVP Scope
- Agency dashboard: client management, Drive folders, report embeds, branding settings
- Client portal: file browser, report viewer, notifications, account settings
- White-label: subdomain routing, CSS variable injection, tier gating
- Auth: Supabase Auth for both agency staff and clients (invite flow)

## Exclusions
No chat, no invoicing, no native charts, no mobile app, no AI summarizer
