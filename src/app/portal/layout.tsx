import { PortalSidebar } from '@/components/portal/PortalSidebar'

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#F5F6F4' }}>
      <PortalSidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {children}
      </div>
    </div>
  )
}
