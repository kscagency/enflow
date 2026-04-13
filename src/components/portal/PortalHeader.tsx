export function PortalHeader() {
  return (
    <div
      style={{
        padding: '1rem 1.5rem 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* Agency logo placeholder */}
      <div
        style={{
          width: '36px',
          height: '36px',
          borderRadius: 'var(--radius-default)',
          background: 'var(--brand-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-heading)',
            color: '#fff',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.05em',
          }}
        >
          AG
        </span>
      </div>
    </div>
  )
}
