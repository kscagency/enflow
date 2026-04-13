const KPI_CARDS = [
  { label: 'Organic sessions', value: '12,480', delta: '+18%', positive: true },
  { label: 'Leads generated', value: '284', delta: '+12%', positive: true },
  { label: 'Cost per lead', value: '$18.40', delta: '−5%', positive: true },
  { label: 'Ad spend', value: '$5,220', delta: '+3%', positive: false },
]

const TOP_CHANNELS = [
  { channel: 'Organic Search', sessions: '7,842', pct: '62.8%' },
  { channel: 'Paid Social', sessions: '2,310', pct: '18.5%' },
  { channel: 'Direct', sessions: '1,124', pct: '9.0%' },
  { channel: 'Email', sessions: '820', pct: '6.6%' },
  { channel: 'Referral', sessions: '384', pct: '3.1%' },
]

const TOP_PAGES = [
  { page: '/home', views: '4,230', bounce: '38%' },
  { page: '/services', views: '2,810', bounce: '42%' },
  { page: '/contact', views: '1,980', bounce: '25%' },
  { page: '/blog/seo-tips', views: '1,540', bounce: '55%' },
  { page: '/about', views: '920', bounce: '48%' },
]

export default function PortalReportsPage() {
  return (
    <>
      {/* Topbar */}
      <div style={{ background: '#fff', borderBottom: '0.5px solid #e0e3e0', padding: '0 28px', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div>
          <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '15px', fontWeight: 700, color: '#080C0C', letterSpacing: '-0.01em' }}>Report</span>
          <span style={{ marginLeft: '10px', fontSize: '12px', color: '#aaa' }}>March 2026 · Updated Mar 18</span>
        </div>
        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#F5F6F4', border: '0.5px solid #e0e3e0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 1a5 5 0 00-5 5v2.5L2 10h12l-1-1.5V6a5 5 0 00-5-5z" stroke="#6b6b6a" strokeWidth="1.2"/><path d="M6.5 13a1.5 1.5 0 003 0" stroke="#6b6b6a" strokeWidth="1.2" strokeLinecap="round"/></svg>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px', background: '#F5F6F4' }}>
        {/* KPI cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' }}>
          {KPI_CARDS.map(kpi => (
            <div key={kpi.label} style={{ background: '#fff', border: '0.5px solid #e0e3e0', borderRadius: '12px', padding: '16px 18px' }}>
              <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#aaa', marginBottom: '8px' }}>{kpi.label}</div>
              <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '24px', fontWeight: 700, color: '#080C0C', letterSpacing: '-0.02em', marginBottom: '4px' }}>{kpi.value}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{
                  fontSize: '11px', fontWeight: 500, padding: '2px 6px', borderRadius: '5px',
                  background: kpi.positive ? 'rgba(10,123,123,0.1)' : 'rgba(226,75,74,0.1)',
                  color: kpi.positive ? '#0A7B7B' : '#E24B4A',
                }}>
                  {kpi.delta}
                </span>
                <span style={{ fontSize: '11px', color: '#aaa' }}>vs last month</span>
              </div>
            </div>
          ))}
        </div>

        {/* Traffic chart placeholder */}
        <div style={{ background: '#fff', border: '0.5px solid #e0e3e0', borderRadius: '12px', padding: '18px 20px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ fontSize: '13px', fontWeight: 500, color: '#080C0C' }}>Session trend</span>
            <span style={{ fontSize: '11px', color: '#aaa' }}>Last 30 days</span>
          </div>
          {/* Chart placeholder */}
          <div style={{ height: '140px', background: '#F5F6F4', borderRadius: '8px', display: 'flex', alignItems: 'flex-end', padding: '12px', gap: '5px' }}>
            {[40, 55, 45, 70, 60, 80, 65, 90, 75, 95, 85, 100, 88, 72, 84, 92, 78, 96, 82, 88, 94, 76, 86, 92, 80, 88, 96, 84, 90, 100].map((h, i) => (
              <div key={i} style={{
                flex: 1, borderRadius: '3px 3px 0 0',
                height: `${h}%`,
                background: i >= 27 ? '#0A7B7B' : 'rgba(10,123,123,0.2)',
                transition: 'background 0.15s',
              }} />
            ))}
          </div>
        </div>

        {/* Tables row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          {/* Top channels */}
          <div style={{ background: '#fff', border: '0.5px solid #e0e3e0', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ padding: '14px 18px 10px', borderBottom: '0.5px solid #f0f0ee' }}>
              <span style={{ fontSize: '13px', fontWeight: 500, color: '#080C0C' }}>Top channels</span>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Channel', 'Sessions', '%'].map(h => (
                    <th key={h} style={{ padding: '8px 16px', textAlign: 'left', fontSize: '10px', fontWeight: 500, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#aaa', fontFamily: "'Instrument Sans', sans-serif", borderBottom: '0.5px solid #f0f0ee' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TOP_CHANNELS.map((row, i) => (
                  <tr key={row.channel}>
                    <td style={{ padding: '10px 16px', fontSize: '12px', color: '#080C0C', borderBottom: i < TOP_CHANNELS.length - 1 ? '0.5px solid #f8f8f6' : 'none' }}>{row.channel}</td>
                    <td style={{ padding: '10px 16px', fontSize: '12px', color: '#444', borderBottom: i < TOP_CHANNELS.length - 1 ? '0.5px solid #f8f8f6' : 'none' }}>{row.sessions}</td>
                    <td style={{ padding: '10px 16px', fontSize: '12px', color: '#aaa', borderBottom: i < TOP_CHANNELS.length - 1 ? '0.5px solid #f8f8f6' : 'none' }}>{row.pct}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Top pages */}
          <div style={{ background: '#fff', border: '0.5px solid #e0e3e0', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ padding: '14px 18px 10px', borderBottom: '0.5px solid #f0f0ee' }}>
              <span style={{ fontSize: '13px', fontWeight: 500, color: '#080C0C' }}>Top pages</span>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Page', 'Views', 'Bounce'].map(h => (
                    <th key={h} style={{ padding: '8px 16px', textAlign: 'left', fontSize: '10px', fontWeight: 500, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#aaa', fontFamily: "'Instrument Sans', sans-serif", borderBottom: '0.5px solid #f0f0ee' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TOP_PAGES.map((row, i) => (
                  <tr key={row.page}>
                    <td style={{ padding: '10px 16px', fontSize: '12px', color: '#0A7B7B', fontFamily: 'monospace', borderBottom: i < TOP_PAGES.length - 1 ? '0.5px solid #f8f8f6' : 'none' }}>{row.page}</td>
                    <td style={{ padding: '10px 16px', fontSize: '12px', color: '#444', borderBottom: i < TOP_PAGES.length - 1 ? '0.5px solid #f8f8f6' : 'none' }}>{row.views}</td>
                    <td style={{ padding: '10px 16px', fontSize: '12px', color: '#aaa', borderBottom: i < TOP_PAGES.length - 1 ? '0.5px solid #f8f8f6' : 'none' }}>{row.bounce}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
