import Link from 'next/link'
import type { Client } from '@/types/database'

interface ClientCardProps {
  client: Client
}

export function ClientCard({ client }: ClientCardProps) {
  const services = client.services
    ? client.services.split(',').map(s => s.trim()).filter(Boolean)
    : []

  const isAccepted = client.invite_status === 'accepted'

  return (
    <Link
      href={`/dashboard/clients/${client.id}`}
      style={{
        display: 'block',
        background: '#fff',
        border: '0.5px solid rgba(26,58,58,0.12)',
        borderRadius: 'var(--radius-default)',
        padding: '1.25rem',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'box-shadow var(--transition-fast), border-color var(--transition-fast)',
      }}
      onMouseOver={e => {
        const el = e.currentTarget as HTMLAnchorElement
        el.style.boxShadow = '0 4px 16px rgba(10,123,123,0.1)'
        el.style.borderColor = 'rgba(10,123,123,0.25)'
      }}
      onMouseOut={e => {
        const el = e.currentTarget as HTMLAnchorElement
        el.style.boxShadow = 'none'
        el.style.borderColor = 'rgba(26,58,58,0.12)'
      }}
    >
      {/* Name + badge */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.625rem' }}>
        <h3
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1rem',
            fontWeight: 700,
            color: 'var(--brand-dark)',
            margin: 0,
          }}
        >
          {client.name}
        </h3>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0.2rem 0.5rem',
            borderRadius: '999px',
            fontSize: '0.72rem',
            fontWeight: 500,
            whiteSpace: 'nowrap',
            flexShrink: 0,
            background: isAccepted ? 'rgba(16,185,129,0.1)' : 'rgba(250,199,117,0.2)',
            color: isAccepted ? '#059669' : '#92580a',
            border: `0.5px solid ${isAccepted ? 'rgba(16,185,129,0.3)' : 'rgba(250,199,117,0.5)'}`,
          }}
        >
          {isAccepted ? 'Accepted' : 'Pending'}
        </span>
      </div>

      {/* Contact */}
      {client.contact_name && (
        <p style={{ fontSize: '0.85rem', color: 'rgba(26,58,58,0.65)', margin: '0 0 0.25rem' }}>
          {client.contact_name}
        </p>
      )}
      {client.contact_email && (
        <p style={{ fontSize: '0.8rem', color: 'rgba(26,58,58,0.45)', margin: '0 0 0.875rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {client.contact_email}
        </p>
      )}

      {/* Services */}
      {services.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
          {services.map(service => (
            <span
              key={service}
              style={{
                padding: '0.2rem 0.5rem',
                borderRadius: '999px',
                background: 'rgba(10,123,123,0.08)',
                color: 'var(--brand-primary)',
                fontSize: '0.72rem',
                fontWeight: 500,
              }}
            >
              {service}
            </span>
          ))}
        </div>
      )}
    </Link>
  )
}
