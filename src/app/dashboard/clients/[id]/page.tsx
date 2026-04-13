import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ClientBrief } from '@/components/dashboard/ClientBrief'
import { ClientDriveFolders } from '@/components/dashboard/ClientDriveFolders'
import { ClientReportEmbed } from '@/components/dashboard/ClientReportEmbed'
import { ClientDetailTabs } from '@/components/dashboard/ClientDetailTabs'
import { addDriveFolder, saveReportEmbed } from './actions'
import type { Client, DriveFolder, ReportEmbed } from '@/types/database'

interface PageProps {
  params: Promise<{ id: string }>
}

const MOCK_CLIENT: Client = {
  id: 'preview',
  agency_id: 'preview-agency',
  auth_user_id: null,
  name: 'Acme Corp (Preview)',
  contact_name: 'Jane Smith',
  contact_email: 'jane@acmecorp.com',
  phone: null,
  invite_status: 'accepted',
  services: 'SEO, PPC, Social Media',
  retainer_value: 5000,
  contract_start_date: '2024-01-01',
  campaign_goals: 'Increase organic traffic by 40% in Q2',
  internal_notes: null,
  invited_at: null,
  created_at: new Date().toISOString(),
}

export default async function ClientDetailPage({ params }: PageProps) {
  const { id } = await params

  let client: Client = MOCK_CLIENT
  let folders: DriveFolder[] = []
  let embeds: ReportEmbed[] = []

  try {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      // UI preview — use mock data
    } else {
      const { data: agencyUser } = await supabase
        .from('agency_users')
        .select('agency_id')
        .eq('auth_user_id', user.id)
        .single()

      if (!agencyUser) notFound()

      const { data: clientData } = await supabase
        .from('clients')
        .select('*')
        .eq('id', id)
        .eq('agency_id', agencyUser.agency_id)
        .single()

      if (!clientData) notFound()

      client = clientData as Client

      const [{ data: foldersData }, { data: embedsData }] = await Promise.all([
        supabase.from('drive_folders').select('*').eq('client_id', id).order('created_at'),
        supabase.from('report_embeds').select('*').eq('client_id', id).order('updated_at', { ascending: false }),
      ])

      folders = (foldersData as DriveFolder[]) ?? []
      embeds = (embedsData as ReportEmbed[]) ?? []
    }
  } catch {
    // No Supabase connection — render with mock data for UI preview
  }

  const isAccepted = client.invite_status === 'accepted'

  return (
    <div>
      {/* Back + header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <Link
          href="/dashboard"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            fontSize: '0.825rem',
            color: 'rgba(26,58,58,0.5)',
            textDecoration: 'none',
            marginBottom: '1rem',
            transition: 'color var(--transition-fast)',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          All Clients
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.375rem',
              fontWeight: 700,
              color: 'var(--brand-dark)',
              margin: 0,
            }}
          >
            {client.name}
          </h1>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0.2rem 0.6rem',
              borderRadius: '999px',
              fontSize: '0.75rem',
              fontWeight: 500,
              background: isAccepted ? 'rgba(16,185,129,0.1)' : 'rgba(250,199,117,0.2)',
              color: isAccepted ? '#059669' : '#92580a',
              border: `0.5px solid ${isAccepted ? 'rgba(16,185,129,0.3)' : 'rgba(250,199,117,0.5)'}`,
            }}
          >
            {isAccepted ? 'Accepted' : 'Pending'}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <ClientDetailTabs
        brief={<ClientBrief client={client} />}
        files={<ClientDriveFolders folders={folders} clientId={id} onAdd={addDriveFolder} />}
        report={<ClientReportEmbed embeds={embeds} clientId={id} onSave={saveReportEmbed} />}
      />
    </div>
  )
}
