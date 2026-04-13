'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/portal/overview', label: 'Overview' },
  { href: '/portal/files', label: 'Files' },
  { href: '/portal/reports', label: 'Reports' },
  { href: '/portal/notifications', label: 'Notifications' },
  { href: '/portal/settings', label: 'Settings' },
]

export function PortalNav() {
  const pathname = usePathname()

  return (
    <nav
      style={{
        borderBottom: '0.5px solid rgba(26,58,58,0.12)',
        background: '#fff',
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
      }}
    >
      <div
        style={{
          display: 'flex',
          padding: '0 1.5rem',
          minWidth: 'max-content',
        }}
      >
        {navItems.map(item => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                padding: '0.875rem 1rem',
                fontSize: '0.9rem',
                fontWeight: isActive ? 500 : 400,
                color: isActive ? 'var(--brand-primary)' : 'rgba(26,58,58,0.6)',
                textDecoration: 'none',
                borderBottom: isActive
                  ? '2px solid var(--brand-accent)'
                  : '2px solid transparent',
                whiteSpace: 'nowrap',
                transition: 'color var(--transition-fast), border-color var(--transition-fast)',
              }}
            >
              {item.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
