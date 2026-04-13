import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { ActivityFeed } from '@/components/portal/ActivityFeed'
import { EmptyState } from '@/components/ui/EmptyState'
import type { Client, Notification } from '@/types/database'

const MOCK_CLIENT: Client = {
  id: 'preview-client',
  agency_id: 'preview-agency',
  auth_user_id: null,
  name: 'Acme Corp',
  contact_name: 'Jane Smith',
  contact_email: 'jane@acmecorp.com',
  phone: null,
  invite_status: 'accepted',
  services: null,
  retainer_value: null,
  contract_start_date: null,
  campaign_goals: null,
  internal_notes: null,
  invited_at: null,
  created_at: new Date().toISOString(),
}

export default async function PortalPage() {
  let client: Client = MOCK_CLIENT
  let notifications: Notification[] = []

  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      const { data: clientData } = await supabase
        .from('clients')
        .select('*')
        .eq('auth_user_id', user.id)
        .single()

      if (clientData) {
        client = clientData as Client

        const { data: notificationsData } = await supabase
          .from('notifications')
          .select('*')
          .eq('client_id', client.id)
          .order('created_at', { ascending: false })
          .limit(10)

        notifications = (notificationsData as Notification[]) ?? []
      }
    }
  } catch {
    // No Supabase connection — render with mock data for UI preview
  }

  return (
    <div>
      <h1
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.375rem',
          fontWeight: 700,
          color: 'var(--brand-dark)',
          margin: '0 0 0.375rem',
        }}
      >
        Welcome back, {client.contact_name ?? client.name}
      </h1>
      <p
        style={{
          color: 'rgba(26,58,58,0.55)',
          fontSize: '0.875rem',
          margin: '0 0 2rem',
        }}
      >
        Here&rsquo;s what&rsquo;s new in your portal.
      </p>

      {/* Quick links */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '0.875rem',
          marginBottom: '2.5rem',
        }}
      >
        <Link href="/portal/files" style={{ textDecoration: 'none' }}>
          <div
            style={{
              padding: '1.25rem',
              border: '0.5px solid rgba(26,58,58,0.12)',
              borderRadius: 'var(--radius-default)',
              background: '#fff',
              cursor: 'pointer',
              transition: 'box-shadow var(--transition-fast)',
            }}
          >
            <div style={{ color: 'var(--brand-primary)', marginBottom: '0.625rem' }}>
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <p style={{ margin: 0, fontWeight: 600, fontSize: '0.9rem', color: 'var(--brand-dark)' }}>
              View Files
            </p>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.775rem', color: 'rgba(26,58,58,0.5)' }}>
              Browse shared folders
            </p>
          </div>
        </Link>

        <Link href="/portal/reports" style={{ textDecoration: 'none' }}>
          <div
            style={{
              padding: '1.25rem',
              border: '0.5px solid rgba(26,58,58,0.12)',
              borderRadius: 'var(--radius-default)',
              background: '#fff',
              cursor: 'pointer',
              transition: 'box-shadow var(--transition-fast)',
            }}
          >
            <div style={{ color: 'var(--brand-primary)', marginBottom: '0.625rem' }}>
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <path d="M3 9h18M9 21V9" />
              </svg>
            </div>
            <p style={{ margin: 0, fontWeight: 600, fontSize: '0.9rem', color: 'var(--brand-dark)' }}>
              View Report
            </p>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.775rem', color: 'rgba(26,58,58,0.5)' }}>
              See your analytics
            </p>
          </div>
        </Link>
      </div>

      {/* What's New */}
      <h2
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1rem',
          fontWeight: 700,
          color: 'var(--brand-dark)',
          margin: '0 0 0.875rem',
        }}
      >
        What&rsquo;s New
      </h2>

      {notifications.length === 0 ? (
        <EmptyState title="All caught up" description="No new notifications yet." />
      ) : (
        <ActivityFeed notifications={notifications} />
      )}
    </div>
  )
}
