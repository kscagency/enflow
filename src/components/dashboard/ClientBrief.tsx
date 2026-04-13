import type { Client } from '@/types/database'

interface ClientBriefProps {
  client: Client
}

function formatCurrency(value: number) {
  return '$' + value.toLocaleString('en-US') + '/mo'
}

function formatDate(dateStr: string) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function ClientBrief({ client }: ClientBriefProps) {
  const services = client.services
    ? client.services.split(',').map(s => s.trim()).filter(Boolean)
    : []

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Main info card */}
      <div
        style={{
          background: '#fff',
          border: '0.5px solid rgba(26,58,58,0.12)',
          borderRadius: 'var(--radius-default)',
          padding: '1.5rem',
        }}
      >
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 700, color: 'var(--brand-dark)', margin: '0 0 1.25rem' }}>Contact</h2>
        <dl style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem 2rem' }}>
          {client.contact_name && <DataItem label="Contact Name" value={client.contact_name} />}
          {client.contact_email && <DataItem label="Email" value={client.contact_email} />}
          {client.phone && <DataItem label="Phone" value={client.phone} />}
          {client.retainer_value != null && (
            <DataItem label="Monthly Retainer" value={formatCurrency(client.retainer_value)} />
          )}
          {client.contract_start_date && (
            <DataItem label="Contract Start" value={formatDate(client.contract_start_date)} />
          )}
        </dl>

        {services.length > 0 && (
          <div style={{ marginTop: '1.25rem' }}>
            <dt style={labelStyle}>Services</dt>
            <dd style={{ margin: 0, marginTop: '0.4rem', display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              {services.map(s => (
                <span
                  key={s}
                  style={{
                    padding: '0.25rem 0.6rem',
                    borderRadius: '999px',
                    background: 'rgba(10,123,123,0.08)',
                    color: 'var(--brand-primary)',
                    fontSize: '0.78rem',
                    fontWeight: 500,
                  }}
                >
                  {s}
                </span>
              ))}
            </dd>
          </div>
        )}
      </div>

      {/* Campaign goals */}
      {client.campaign_goals && (
        <div
          style={{
            background: '#fff',
            border: '0.5px solid rgba(26,58,58,0.12)',
            borderRadius: 'var(--radius-default)',
            padding: '1.5rem',
          }}
        >
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 700, color: 'var(--brand-dark)', margin: '0 0 0.75rem' }}>Campaign Goals</h2>
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'rgba(26,58,58,0.75)', lineHeight: 1.6 }}>
            {client.campaign_goals}
          </p>
        </div>
      )}

      {/* Internal notes */}
      {client.internal_notes && (
        <div
          style={{
            background: 'rgba(250,199,117,0.07)',
            border: '0.5px solid rgba(250,199,117,0.4)',
            borderRadius: 'var(--radius-default)',
            padding: '1.5rem',
          }}
        >
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 700, color: 'var(--brand-dark)', margin: '0 0 0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Internal Notes
          </h2>
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'rgba(26,58,58,0.75)', lineHeight: 1.6 }}>
            {client.internal_notes}
          </p>
        </div>
      )}
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  fontWeight: 500,
  color: 'rgba(26,58,58,0.45)',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
}

function DataItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt style={labelStyle}>{label}</dt>
      <dd style={{ margin: '0.3rem 0 0', fontSize: '0.9rem', color: 'var(--brand-dark)', fontWeight: 500 }}>{value}</dd>
    </div>
  )
}
