import { createClient } from '@/lib/supabase/server'
import type { Client, ReportEmbed } from '@/types/database'

export default async function PortalReportsPage() {
  // Try to get real embed URL, but show native dashboard always
  let _activeEmbed: ReportEmbed | undefined

  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      const { data: clientData } = await supabase
        .from('clients').select('*').eq('auth_user_id', user.id).single()

      if (clientData) {
        const client = clientData as Client
        const { data: embedsData } = await supabase
          .from('report_embeds').select('*').eq('client_id', client.id)
          .order('updated_at', { ascending: false })
        const embeds = (embedsData as ReportEmbed[]) ?? []
        _activeEmbed = embeds.find(e => e.embed_url)
      }
    }
  } catch {
    // No Supabase connection — use mock data
  }

  const barData = [
    { label: 'Mar 1', height: 55, teal: false },
    { label: 'Mar 5', height: 70, teal: false },
    { label: 'Mar 9', height: 60, teal: false },
    { label: 'Mar 13', height: 80, teal: true, opacity: 0.7 },
    { label: 'Mar 17', height: 90, teal: true, opacity: 1 },
    { label: 'Mar 21', height: 85, teal: true, opacity: 0.8 },
    { label: 'Mar 25', height: 75, teal: true, opacity: 0.6 },
    { label: 'Mar 29', height: 65, teal: false },
  ]

  return (
    <>
      {/* Topbar */}
      <div style={{
        background: '#fff',
        borderBottom: '0.5px solid #e0e3e0',
        padding: '0 28px',
        height: '52px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '15px', fontWeight: 700, color: '#080C0C', letterSpacing: '-0.01em' }}>
            Campaign report
          </span>
          <span style={{ fontSize: '12px', fontWeight: 500, color: '#0A7B7B', background: 'rgba(10,123,123,0.08)', border: '0.5px solid rgba(10,123,123,0.2)', padding: '3px 10px', borderRadius: '20px' }}>
            March 2026
          </span>
        </div>
        <button style={{
          fontFamily: "'Instrument Sans', sans-serif",
          fontSize: '12px', fontWeight: 500, color: '#0A7B7B',
          background: '#fff', border: '0.5px solid rgba(10,123,123,0.3)',
          borderRadius: '8px', padding: '7px 14px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '5px',
        }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M7 1h4v4M11 1L6.5 5.5M5 2H2a1 1 0 00-1 1v7a1 1 0 001 1h7a1 1 0 001-1V7" stroke="#0A7B7B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Open full report
        </button>
      </div>

      {/* Content */}
      <div style={{ padding: '20px 28px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* KPI stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: '12px' }}>
          {[
            { label: 'Organic sessions', value: '12,480', trend: '↑ 14% vs last month', down: false },
            { label: 'Leads generated', value: '284', trend: '↑ 8% vs last month', down: false },
            { label: 'Cost per lead', value: '$18.40', trend: '↑ 3% vs last month', down: true },
            { label: 'Ad spend', value: '$5,225', trend: 'On budget', down: false },
          ].map(stat => (
            <div key={stat.label} style={{ background: '#fff', border: '0.5px solid #e0e3e0', borderRadius: '10px', padding: '14px 16px' }}>
              <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#aaa', margin: '0 0 6px' }}>{stat.label}</p>
              <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '22px', fontWeight: 700, color: '#080C0C', letterSpacing: '-0.02em', margin: '0 0 3px' }}>{stat.value}</p>
              <p style={{ fontSize: '11px', color: stat.down ? '#A32D2D' : '#0A7B7B', margin: 0 }}>{stat.trend}</p>
            </div>
          ))}
        </div>

        {/* Traffic overview chart */}
        <div style={{ background: '#fff', border: '0.5px solid #e0e3e0', borderRadius: '12px', overflow: 'hidden', flex: 1 }}>
          <div style={{ background: '#F5F6F4', borderBottom: '0.5px solid #e0e3e0', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', fontWeight: 500, color: '#aaa', letterSpacing: '0.07em', textTransform: 'uppercase' }}>Traffic overview</span>
            <span style={{ fontSize: '11px', color: '#bbb' }}>Mar 1 – Mar 31, 2026</span>
          </div>
          <div style={{ padding: '20px' }}>
            {/* Bar chart */}
            <div style={{ background: '#F5F6F4', border: '0.5px solid #e8ecea', borderRadius: '8px', height: '160px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '0 20px 16px', gap: '8px', overflow: 'hidden' }}>
              {barData.map(bar => (
                <div key={bar.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', flex: 1 }}>
                  <div style={{
                    borderRadius: '4px 4px 0 0',
                    width: '100%',
                    height: `${bar.height}%`,
                    background: bar.teal ? `rgba(10,123,123,${bar.opacity ?? 1})` : '#e0e3e0',
                  }} />
                  <span style={{ fontSize: '10px', color: '#bbb' }}>{bar.label}</span>
                </div>
              ))}
            </div>

            {/* Bottom row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginTop: '14px' }}>
              {/* Top channels */}
              <div style={{ background: '#F5F6F4', border: '0.5px solid #e8ecea', borderRadius: '8px', padding: '14px 16px' }}>
                <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#aaa', margin: '0 0 10px' }}>Top channels</p>
                {[
                  { name: 'Organic search', pct: 72 },
                  { name: 'Paid social', pct: 18 },
                  { name: 'Direct', pct: 10 },
                ].map(row => (
                  <div key={row.name} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '12px', color: '#444', minWidth: '100px' }}>{row.name}</span>
                    <div style={{ flex: 1, height: '5px', background: '#e0e3e0', borderRadius: '3px', margin: '0 10px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', borderRadius: '3px', background: '#0A7B7B', width: `${row.pct}%` }} />
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: 500, color: '#080C0C', minWidth: '40px', textAlign: 'right' }}>{row.pct}%</span>
                  </div>
                ))}
              </div>
              {/* Top pages */}
              <div style={{ background: '#F5F6F4', border: '0.5px solid #e8ecea', borderRadius: '8px', padding: '14px 16px' }}>
                <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#aaa', margin: '0 0 10px' }}>Top pages</p>
                {[
                  { name: '/home', val: 4820, pct: 58 },
                  { name: '/services', val: 2640, pct: 32 },
                  { name: '/contact', val: 1680, pct: 20 },
                ].map(row => (
                  <div key={row.name} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '12px', color: '#444', minWidth: '100px' }}>{row.name}</span>
                    <div style={{ flex: 1, height: '5px', background: '#e0e3e0', borderRadius: '3px', margin: '0 10px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', borderRadius: '3px', background: '#0A7B7B', width: `${row.pct}%` }} />
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: 500, color: '#080C0C', minWidth: '40px', textAlign: 'right' }}>{row.val.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center', padding: '12px', borderTop: '0.5px solid #f0f0ee' }}>
            <span style={{ fontSize: '11px', color: '#ccc' }}>Powered by AgencyAnalytics</span>
          </div>
        </div>
      </div>
    </>
  )
}
