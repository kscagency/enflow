'use client'

import { logout } from '@/app/login/actions'
import { useState } from 'react'

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header
      style={{
        background: '#fff',
        borderBottom: '0.5px solid rgba(26,58,58,0.1)',
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1.25rem',
        flexShrink: 0,
      }}
    >
      {/* Hamburger — mobile only */}
      <button
        type="button"
        className="md:hidden"
        onClick={onMenuClick}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--brand-dark)',
          padding: '0.25rem',
          display: 'flex',
          alignItems: 'center',
        }}
        aria-label="Open navigation"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* Agency name placeholder */}
      <span
        style={{
          fontFamily: 'var(--font-heading)',
          color: 'var(--brand-dark)',
          fontWeight: 700,
          fontSize: '1rem',
          letterSpacing: '0.02em',
        }}
        className="hidden md:block"
      >
        Agency Name
      </span>

      {/* Spacer on mobile */}
      <span className="flex-1 md:hidden" />

      {/* User menu */}
      <div style={{ position: 'relative' }}>
        <button
          type="button"
          onClick={() => setMenuOpen(v => !v)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--brand-dark)',
            fontSize: '0.875rem',
          }}
        >
          <span
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'var(--brand-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.8125rem',
            }}
          >
            A
          </span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {menuOpen && (
          <div
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              right: 0,
              background: '#fff',
              border: '0.5px solid rgba(26,58,58,0.15)',
              borderRadius: 'var(--radius-default)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
              minWidth: '140px',
              zIndex: 50,
            }}
          >
            <form action={logout}>
              <button
                type="submit"
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '0.625rem 0.875rem',
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  color: 'var(--brand-error)',
                }}
              >
                Sign out
              </button>
            </form>
          </div>
        )}
      </div>
    </header>
  )
}
