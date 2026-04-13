'use client'

import { useState, useTransition } from 'react'

function EnflowIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
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

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [isPending, startTransition] = useTransition()

  function handleMagicLink(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    startTransition(async () => {
      await new Promise(r => setTimeout(r, 800))
      setSent(true)
    })
  }

  return (
    <main style={{
      minHeight: '100vh', background: '#060909',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '40px 20px', fontFamily: "'Instrument Sans', sans-serif",
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', width: '600px', height: '300px',
        background: 'radial-gradient(ellipse at center, rgba(10,123,123,0.18) 0%, transparent 70%)',
        top: '-60px', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(200,205,212,0.4) 50%, transparent)',
      }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '36px', position: 'relative' }}>
        <EnflowIcon size={42} />
        <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '26px', fontWeight: 700, color: '#12BFBF', letterSpacing: '-0.02em' }}>
          Enflow
        </span>
      </div>

      <div style={{
        width: '100%', maxWidth: '380px',
        background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(18,191,191,0.18)',
        borderRadius: '16px', padding: '32px',
        boxShadow: '0 8px 48px rgba(0,0,0,0.3)', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '0.5px',
          background: 'linear-gradient(90deg, transparent, rgba(18,191,191,0.3) 50%, transparent)',
        }} />
        <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '22px', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', margin: '0 0 6px' }}>
          Welcome back
        </h1>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', margin: '0 0 24px' }}>
          Sign in to your Enflow workspace.
        </p>

        {sent ? (
          <div style={{ background: 'rgba(10,123,123,0.15)', border: '0.5px solid rgba(18,191,191,0.3)', borderRadius: '10px', padding: '20px', textAlign: 'center' }}>
            <p style={{ color: '#12BFBF', fontSize: '14px', fontWeight: 500, margin: '0 0 6px' }}>Check your inbox</p>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', margin: 0 }}>
              We sent a magic link to <strong style={{ color: 'rgba(255,255,255,0.65)' }}>{email}</strong>
            </p>
          </div>
        ) : (
          <>
            <button
              type="button"
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(255,255,255,0.12)',
                borderRadius: '10px', padding: '11px 16px', color: 'rgba(255,255,255,0.85)',
                fontSize: '14px', fontWeight: 500, cursor: 'pointer', marginBottom: '16px',
                fontFamily: "'Instrument Sans', sans-serif", transition: 'background 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ flex: 1, height: '0.5px', background: 'rgba(255,255,255,0.1)' }} />
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.06em' }}>or</span>
              <div style={{ flex: 1, height: '0.5px', background: 'rgba(255,255,255,0.1)' }} />
            </div>

            <form onSubmit={handleMagicLink} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '6px' }}>
                  Email address
                </label>
                <input
                  type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="you@agency.com"
                  style={{
                    width: '100%', padding: '10px 14px',
                    background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(255,255,255,0.12)',
                    borderRadius: '8px', color: '#fff', fontSize: '14px', outline: 'none',
                    boxSizing: 'border-box', fontFamily: "'Instrument Sans', sans-serif", transition: 'border-color 0.15s',
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = 'rgba(18,191,191,0.5)')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')}
                />
              </div>
              <button
                type="submit" disabled={isPending}
                style={{
                  width: '100%', padding: '11px',
                  background: isPending ? 'rgba(10,123,123,0.6)' : '#0A7B7B',
                  border: 'none', borderRadius: '9px', color: '#fff',
                  fontSize: '14px', fontWeight: 500, cursor: isPending ? 'not-allowed' : 'pointer',
                  position: 'relative', overflow: 'hidden',
                  fontFamily: "'Instrument Sans', sans-serif", transition: 'background 0.15s',
                }}
                onMouseEnter={e => { if (!isPending) e.currentTarget.style.background = '#0c9090' }}
                onMouseLeave={e => { if (!isPending) e.currentTarget.style.background = '#0A7B7B' }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '0.5px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3) 50%, transparent)' }} />
                <span style={{ position: 'relative' }}>{isPending ? 'Sending…' : 'Send magic link'}</span>
              </button>
            </form>
          </>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '24px' }}>
        {['SOC 2 Type II', 'GDPR Ready', 'Encrypted at rest'].map((label, i) => (
          <span key={label} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'rgba(255,255,255,0.22)' }}>
            {i > 0 && <span style={{ color: 'rgba(255,255,255,0.1)', margin: '0 4px' }}>·</span>}
            {label}
          </span>
        ))}
      </div>
    </main>
  )
}
