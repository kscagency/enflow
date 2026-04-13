'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  {
    href: '/portal',
    label: 'Overview',
    icon: (active: boolean) => (
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="1" width="6" height="6" rx="1.5" fill={active ? '#12BFBF' : 'rgba(255,255,255,0.5)'}/>
        <rect x="9" y="1" width="6" height="6" rx="1.5" fill={active ? '#12BFBF' : 'rgba(255,255,255,0.5)'}/>
        <rect x="1" y="9" width="6" height="6" rx="1.5" fill={active ? '#12BFBF' : 'rgba(255,255,255,0.5)'}/>
        <rect x="9" y="9" width="6" height="6" rx="1.5" fill={active ? '#12BFBF' : 'rgba(255,255,255,0.5)'}/>
      </svg>
    ),
    exact: true,
  },
  {
    href: '/portal/files',
    label: 'Files',
    icon: (active: boolean) => (
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="2" width="5" height="6" rx="1" stroke={active ? '#12BFBF' : 'rgba(255,255,255,0.5)'} strokeWidth="1.1"/>
        <rect x="9" y="2" width="5" height="4" rx="1" stroke={active ? '#12BFBF' : 'rgba(255,255,255,0.5)'} strokeWidth="1.1"/>
        <rect x="9" y="8" width="5" height="6" rx="1" stroke={active ? '#12BFBF' : 'rgba(255,255,255,0.5)'} strokeWidth="1.1"/>
        <rect x="2" y="10" width="5" height="4" rx="1" stroke={active ? '#12BFBF' : 'rgba(255,255,255,0.5)'} strokeWidth="1.1"/>
      </svg>
    ),
    exact: false,
  },
  {
    href: '/portal/reports',
    label: 'Report',
    icon: (active: boolean) => (
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="4" width="14" height="10" rx="1.5" stroke={active ? '#12BFBF' : 'rgba(255,255,255,0.5)'} strokeWidth="1.1"/>
        <path d="M5 4V3a1 1 0 011-1h4a1 1 0 011 1v1" stroke={active ? '#12BFBF' : 'rgba(255,255,255,0.5)'} strokeWidth="1.1"/>
        <path d="M4 9h8M4 12h5" stroke={active ? '#12BFBF' : 'rgba(255,255,255,0.5)'} strokeWidth="1.1" strokeLinecap="round"/>
      </svg>
    ),
    exact: false,
  },
  {
    href: '/portal/notifications',
    label: 'Notifications',
    icon: (active: boolean) => (
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
        <path d="M8 1a5 5 0 00-5 5v2L2 10h12l-1-2V6a5 5 0 00-5-5z" stroke={active ? '#12BFBF' : 'rgba(255,255,255,0.5)'} strokeWidth="1.1"/>
        <path d="M6.5 13a1.5 1.5 0 003 0" stroke={active ? '#12BFBF' : 'rgba(255,255,255,0.5)'} strokeWidth="1.1" strokeLinecap="round"/>
      </svg>
    ),
    exact: false,
  },
  {
    href: '#',
    label: 'Settings',
    icon: (_active: boolean) => (
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="6" r="3" stroke="rgba(255,255,255,0.5)" strokeWidth="1.1"/>
        <path d="M2 14c0-2.21 2.69-4 6-4s6 1.79 6 4" stroke="rgba(255,255,255,0.5)" strokeWidth="1.1" strokeLinecap="round"/>
      </svg>
    ),
    exact: false,
  },
]

export function PortalSidebar() {
  const pathname = usePathname()

  function isActive(item: typeof navItems[0]) {
    if (item.exact) return pathname === item.href
    return pathname.startsWith(item.href)
  }

  return (
    <aside style={{
      width: '210px',
      flexShrink: 0,
      background: '#080C0C',
      display: 'flex',
      flexDirection: 'column',
      borderRight: '0.5px solid #1a3535',
      position: 'relative',
      overflow: 'hidden',
      height: '100vh',
    }}>
      {/* Aura */}
      <div style={{
        position: 'absolute',
        width: '210px', height: '200px',
        background: 'radial-gradient(ellipse at center, rgba(10,123,123,0.22) 0%, transparent 70%)',
        top: '-80px', left: '50%', transform: 'translateX(-50%)',
        pointerEvents: 'none',
      }} />
      {/* Chrome */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(200,205,212,0.4) 50%, transparent)',
      }} />

      {/* Agency logo at top */}
      <div style={{
        padding: '18px 16px 14px',
        display: 'flex', alignItems: 'center', gap: '10px',
        borderBottom: '0.5px solid #1a3535',
        position: 'relative',
      }}>
        <div style={{
          width: '28px', height: '28px', borderRadius: '7px',
          background: 'rgba(10,123,123,0.2)', border: '0.5px solid rgba(18,191,191,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '11px', fontWeight: 700, color: '#12BFBF' }}>
            AC
          </span>
        </div>
        <div>
          <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '15px', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>
            Acme Agency
          </div>
          <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', marginTop: '1px' }}>
            Client portal
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '8px' }}>
        {navItems.map(item => {
          const active = isActive(item)
          return (
            <Link
              key={item.label}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 10px',
                borderRadius: '8px',
                cursor: 'pointer',
                marginBottom: '2px',
                textDecoration: 'none',
                background: active ? 'rgba(10,123,123,0.2)' : 'transparent',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent' }}
            >
              <span style={{ width: '15px', height: '15px', flexShrink: 0, opacity: active ? 1 : 0.45, display: 'flex', alignItems: 'center' }}>
                {item.icon(active)}
              </span>
              <span style={{ fontSize: '13px', color: active ? '#fff' : 'rgba(255,255,255,0.38)', fontWeight: active ? 500 : 400 }}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: '10px 8px', borderTop: '0.5px solid #1a3535' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px', borderRadius: '8px' }}>
          <div style={{
            width: '28px', height: '28px', borderRadius: '50%',
            background: 'rgba(10,123,123,0.3)', border: '0.5px solid rgba(18,191,191,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '11px', fontWeight: 500, color: '#12BFBF',
            flexShrink: 0,
          }}>
            MW
          </div>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 500, color: '#fff' }}>Marcus Webb</div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>Acme Creative</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
