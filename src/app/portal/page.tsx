import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import type { Client, Notification } from '@/types/database'

const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 'n1', client_id: 'preview', agency_id: null, type: 'report_ready', message: 'Your March campaign report is ready to view.', is_read: false, created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString() },
  { id: 'n2', client_id: 'preview', agency_id: null, type: 'file_uploaded', message: '3 new files added to your Assets folder.', is_read: false, created_at: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString() },
  { id: 'n3', client_id: 'preview', agency_id: null, type: 'report_ready', message: 'Your February campaign report was uploaded.', is_read: true, created_at: new Date('2026-02-28T10:05:00Z').toISOString() },
]

function formatNotifTime(iso: string) {
  const d = new Date(iso)
  const now = new Date()
  const diffH = Math.floor((now.getTime() - d.getTime()) / 3600000)
  if (diffH < 24) return `Today · ${d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`
  if (diffH < 48) return `Yesterday · ${d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' · ' + d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

export default async function PortalPage() {
  let clientName = 'Marcus'
  let notifications: Notification[] = MOCK_NOTIFICATIONS

  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data: clientData } = await supabase.from('clients').select('*').eq('auth_user_id', user.id).single()
      if (clientData) {
        const client = clientData as Client
        clientName = client.contact_name?.split(' ')[0] ?? client.name
        const { data: notificationsData } = await supabase.from('notifications').select('*').eq('client_id', client.id).order('created_at', { ascending: false }).limit(10)
        notifications = (notificationsData as Notification[]) ?? MOCK_NOTIFICATIONS
      }
    }
  } catch {
    // No Supabase — use mock data
  }

  const unreadCount = notifications.filter(n => !n.is_read).length

  return (
    <>
      {/* Topbar */}
      <div style={{ background: '#fff', borderBottom: '0.5px solid #e0e3e0', padding: '0 28px', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '15px', fontWeight: 700, color: '#080C0C', letterSpacing: '-0.01em' }}>Overview</span>
        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#F5F6F4', border: '0.5px solid #e0e3e0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 1a5 5 0 00-5 5v2.5L2 10h12l-1-1.5V6a5 5 0 00-5-5z" stroke="#6b6b6a" strokeWidth="1.2"/><path d="M6.5 13a1.5 1.5 0 003 0" stroke="#6b6b6a" strokeWidth="1.2" strokeLinecap="round"/></svg>
          {unreadCount > 0 && <div style={{ position: 'absolute', top: '6px', right: '6px', width: '6px', height: '6px', borderRadius: '50%', background: '#E24B4A', border: '1.5px solid #fff' }} />}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px', background: '#F5F6F4' }}>
        <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '24px', fontWeight: 700, color: '#080C0C', letterSpacing: '-0.02em', margin: '0 0 4px' }}>
          Welcome back, {clientName}.
        </h1>
        <p style={{ fontSize: '13px', color: '#888', margin: '0 0 24px' }}>
          Here&apos;s what&apos;s happening with your account.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          {/* Files card */}
          <div style={{ background: '#fff', border: '0.5px solid #e0e3e0', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 18px 12px', borderBottom: '0.5px solid #f0f0ee' }}>
              <span style={{ fontSize: '13px', fontWeight: 500, color: '#080C0C' }}>Files</span>
              <span style={{ fontSize: '11px', color: '#aaa' }}>3 folders · Last updated today</span>
            </div>
            <div style={{ padding: '14px 18px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {[
                { name: 'Assets', count: '12 files' },
                { name: 'Reports', count: '4 files' },
                { name: 'Deliverables', count: '7 files' },
              ].map(folder => (
                <Link key={folder.name} href="/portal/files" style={{ textDecoration: 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#F5F6F4', border: '0.5px solid #e0e3e0', borderRadius: '8px', padding: '8px 12px', cursor: 'pointer', transition: 'background 0.15s' }}>
                    <div style={{ width: '22px', height: '22px', borderRadius: '5px', background: 'rgba(10,123,123,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 3.5A1.5 1.5 0 012.5 2h2l1 1.5H9.5A1.5 1.5 0 0111 5v4A1.5 1.5 0 019.5 10.5h-7A1.5 1.5 0 011 9V3.5z" fill="#0A7B7B" opacity="0.7"/></svg>
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 500, color: '#080C0C' }}>{folder.name}</div>
                      <div style={{ fontSize: '11px', color: '#aaa' }}>{folder.count}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Campaign report card */}
          <div style={{ background: '#fff', border: '0.5px solid #e0e3e0', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 18px 12px', borderBottom: '0.5px solid #f0f0ee' }}>
              <span style={{ fontSize: '13px', fontWeight: 500, color: '#080C0C' }}>Campaign report</span>
              <span style={{ fontSize: '11px', color: '#aaa' }}>Updated Mar 18, 2026</span>
            </div>
            <div style={{ padding: '14px 18px' }}>
              <div style={{ background: '#F5F6F4', borderRadius: '8px', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                  {[
                    { value: '12,480', label: 'Organic sessions' },
                    { value: '284', label: 'Leads generated' },
                    { value: '$18.40', label: 'Cost per lead' },
                  ].map(stat => (
                    <div key={stat.label}>
                      <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '20px', fontWeight: 700, color: '#080C0C', letterSpacing: '-0.01em', margin: '0 0 2px' }}>{stat.value}</p>
                      <p style={{ fontSize: '11px', color: '#888', margin: 0 }}>{stat.label}</p>
                    </div>
                  ))}
                </div>
                <Link href="/portal/reports" style={{ textDecoration: 'none' }}>
                  <button style={{
                    fontFamily: "'Instrument Sans', sans-serif", fontSize: '12px', fontWeight: 500,
                    color: '#fff', background: '#0A7B7B', border: 'none', borderRadius: '8px',
                    padding: '8px 14px', cursor: 'pointer', whiteSpace: 'nowrap',
                    position: 'relative', overflow: 'hidden', transition: 'background 0.15s',
                  }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '0.5px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4) 50%, transparent)' }} />
                    <span style={{ position: 'relative' }}>View report →</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Notifications — full width */}
          <div style={{ gridColumn: '1 / -1', background: '#fff', border: '0.5px solid #e0e3e0', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 18px 12px', borderBottom: '0.5px solid #f0f0ee' }}>
              <span style={{ fontSize: '13px', fontWeight: 500, color: '#080C0C' }}>Recent notifications</span>
              <Link href="/portal/notifications" style={{ fontSize: '12px', fontWeight: 500, color: '#0A7B7B', textDecoration: 'none' }}>View all</Link>
            </div>
            {notifications.slice(0, 3).map(notif => (
              <div key={notif.id} style={{
                display: 'flex', alignItems: 'flex-start', gap: '12px',
                padding: '12px 18px', borderBottom: '0.5px solid #f5f5f3',
                borderLeft: notif.is_read ? 'none' : '2.5px solid #0A7B7B',
                background: notif.is_read ? '#fff' : 'rgba(10,123,123,0.02)',
              }}>
                <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: notif.is_read ? 'transparent' : '#0A7B7B', marginTop: '4px', flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: '13px', color: notif.is_read ? '#888' : '#080C0C', margin: '0 0 3px', lineHeight: 1.4 }}>{notif.message}</p>
                  <p style={{ fontSize: '11px', color: '#bbb', margin: 0 }}>{formatNotifTime(notif.created_at)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
