import { PortalHeader } from '@/components/portal/PortalHeader'
import { PortalNav } from '@/components/portal/PortalNav'

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--brand-bg)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <header style={{ background: '#fff', boxShadow: '0 1px 0 rgba(26,58,58,0.08)' }}>
        <PortalHeader />
        <PortalNav />
      </header>

      <main style={{ flex: 1, padding: '1.5rem' }}>
        <div
          style={{
            maxWidth: '1024px',
            margin: '0 auto',
            background: '#fff',
            borderRadius: 'var(--radius-default)',
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            padding: '1.5rem',
            minHeight: '400px',
          }}
        >
          {children}
        </div>
      </main>
    </div>
  )
}
