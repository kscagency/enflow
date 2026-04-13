interface UpgradeBadgeProps {
  tier: 'Growth' | 'Pro'
}

export function UpgradeBadge({ tier }: UpgradeBadgeProps) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.3rem',
        padding: '0.2rem 0.55rem',
        borderRadius: '999px',
        border: '0.5px solid var(--brand-primary)',
        color: 'var(--brand-primary)',
        fontSize: '0.75rem',
        fontWeight: 500,
        whiteSpace: 'nowrap',
        verticalAlign: 'middle',
      }}
    >
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
      Upgrade to {tier}
    </span>
  )
}
