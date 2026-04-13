'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

function EnflowIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="22" fill="#12BFBF" opacity="0.12"/>
      <circle cx="24" cy="24" r="22" stroke="#12BFBF" strokeWidth="1.5" fill="none"/>
      <circle cx="24" cy="13" r="3.8" fill="#12BFBF"/>
      <circle cx="34" cy="19" r="2.8" fill="#12BFBF" opacity="0.7"/>
      <circle cx="36" cy="30" r="3.2" fill="#12BFBF" opacity="0.5"/>
      <circle cx="24" cy="35" r="2.8" fill="#12BFBF" opacity="0.65"/>
      <circle cx="13" cy="30" r="3.2" fill="#12BFBF" opacity="0.35"/>
      <circle cx="12" cy="19" r="2.8" fill="#12BFBF" opacity="0.2"/>
      <circle cx="24" cy="24" r="3.5" fill="#12BFBF" opacity="0.9"/>
    </svg>
  )
}

const workspaceNav = [
  {
    href: '/dashboard',
    label: 'Clients',
    exact: true,
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor"/>
        <rect x="9" y="1" width="6" height="6" rx="1.5" fill="currentColor"/>
        <rect x="1" y="9" width="6" height="6" rx="1.5" fill="currentColor"/>
        <rect x="9" y="9" width="6" height="6" rx="1.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    href: '/dashboard/branding',
    label: 'Branding',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M8 4v4l2.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    href: '/dashboard/team',
    label: 'Team',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="6" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.2"/>
        <circle cx="10" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M1 13c0-2.21 2.24-4 5-4s5 1.79 5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    href: '/dashboard/billing',
    label: 'Billing',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="4" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M5 4V3a1 1 0 011-1h4a1 1 0 011 1v1" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
  },
]

const supportNav = [
  {
    href: '/dashboard/help',
    label: 'Help',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M8 9V8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <circle cx="8" cy="11" r="0.75" fill="currentColor"/>
      </svg>
    ),
  },
]

export function Sidebar() {
  const pathname = usePathname()

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href
    return pathname.startsWith(href)
  }

  return (
    <aside style={{
      width: '220px', flexShrink: 0, background: '#080C0C',
      display: 'flex', flexDirection: 'column',
      borderRight: '0.5px solid #1a3a3a',
      position: 'relative', overflow: 'hidden', height: '100vh',
    }}>
      {/* Aura */}
      <div style={{
        position: 'absolute', width: '220px', height: '200px',
        background: 'radial-gradient(ellipse at center, rgba(10,123,123,0.2) 0%, transparent 70%)',
        top: '-80px', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none',
      }} />
      {/* Chrome */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(200,205,212,0.4) 50%, transparent)',
      }} />

      {/* Logo */}
      <div style={{ padding: '20px 18px 16px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '0.5px solid #1a3a3a', position: 'relative', flexShrink: 0 }}>
        <EnflowIcon />
        <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '16px', fontWeight: 700, color: '#12BFBF', letterSpacing: '-0.02em' }}>
          Enflow
        </span>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '8px 10px', overflowY: 'auto' }}>
        <p style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', padding: '16px 8px 6px', margin: 0 }}>
          Workspace
        </p>
        {workspaceNav.map(item => {
          const active = isActive(item.href, item.exact)
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '8px 10px', borderRadius: '8px', marginBottom: '2px',
                background: active ? 'rgba(10,123,123,0.2)' : 'transparent',
                color: active ? '#12BFBF' : 'rgba(255,255,255,0.4)',
                textDecoration: 'none', fontSize: '13px', fontWeight: active ? 500 : 400,
                transition: 'background 0.15s',
              }}
            >
              <span style={{ width: '16px', height: '16px', flexShrink: 0, opacity: active ? 1 : 0.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {item.icon}
              </span>
              <span style={{ color: active ? '#fff' : 'rgba(255,255,255,0.4)' }}>{item.label}</span>
            </Link>
          )
        })}

        <p style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', padding: '16px 8px 6px', margin: 0 }}>
          Support
        </p>
        {supportNav.map(item => {
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '8px 10px', borderRadius: '8px', marginBottom: '2px',
                background: active ? 'rgba(10,123,123,0.2)' : 'transparent',
                color: active ? '#12BFBF' : 'rgba(255,255,255,0.4)',
                textDecoration: 'none', fontSize: '13px', fontWeight: active ? 500 : 400,
                transition: 'background 0.15s',
              }}
            >
              <span style={{ width: '16px', height: '16px', flexShrink: 0, opacity: active ? 1 : 0.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {item.icon}
              </span>
              <span style={{ color: active ? '#fff' : 'rgba(255,255,255,0.4)' }}>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* User footer */}
      <div style={{ padding: '12px 10px', borderTop: '0.5px solid #1a3a3a', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px', borderRadius: '8px' }}>
          <div style={{
            width: '28px', height: '28px', borderRadius: '50%',
            background: 'rgba(10,123,123,0.3)', border: '0.5px solid rgba(18,191,191,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '11px', fontWeight: 500, color: '#12BFBF', flexShrink: 0,
          }}>
            JD
          </div>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 500, color: '#fff' }}>Jane Doe</div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>Owner</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
