import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { addDriveFolder, saveReportEmbed } from './actions'
import type { Client, DriveFolder, ReportEmbed } from '@/types/database'

interface PageProps {
  params: Promise<{ id: string }>
}

const MOCK_CLIENT: Client = {
  id: 'preview',
  agency_id: 'preview-agency',
  auth_user_id: null,
  name: 'Acme Creative',
  contact_name: 'Marcus Webb',
  contact_email: 'hello@acmecreative.com',
  phone: '+1 602 555 0184',
  invite_status: 'pending',
  services: 'SEO, Paid Social, Content',
  retainer_value: 4500,
  contract_start_date: '2026-03-01',
  campaign_goals: 'Increase organic traffic 30% by Q3',
  internal_notes: 'Prefers async updates. Report due 1st of each month.',
  invited_at: null,
  created_at: '2026-03-01T00:00:00Z',
}

const MOCK_FOLDERS: DriveFolder[] = [
  { id: '1', client_id: 'preview', drive_folder_id: 'f1', folder_name: 'Assets', folder_type: 'assets', created_at: new Date().toISOString() },
  { id: '2', client_id: 'preview', drive_folder_id: 'f2', folder_name: 'Reports', folder_type: 'reports', created_at: new Date().toISOString() },
  { id: '3', client_id: 'preview', drive_folder_id: 'f3', folder_name: 'Deliverables', folder_type: 'deliverables', created_at: new Date().toISOString() },
]

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function getInitials(name: string) {
  return name.split(/\s+/).map(w => w[0]).join('').toUpperCase().slice(0, 2)
}

export default async function ClientDetailPage({ params }: PageProps) {
  const { id } = await params

  let client: Client = MOCK_CLIENT
  let folders: DriveFolder[] = MOCK_FOLDERS
  let embeds: ReportEmbed[] = []

  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
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

  const initials = getInitials(client.name)
  const hasPortalAccess = client.invite_status === 'accepted'
  const activeEmbed = embeds.find(e => e.embed_url)

  // Silence unused variable warning
  void addDriveFolder
  void saveReportEmbed

  return (
    <>
      {/* Topbar */}
      <div style={{
        background: '#fff',
        borderBottom: '0.5px solid #e0e3e0',
        padding: '0 28px',
        height: '52px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <a href="/dashboard" style={{ fontSize: '13px', color: '#aaa', textDecoration: 'none' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#0A7B7B' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#aaa' }}>
            Clients
          </a>
          <span style={{ fontSize: '13px', color: '#ddd' }}>›</span>
          <span style={{ fontSize: '13px', fontWeight: 500, color: '#080C0C' }}>{client.name}</span>
        </div>
        <div style={{
          width: '32px', height: '32px', borderRadius: '8px',
          background: '#F5F6F4', border: '0.5px solid #e0e3e0',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', position: 'relative',
        }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M8 1a5 5 0 00-5 5v2.5L2 10h12l-1-1.5V6a5 5 0 00-5-5z" stroke="#6b6b6a" strokeWidth="1.2"/>
            <path d="M6.5 13a1.5 1.5 0 003 0" stroke="#6b6b6a" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          <div style={{ position: 'absolute', top: '6px', right: '6px', width: '6px', height: '6px', borderRadius: '50%', background: '#E24B4A', border: '1.5px solid #fff' }} />
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '24px 28px', flex: 1, overflowY: 'auto' }}>
        {/* Client header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '12px',
            background: 'rgba(10,123,123,0.12)', border: '0.5px solid rgba(10,123,123,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '15px', fontWeight: 700, color: '#0A7B7B',
            flexShrink: 0,
          }}>
            {initials}
          </div>
          <div>
            <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '22px', fontWeight: 700, color: '#080C0C', letterSpacing: '-0.02em', margin: '0 0 3px' }}>
              {client.name}
            </h1>
            <p style={{ fontSize: '12px', color: '#aaa', margin: 0 }}>
              {client.contact_email ? (
                <a href={`mailto:${client.contact_email}`} style={{ color: '#0A7B7B', textDecoration: 'none' }}>
                  {client.contact_email}
                </a>
              ) : null}
              {client.contact_email ? ' · ' : ''}
              Added {formatDate(client.created_at)}
            </p>
          </div>
        </div>

        {/* Invite banner */}
        {!hasPortalAccess && (
          <div style={{
            background: '#FAEEDA', border: '0.5px solid #FAC775', borderRadius: '10px',
            padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: '20px', gap: '16px',
          }}>
            <p style={{ fontSize: '12px', color: '#633806', lineHeight: 1.5, margin: 0 }}>
              <strong style={{ fontWeight: 500 }}>No portal access yet</strong> — send an invite when you&apos;re ready to give this client access.
            </p>
            <button style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: '12px', fontWeight: 500, color: '#fff',
              background: '#0A7B7B', border: 'none', borderRadius: '7px',
              padding: '7px 14px', cursor: 'pointer', position: 'relative', overflow: 'hidden',
              flexShrink: 0,
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '0.5px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4) 50%, transparent)' }} />
              <span style={{ position: 'relative' }}>Send invite</span>
            </button>
          </div>
        )}

        {/* 4-card grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          {/* Client Brief */}
          <div style={{ background: '#fff', border: '0.5px solid #e0e3e0', borderRadius: '12px', padding: '18px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <span style={{ fontSize: '12px', fontWeight: 500, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#aaa' }}>Client brief</span>
              <button style={{ fontSize: '11px', fontWeight: 500, color: '#0A7B7B', cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}>Edit</button>
            </div>
            <DetailRow label="Services" value={client.services ?? '—'} />
            <DetailRow label="Retainer" value={client.retainer_value ? `$${client.retainer_value.toLocaleString()} / month` : '—'} />
            <DetailRow label="Goals" value={client.campaign_goals ?? '—'} />
            <DetailRow label="Notes" value={client.internal_notes ?? '—'} muted />
          </div>

          {/* Contact Info */}
          <div style={{ background: '#fff', border: '0.5px solid #e0e3e0', borderRadius: '12px', padding: '18px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <span style={{ fontSize: '12px', fontWeight: 500, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#aaa' }}>Contact info</span>
              <button style={{ fontSize: '11px', fontWeight: 500, color: '#0A7B7B', cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}>Edit</button>
            </div>
            <DetailRow label="Name" value={client.contact_name ?? '—'} />
            <DetailRow label="Phone" value={client.phone ?? '—'} />
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '10px' }}>
              <span style={{ fontSize: '11px', color: '#aaa', minWidth: '80px', flexShrink: 0, marginTop: '1px' }}>Email</span>
              {client.contact_email ? (
                <a href={`mailto:${client.contact_email}`} style={{ fontSize: '13px', color: '#0A7B7B', textDecoration: 'none', lineHeight: 1.5 }}>
                  {client.contact_email}
                </a>
              ) : (
                <span style={{ fontSize: '13px', color: '#080C0C', lineHeight: 1.5 }}>—</span>
              )}
            </div>
            <DetailRow label="Role" value="Founder & CEO" />
          </div>

          {/* Drive Folders */}
          <div style={{ background: '#fff', border: '0.5px solid #e0e3e0', borderRadius: '12px', padding: '18px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <span style={{ fontSize: '12px', fontWeight: 500, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#aaa' }}>Drive folders</span>
              <button style={{ fontSize: '11px', fontWeight: 500, color: '#0A7B7B', cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}>Edit</button>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {folders.length > 0 ? folders.map(f => (
                <div key={f.id} style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  background: '#F5F6F4', border: '0.5px solid #e0e3e0', borderRadius: '7px',
                  padding: '6px 10px', fontSize: '12px', color: '#444',
                  cursor: 'pointer',
                }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0A7B7B', flexShrink: 0 }} />
                  {f.folder_name}
                </div>
              )) : (
                <p style={{ fontSize: '13px', color: '#aaa', margin: 0 }}>No folders linked</p>
              )}
            </div>
            {folders.length > 0 && (
              <p style={{ fontSize: '11px', color: '#bbb', marginTop: '12px', marginBottom: 0 }}>
                {folders.length} folders linked · Last synced today
              </p>
            )}
          </div>

          {/* Campaign Report */}
          <div style={{ background: '#fff', border: '0.5px solid #e0e3e0', borderRadius: '12px', padding: '18px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <span style={{ fontSize: '12px', fontWeight: 500, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#aaa' }}>Campaign report</span>
              <button style={{ fontSize: '11px', fontWeight: 500, color: '#0A7B7B', cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}>Edit</button>
            </div>
            {activeEmbed ? (
              <div style={{ fontSize: '12px', color: '#0A7B7B' }}>
                Report linked: {activeEmbed.label ?? 'Campaign Report'}
              </div>
            ) : (
              <div style={{
                background: '#F5F6F4', border: '0.5px dashed #cdd0ce', borderRadius: '8px',
                padding: '20px', textAlign: 'center',
              }}>
                <p style={{ fontSize: '12px', color: '#aaa', margin: '0 0 10px', lineHeight: 1.6 }}>
                  Paste an AgencyAnalytics or Looker Studio embed URL to display the report in the client portal.
                </p>
                <button style={{
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontSize: '12px', fontWeight: 500, color: '#0A7B7B',
                  background: '#fff', border: '0.5px solid rgba(10,123,123,0.3)',
                  borderRadius: '7px', padding: '7px 14px', cursor: 'pointer',
                }}>
                  Paste embed URL
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

function DetailRow({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '10px' }}>
      <span style={{ fontSize: '11px', color: '#aaa', minWidth: '80px', flexShrink: 0, marginTop: '1px' }}>{label}</span>
      <span style={{ fontSize: '13px', color: muted ? '#888' : '#080C0C', lineHeight: 1.5, fontStyle: muted ? 'italic' : 'normal' }}>
        {value}
      </span>
    </div>
  )
}
