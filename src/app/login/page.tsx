'use client'

import { useState, useTransition } from 'react'
import { login } from './actions'

const EnflowLogo = ({ size = 28 }: { size?: number }) => (
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

const GoogleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M15.68 8.18c0-.57-.05-1.11-.14-1.64H8v3.1h4.3a3.67 3.67 0 01-1.6 2.41v2h2.58c1.51-1.39 2.4-3.44 2.4-5.87z" fill="#4285F4"/>
    <path d="M8 16c2.16 0 3.97-.72 5.3-1.94l-2.59-2.01c-.72.48-1.63.77-2.71.77-2.08 0-3.85-1.41-4.48-3.3H.86v2.07A8 8 0 008 16z" fill="#34A853"/>
    <path d="M3.52 9.52A4.8 4.8 0 013.27 8c0-.53.09-1.04.25-1.52V4.41H.86A8 8 0 000 8c0 1.29.31 2.51.86 3.59l2.66-2.07z" fill="#FBBC05"/>
    <path d="M8 3.18c1.17 0 2.22.4 3.05 1.2l2.28-2.28A8 8 0 00.86 4.41L3.52 6.48C4.15 4.59 5.92 3.18 8 3.18z" fill="#EA4335"/>
  </svg>
)

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      const result = await login(formData)
      if (result?.error) setError(result.error)
    })
  }

  return (
    <main style={{
      background: '#060909',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Instrument Sans', sans-serif",
      padding: '48px 24px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(10,123,123,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(10,123,123,0.04) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        pointerEvents: 'none',
      }} />
      {/* Top aura */}
      <div style={{
        position: 'absolute',
        width: '700px', height: '500px',
        background: 'radial-gradient(ellipse at center, rgba(10,123,123,0.22) 0%, rgba(10,123,123,0.06) 45%, transparent 72%)',
        top: '-200px', left: '50%', transform: 'translateX(-50%)',
        pointerEvents: 'none',
      }} />
      {/* Bottom aura */}
      <div style={{
        position: 'absolute',
        width: '500px', height: '400px',
        background: 'radial-gradient(ellipse at center, rgba(18,191,191,0.08) 0%, transparent 70%)',
        bottom: '-160px', left: '50%', transform: 'translateX(-50%)',
        pointerEvents: 'none',
      }} />

      <div style={{ width: '100%', maxWidth: '400px', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Card */}
        <div style={{
          background: '#0D1212',
          border: '0.5px solid #1e3535',
          borderRadius: '16px',
          padding: '40px 40px 36px',
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Card top aura */}
          <div style={{
            position: 'absolute',
            width: '320px', height: '200px',
            background: 'radial-gradient(ellipse at center, rgba(10,123,123,0.2) 0%, transparent 70%)',
            top: '-90px', left: '50%', transform: 'translateX(-50%)',
            pointerEvents: 'none',
          }} />
          {/* Card chrome */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(200,205,212,0.25) 30%, rgba(200,205,212,0.6) 50%, rgba(200,205,212,0.25) 70%, transparent)',
          }} />

          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '28px', position: 'relative' }}>
            <EnflowLogo size={28} />
            <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '22px', fontWeight: 700, color: '#12BFBF', letterSpacing: '-0.02em' }}>
              Enflow
            </span>
          </div>

          <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '24px', fontWeight: 700, color: '#fff', textAlign: 'center', margin: '0 0 8px', letterSpacing: '-0.02em', position: 'relative' }}>
            Welcome back
          </h1>
          <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.38)', textAlign: 'center', margin: '0 0 28px', lineHeight: 1.6, position: 'relative' }}>
            Sign in to your agency portal
          </p>

          {/* Google button */}
          <a
            href="#"
            style={{
              width: '100%',
              background: 'rgba(255,255,255,0.05)',
              border: '0.5px solid rgba(255,255,255,0.14)',
              borderRadius: '9px',
              padding: '11px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              cursor: 'pointer',
              textDecoration: 'none',
              boxSizing: 'border-box',
            }}
          >
            <GoogleIcon />
            <span style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.75)' }}>
              Continue with Google
            </span>
          </a>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '20px 0' }}>
            <div style={{ flex: 1, height: '0.5px', background: 'rgba(255,255,255,0.08)' }} />
            <span style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>or</span>
            <div style={{ flex: 1, height: '0.5px', background: 'rgba(255,255,255,0.08)' }} />
          </div>

          <form onSubmit={handleSubmit}>
            <label style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: '12px', fontWeight: 500, color: 'rgba(255,255,255,0.5)', marginBottom: '6px', display: 'block' }}>
              Work email
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="you@agency.com"
              style={{
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: '13px',
                color: '#fff',
                background: 'rgba(255,255,255,0.05)',
                border: '0.5px solid rgba(255,255,255,0.12)',
                borderRadius: '9px',
                padding: '10px 14px',
                width: '100%',
                outline: 'none',
                marginBottom: '16px',
                boxSizing: 'border-box',
              }}
              onFocus={e => { e.currentTarget.style.borderColor = '#0A7B7B'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(10,123,123,0.15)' }}
              onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.boxShadow = 'none' }}
            />

            {/* Hidden password field for compat with existing action */}
            <input name="password" type="password" style={{ display: 'none' }} defaultValue="magic-link" />

            {error && (
              <p style={{ fontSize: '12px', color: '#E24B4A', background: 'rgba(226,75,74,0.1)', border: '0.5px solid rgba(226,75,74,0.3)', borderRadius: '8px', padding: '8px 12px', marginBottom: '12px' }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isPending}
              style={{
                width: '100%',
                background: isPending ? 'rgba(10,123,123,0.6)' : '#0A7B7B',
                border: 'none',
                borderRadius: '9px',
                padding: '12px 16px',
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: '13px',
                fontWeight: 500,
                color: '#fff',
                cursor: isPending ? 'not-allowed' : 'pointer',
                position: 'relative',
                overflow: 'hidden',
                marginTop: '4px',
                boxSizing: 'border-box',
              }}
            >
              <div style={{
                position: 'absolute',
                width: '200px', height: '60px',
                background: 'radial-gradient(ellipse at center, rgba(18,191,191,0.35) 0%, transparent 70%)',
                top: '-30px', left: '50%', transform: 'translateX(-50%)',
                pointerEvents: 'none',
              }} />
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, height: '0.5px',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2) 40%, rgba(255,255,255,0.45) 50%, rgba(255,255,255,0.2) 60%, transparent)',
              }} />
              <span style={{ position: 'relative' }}>{isPending ? 'Sending…' : 'Send magic link →'}</span>
            </button>
          </form>

          <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.2)', textAlign: 'center', margin: '20px 0 0', lineHeight: 1.6, position: 'relative' }}>
            No password needed. We&apos;ll send a secure link<br />
            to your inbox. <a href="#" style={{ color: 'rgba(18,191,191,0.6)', textDecoration: 'none' }}>Learn more</a>
          </p>
        </div>

        {/* Security badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '24px' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0A7B7B', opacity: 0.7 }} />
          <span style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.05em' }}>
            SOC 2 compliant &nbsp;&middot;&nbsp; 256-bit encryption &nbsp;&middot;&nbsp; GDPR ready
          </span>
        </div>

        <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.12)', textAlign: 'center', marginTop: '14px', letterSpacing: '0.04em' }}>
          &copy; 2025 Enflow Digital. All rights reserved.
        </p>
      </div>
    </main>
  )
}
