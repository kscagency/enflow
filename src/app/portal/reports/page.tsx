import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ReportViewer } from '@/components/portal/ReportViewer'
import { EmptyState } from '@/components/ui/EmptyState'
import type { Client, ReportEmbed } from '@/types/database'

export default async function PortalReportsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: clientData } = await supabase
    .from('clients')
    .select('*')
    .eq('auth_user_id', user.id)
    .single()

  if (!clientData) redirect('/login')

  const client = clientData as Client

  const { data: embedsData } = await supabase
    .from('report_embeds')
    .select('*')
    .eq('client_id', client.id)
    .order('updated_at', { ascending: false })

  const embeds = (embedsData as ReportEmbed[]) ?? []

  // Use the most recent embed with a URL
  const activeEmbed = embeds.find(e => e.embed_url)

  return (
    <div>
      <h1
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.375rem',
          fontWeight: 700,
          color: 'var(--brand-dark)',
          margin: '0 0 1.5rem',
        }}
      >
        Reports
      </h1>

      {!activeEmbed ? (
        <EmptyState
          title="No reports available yet"
          description="Check back soon — your agency will publish your report here."
          icon={
            <svg
              width="28"
              height="28"
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
          }
        />
      ) : (
        <ReportViewer embedUrl={activeEmbed.embed_url} label={activeEmbed.label} />
      )}
    </div>
  )
}
