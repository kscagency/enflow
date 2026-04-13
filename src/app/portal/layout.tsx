import { PortalSidebar } from '@/components/portal/PortalSidebar'

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <PortalSidebar />
      <div style={{ flex: 1, background: '#F5F6F4', display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        {children}
      </div>
    </div>
  )
}
