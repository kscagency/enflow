# Enflow — Ralph Loop Build Context

All 18 MVP user stories shipped across 5 batches on branch `claude/epic-fermat`.

---

## Batch 1 — Foundation
**Stories:** US-001 to US-004  
**Commit:** `feat: Batch 1 — foundation (design system, Supabase, schema, types)`

- `src/app/globals.css` — full design system: CSS vars, Tailwind v4 theme config, font imports
- `src/lib/supabase/client.ts` + `server.ts` — browser and server Supabase clients using `@supabase/ssr`
- `supabase/schema.sql` — all 7 tables with RLS policies
- `src/types/database.ts` + `src/types/index.ts` — TypeScript interfaces for all entities

**Key decisions:**
- Inline `style=` props used throughout (not Tailwind classes) to keep CSS variables working at runtime without JIT purging
- `@supabase/ssr` (not deprecated `@supabase/auth-helpers-nextjs`) for Next.js 16 compatibility

---

## Batch 2 — Auth + Layouts
**Stories:** US-005 to US-007  
**Commit:** `feat: Batch 2 — auth + layouts (middleware, login, dashboard, portal)`

- `src/proxy.ts` — auth middleware (checks Supabase session, redirects unauthenticated users)
  - Note: named `proxy.ts` (not `middleware.ts`) — exports `proxy` function + `config`; Next.js picks this up via the `matcher`
- `src/app/login/page.tsx` + `actions.ts` — login form with server action, logout action
- `src/app/dashboard/layout.tsx` — collapsible sidebar + header shell
- `src/app/portal/layout.tsx` — portal header + nav shell

---

## Batch 3 — Agency Dashboard
**Stories:** US-008 to US-011  
**Commit:** `feat: Batch 3 — agency dashboard (clients, detail, branding)`

- `src/app/dashboard/page.tsx` — overview with client count stats
- `src/app/dashboard/clients/[id]/page.tsx` — tabbed client detail
- `src/app/dashboard/branding/page.tsx` — branding settings form
- Components: `ClientList`, `ClientCard`, `AddClientModal`, `ClientDetailTabs`, `ClientBrief`, `ClientDriveFolders`, `ClientReportEmbed`, `BrandingForm`, `Sidebar`, `Header`
- `DashboardPageClient` — client wrapper for the dashboard overview (needed `useState` for modal)

---

## Batch 4 — Client Portal
**Stories:** US-012 to US-016  
**Commit:** `feat: Batch 4 — client portal (overview, files, reports, notifications)`

- `src/app/portal/overview/page.tsx` — activity feed
- `src/app/portal/files/page.tsx` — Google Drive folder browser
- `src/app/portal/reports/page.tsx` — embedded report viewer
- `src/app/portal/notifications/page.tsx` — notification list with mark-as-read
- Components: `ActivityFeed`, `FileBrowser`, `FolderCard`, `ReportViewer`, `NotificationList`, `PortalHeader`, `PortalNav`
- Shared UI: `EmptyState`, `UpgradeBadge`

---

## Batch 5 — White-Label Engine + Account Settings (FINAL)
**Stories:** US-017 to US-018  
**Commit:** `feat: Batch 5 — white-label engine + account settings (MVP COMPLETE)`

### US-017: White-Label Subdomain Routing + CSS Variable Injection
- `src/proxy.ts` — added subdomain extraction from `host` header; sets `enflow-subdomain` cookie (httpOnly: false so client can also read it if needed)
- `src/lib/branding.ts` — `getAgencyBranding(subdomain)` queries `agencies` table with `plan_tiers` join; `generateBrandCSS(agency, tier)` builds `:root { ... }` string with tier gating:
  - Starter: primary color + logo only
  - Growth+: accent color (if `tier.accent_color`)
  - Pro: background color, text color (if `tier.full_brand_kit`), custom font (if `tier.custom_font`)
- `src/app/layout.tsx` — converted to async server component; reads `enflow-subdomain` cookie; if present, fetches branding and injects `<style>` tag into `<head>` before body renders; also switched from `Geist` to `Bricolage_Grotesque` + `Instrument_Sans`

### US-018: Account Settings Pages
- `src/components/shared/PasswordChangeForm.tsx` — `'use client'` component; validates (8 char min, match), re-authenticates with current password via `signInWithPassword`, then calls `auth.updateUser({ password })`; success/error states
- `src/app/dashboard/settings/page.tsx` — reads `agency_users` row for display name/email; renders profile (read-only) + `PasswordChangeForm` + logout button
- `src/app/portal/settings/page.tsx` — reads `clients` row for `contact_name`/`contact_email`; same structure

---

## What's Next (Post-MVP)
- Run `supabase/schema.sql` against a Supabase project and set `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`
- Deploy to Vercel; configure wildcard subdomain `*.enflow.app` → same deployment
- Seed a test agency with subdomain to verify CSS injection end-to-end
- Apply `design-taste` skill for final UI polish pass
- Set up Google Drive OAuth and replace stubbed Drive folder data
