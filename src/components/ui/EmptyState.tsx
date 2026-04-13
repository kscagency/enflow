interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 2rem',
        textAlign: 'center',
      }}
    >
      {icon ? (
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(10,123,123,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.25rem',
            color: 'var(--brand-primary)',
          }}
        >
          {icon}
        </div>
      ) : (
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(10,123,123,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.25rem',
            color: 'var(--brand-primary)',
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>
      )}

      <h3
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.125rem',
          color: 'var(--brand-dark)',
          marginBottom: '0.5rem',
          fontWeight: 700,
        }}
      >
        {title}
      </h3>

      {description && (
        <p
          style={{
            color: 'rgba(26,58,58,0.55)',
            fontSize: '0.9rem',
            maxWidth: '320px',
            lineHeight: 1.55,
            marginBottom: action ? '1.5rem' : 0,
          }}
        >
          {description}
        </p>
      )}

      {action && (
        <button
          onClick={action.onClick}
          style={{
            background: 'var(--brand-primary)',
            color: '#fff',
            border: 'none',
            borderRadius: 'var(--radius-default)',
            padding: '0.625rem 1.25rem',
            fontSize: '0.875rem',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'opacity var(--transition-fast)',
          }}
          onMouseOver={e => (e.currentTarget.style.opacity = '0.85')}
          onMouseOut={e => (e.currentTarget.style.opacity = '1')}
        >
          {action.label}
        </button>
      )}
    </div>
  )
}
