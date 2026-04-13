'use client'

import { useRef, useState, useTransition } from 'react'
import type { Agency, PlanTier } from '@/types/database'

interface BrandingFormProps {
  agency: Agency
  plan: PlanTier | null
  onSave: (formData: FormData) => Promise<{ error?: string }>
  onLogoUpload: (formData: FormData) => Promise<{ error?: string; url?: string }>
}

export function BrandingForm({ agency, plan, onSave, onLogoUpload }: BrandingFormProps) {
  const [primary, setPrimary] = useState(agency.brand_primary_color ?? '#0A7B7B')
  const [logoUrl, setLogoUrl] = useState(agency.logo_url ?? '')
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const [isUploadingLogo, startLogoUpload] = useTransition()
  const fileRef = useRef<HTMLInputElement>(null)

  function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const fd = new FormData()
    fd.set('logo', file)
    fd.set('agency_id', agency.id)
    startLogoUpload(async () => {
      const result = await onLogoUpload(fd)
      if (result?.url) setLogoUrl(result.url)
    })
  }

  function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const formData = new FormData()
    formData.set('agency_id', agency.id)
    formData.set('brand_primary_color', primary)
    startTransition(async () => {
      const result = await onSave(formData)
      if (result?.error) setError(result.error)
      else { setSaved(true); setTimeout(() => setSaved(false), 2500) }
    })
  }

  return (
    <>
      {/* Topbar */}
      <div style={{ background: '#fff', borderBottom: '0.5px solid #e0e3e0', padding: '0 28px', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '15px', fontWeight: 700, color: '#080C0C', letterSpacing: '-0.01em' }}>
          Branding settings
        </span>
        <button
          type="submit" form="branding-form" disabled={isPending}
          style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: '12px', fontWeight: 500, color: '#fff', background: isPending ? 'rgba(10,123,123,0.6)' : '#0A7B7B', border: 'none', borderRadius: '8px', padding: '7px 16px', cursor: isPending ? 'not-allowed' : 'pointer', position: 'relative', overflow: 'hidden', transition: 'background 0.15s' }}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '0.5px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4) 50%, transparent)' }} />
          <span style={{ position: 'relative' }}>{saved ? 'Saved ✓' : isPending ? 'Saving…' : 'Save changes'}</span>
        </button>
      </div>
    <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
      {/* Settings panel */}
      <div style={{ width: '280px', flexShrink: 0, background: '#fff', borderRight: '0.5px solid #e0e3e0', padding: '24px 20px', overflowY: 'auto' }}>
        <form id="branding-form" onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Logo */}
          <section>
            <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#aaa', margin: '0 0 14px' }}>Logo</p>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleLogoChange} />
            <div
              onClick={() => fileRef.current?.click()}
              style={{
                border: '0.5px dashed #cdd0ce', borderRadius: '10px', padding: '20px',
                textAlign: 'center', background: '#F5F6F4', cursor: 'pointer',
                transition: 'background 0.15s',
              }}
            >
              {logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoUrl} alt="Logo" style={{ maxHeight: '40px', objectFit: 'contain', margin: '0 auto 8px', display: 'block' }} />
              ) : (
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#eaecea', border: '0.5px solid #dde0de', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v8M4 4l3-3 3 3" stroke="#888" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M1 10v1.5A1.5 1.5 0 002.5 13h9a1.5 1.5 0 001.5-1.5V10" stroke="#888" strokeWidth="1.2" strokeLinecap="round"/></svg>
                </div>
              )}
              <p style={{ fontSize: '12px', color: '#888', margin: '0 0 4px' }}>
                {isUploadingLogo ? 'Uploading…' : 'Click to upload logo'}
              </p>
              <p style={{ fontSize: '11px', color: '#bbb', margin: 0 }}>PNG or SVG · Max 2MB</p>
            </div>
          </section>

          {/* Colors */}
          <section>
            <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#aaa', margin: '0 0 14px' }}>Colors</p>
            {/* Primary — editable */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: '#F5F6F4', border: '0.5px solid #e0e3e0', borderRadius: '8px', marginBottom: '8px', cursor: 'pointer' }}>
              <span style={{ fontSize: '13px', color: '#080C0C' }}>Primary color</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '11px', color: '#888', fontFamily: 'monospace' }}>{primary.toUpperCase()}</span>
                <div style={{ position: 'relative', width: '20px', height: '20px', borderRadius: '5px', background: primary, border: '0.5px solid rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                  <input type="color" value={primary} onChange={e => setPrimary(e.target.value)} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }} />
                </div>
              </div>
            </div>
            {/* Accent — locked */}
            <LockedRow label="Accent color" tier="Growth" />
            {/* Background & text — locked */}
            <LockedRow label="Background & text" tier="Pro" />
          </section>

          {/* Domain */}
          <section>
            <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#aaa', margin: '0 0 14px' }}>Domain</p>
            <LockedRow label="Custom subdomain" tier="Growth" />
            <p style={{ fontSize: '11px', color: '#bbb', marginTop: '8px', lineHeight: 1.5 }}>
              Currently: <span style={{ color: '#0A7B7B' }}>{agency.subdomain}.enflow.app</span>
            </p>
          </section>

          {error && <p style={{ fontSize: '12px', color: '#E24B4A', margin: 0 }}>{error}</p>}

          {/* Hidden submit — triggered by the topbar button via form="branding-form" */}
          <button type="submit" style={{ display: 'none' }} />
        </form>
      </div>

      {/* Preview panel */}
      <div style={{ flex: 1, background: '#F5F6F4', padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px', overflowY: 'auto' }}>
        <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#aaa', margin: 0 }}>
          Live preview
        </p>
        <div style={{ background: '#fff', border: '0.5px solid #e0e3e0', borderRadius: '12px', overflow: 'hidden', maxWidth: '480px' }}>
          {/* Browser bar */}
          <div style={{ background: '#F5F6F4', borderBottom: '0.5px solid #e0e3e0', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ display: 'flex', gap: '5px' }}>
              {['#F09595', '#FAC775', '#97C459'].map(c => <div key={c} style={{ width: '8px', height: '8px', borderRadius: '50%', background: c }} />)}
            </div>
            <div style={{ flex: 1, background: '#fff', border: '0.5px solid #e0e3e0', borderRadius: '5px', padding: '4px 10px', fontSize: '11px', color: '#888', textAlign: 'center' }}>
              {agency.subdomain}.enflow.app
            </div>
          </div>
          {/* Portal nav */}
          <div style={{ background: primary, padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', width: '200px', height: '60px', background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.15) 0%, transparent 70%)', top: '-20px', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '0.5px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2) 50%, transparent)' }} />
            <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '14px', fontWeight: 700, color: '#fff', position: 'relative' }}>
              {agency.name}
            </span>
            <div style={{ display: 'flex', gap: '14px', position: 'relative' }}>
              {['Overview', 'Files', 'Report'].map((link, i) => (
                <span key={link} style={{ fontSize: '11px', color: i === 0 ? '#fff' : 'rgba(255,255,255,0.6)', fontWeight: i === 0 ? 500 : 400 }}>{link}</span>
              ))}
            </div>
          </div>
          {/* Portal body */}
          <div style={{ padding: '16px' }}>
            <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '16px', fontWeight: 700, color: '#080C0C', margin: '0 0 4px', letterSpacing: '-0.01em' }}>
              Welcome back, Marcus.
            </p>
            <p style={{ fontSize: '11px', color: '#888', margin: '0 0 14px' }}>Here&apos;s what&apos;s happening with your account.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {[{ label: 'Files', value: '3 folders', sub: 'Last updated today' }, { label: 'Report', value: 'March 2026', sub: 'Updated Mar 18' }].map(card => (
                <div key={card.label} style={{ background: '#F5F6F4', border: '0.5px solid #e0e3e0', borderRadius: '8px', padding: '12px' }}>
                  <p style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#aaa', margin: '0 0 6px' }}>{card.label}</p>
                  <p style={{ fontSize: '12px', fontWeight: 500, color: '#080C0C', margin: '0 0 4px' }}>{card.value}</p>
                  <p style={{ fontSize: '11px', color: '#aaa', margin: 0 }}>{card.sub}</p>
                </div>
              ))}
            </div>
            <div style={{ display: 'inline-block', fontSize: '11px', fontWeight: 500, color: '#fff', background: primary, borderRadius: '6px', padding: '5px 12px', marginTop: '8px', cursor: 'pointer' }}>
              View files
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

function LockedRow({ label, tier }: { label: string; tier: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: '#fafafa', border: '0.5px solid #e0e3e0', borderRadius: '8px', marginBottom: '8px', opacity: 0.7 }}>
      <span style={{ fontSize: '13px', color: '#aaa' }}>{label}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ opacity: 0.4 }}>
          <rect x="2" y="5" width="8" height="6" rx="1.5" stroke="#888" strokeWidth="1"/>
          <path d="M4 5V3.5a2 2 0 014 0V5" stroke="#888" strokeWidth="1" strokeLinecap="round"/>
        </svg>
        <span style={{ fontSize: '10px', fontWeight: 500, background: 'rgba(10,123,123,0.1)', color: '#0A7B7B', border: '0.5px solid rgba(10,123,123,0.25)', padding: '2px 8px', borderRadius: '20px' }}>
          {tier}
        </span>
      </div>
    </div>
  )
}
