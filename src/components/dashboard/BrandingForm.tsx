'use client'

import { useState, useTransition, useRef } from 'react'
import type { Agency, PlanTier } from '@/types/database'
import { UpgradeBadge } from '@/components/ui/UpgradeBadge'

interface BrandingFormProps {
  agency: Agency
  plan: PlanTier | null
  onSave: (formData: FormData) => Promise<{ error?: string }>
  onLogoUpload: (formData: FormData) => Promise<{ error?: string; url?: string }>
}

export function BrandingForm({ agency, plan, onSave, onLogoUpload }: BrandingFormProps) {
  const [primary, setPrimary] = useState(agency.brand_primary_color ?? '#0A7B7B')
  const [accent, setAccent] = useState(agency.brand_accent_color ?? '#12BFBF')
  const [bgColor, setBgColor] = useState(agency.brand_background_color ?? '#EDEEED')
  const [textColor, setTextColor] = useState(agency.brand_text_color ?? '#1A3A3A')
  const [fontUrl, setFontUrl] = useState(agency.brand_font_url ?? '')
  const [logoUrl, setLogoUrl] = useState(agency.logo_url ?? '')
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [logoError, setLogoError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const [isUploadingLogo, startLogoUpload] = useTransition()
  const fileRef = useRef<HTMLInputElement>(null)

  const hasAccentColor = plan?.accent_color ?? false
  const hasFullBrandKit = plan?.full_brand_kit ?? false
  const hasCustomFont = plan?.custom_font ?? false

  function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setLogoError(null)
    const fd = new FormData()
    fd.set('logo', file)
    fd.set('agency_id', agency.id)

    startLogoUpload(async () => {
      const result = await onLogoUpload(fd)
      if (result?.error) {
        setLogoError(result.error)
      } else if (result?.url) {
        setLogoUrl(result.url)
      }
    })
  }

  function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const formData = new FormData()
    formData.set('agency_id', agency.id)
    formData.set('brand_primary_color', primary)
    if (hasAccentColor) formData.set('brand_accent_color', accent)
    if (hasFullBrandKit) {
      formData.set('brand_background_color', bgColor)
      formData.set('brand_text_color', textColor)
    }
    if (hasCustomFont) formData.set('brand_font_url', fontUrl)

    startTransition(async () => {
      const result = await onSave(formData)
      if (result?.error) {
        setError(result.error)
      } else {
        setSaved(true)
        setTimeout(() => setSaved(false), 2500)
      }
    })
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem', alignItems: 'start' }}>
      {/* Settings panel */}
      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

        {/* Logo */}
        <Section title="Logo">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logoUrl}
                alt="Agency logo"
                style={{ width: '80px', height: '80px', objectFit: 'contain', borderRadius: 'var(--radius-default)', border: '0.5px solid rgba(26,58,58,0.12)', background: '#fff', padding: '0.5rem' }}
              />
            ) : (
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: 'var(--radius-default)',
                  border: '0.5px dashed rgba(26,58,58,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(26,58,58,0.3)',
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9l4-4 4 4 4-4 4 4" />
                  <path d="M3 15l4 4 4-4 4 4" />
                </svg>
              </div>
            )}
            <div>
              <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleLogoChange} />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={isUploadingLogo}
                style={{ ...outlineBtn, opacity: isUploadingLogo ? 0.6 : 1 }}
              >
                {isUploadingLogo ? 'Uploading…' : logoUrl ? 'Change Logo' : 'Upload Logo'}
              </button>
              {logoError && <p style={{ margin: '0.4rem 0 0', fontSize: '0.78rem', color: 'var(--brand-error)' }}>{logoError}</p>}
              <p style={{ margin: '0.4rem 0 0', fontSize: '0.75rem', color: 'rgba(26,58,58,0.4)' }}>PNG or SVG recommended</p>
            </div>
          </div>
        </Section>

        {/* Colors */}
        <Section title="Colors">
          <ColorRow
            label="Primary Color"
            value={primary}
            onChange={setPrimary}
          />
          <ColorRow
            label={<>Accent Color {!hasAccentColor && <UpgradeBadge tier="Growth" />}</>}
            value={accent}
            onChange={setAccent}
            disabled={!hasAccentColor}
          />
          <ColorRow
            label={<>Background Color {!hasFullBrandKit && <UpgradeBadge tier="Pro" />}</>}
            value={bgColor}
            onChange={setBgColor}
            disabled={!hasFullBrandKit}
          />
          <ColorRow
            label={<>Text Color {!hasFullBrandKit && <UpgradeBadge tier="Pro" />}</>}
            value={textColor}
            onChange={setTextColor}
            disabled={!hasFullBrandKit}
          />
        </Section>

        {/* Font */}
        <Section title={<>Custom Font {!hasCustomFont && <UpgradeBadge tier="Pro" />}</>}>
          <div>
            <label style={labelStyle}>Google Fonts CSS URL</label>
            <input
              type="url"
              value={fontUrl}
              onChange={e => setFontUrl(e.target.value)}
              disabled={!hasCustomFont}
              placeholder="https://fonts.googleapis.com/css2?family=..."
              style={{ ...inputStyle, opacity: !hasCustomFont ? 0.5 : 1, cursor: !hasCustomFont ? 'not-allowed' : 'auto' }}
            />
          </div>
        </Section>

        {error && <p style={{ margin: 0, color: 'var(--brand-error)', fontSize: '0.85rem' }}>{error}</p>}
        {saved && <p style={{ margin: 0, color: '#059669', fontSize: '0.85rem' }}>Branding saved.</p>}

        <div>
          <button
            type="submit"
            disabled={isPending}
            style={{
              background: isPending ? 'rgba(10,123,123,0.6)' : 'var(--brand-primary)',
              color: '#fff',
              border: 'none',
              borderRadius: 'var(--radius-default)',
              padding: '0.65rem 1.5rem',
              fontSize: '0.9rem',
              fontWeight: 500,
              cursor: isPending ? 'not-allowed' : 'pointer',
            }}
          >
            {isPending ? 'Saving…' : 'Save Branding'}
          </button>
        </div>
      </form>

      {/* Live preview */}
      <div style={{ position: 'sticky', top: '1.5rem' }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', fontWeight: 700, color: 'rgba(26,58,58,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 0.75rem' }}>
          Preview
        </h3>
        <div
          style={{
            borderRadius: 'var(--radius-default)',
            overflow: 'hidden',
            border: '0.5px solid rgba(26,58,58,0.12)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          }}
        >
          {/* Fake portal header */}
          <div style={{ background: primary, padding: '0.875rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logoUrl} alt="logo" style={{ height: '28px', objectFit: 'contain' }} />
            ) : (
              <span style={{ fontWeight: 700, color: accent, fontSize: '1rem', letterSpacing: '0.1em' }}>
                AGENCY
              </span>
            )}
          </div>

          {/* Fake portal body */}
          <div style={{ background: hasFullBrandKit ? bgColor : '#EDEEED', padding: '1rem' }}>
            <div
              style={{
                background: '#fff',
                borderRadius: '6px',
                padding: '0.875rem',
                border: '0.5px solid rgba(0,0,0,0.06)',
                marginBottom: '0.75rem',
              }}
            >
              <p style={{ margin: '0 0 0.4rem', fontSize: '0.75rem', fontWeight: 700, color: primary }}>Welcome back</p>
              <p style={{ margin: 0, fontSize: '0.7rem', color: hasFullBrandKit ? textColor : '#1A3A3A', opacity: 0.7 }}>Your files and reports are ready.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              {['Files', 'Reports'].map(label => (
                <div
                  key={label}
                  style={{
                    background: accent + '18',
                    borderRadius: '6px',
                    padding: '0.625rem 0.75rem',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    color: primary,
                    textAlign: 'center',
                  }}
                >
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: React.ReactNode; children: React.ReactNode }) {
  return (
    <div
      style={{
        background: '#fff',
        border: '0.5px solid rgba(26,58,58,0.12)',
        borderRadius: 'var(--radius-default)',
        padding: '1.25rem 1.5rem',
      }}
    >
      <h2
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '0.95rem',
          fontWeight: 700,
          color: 'var(--brand-dark)',
          margin: '0 0 1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        {title}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
        {children}
      </div>
    </div>
  )
}

interface ColorRowProps {
  label: React.ReactNode
  value: string
  onChange: (v: string) => void
  disabled?: boolean
}

function ColorRow({ label, value, onChange, disabled }: ColorRowProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
      <label
        style={{
          fontSize: '0.875rem',
          color: disabled ? 'rgba(26,58,58,0.4)' : 'rgba(26,58,58,0.75)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        {label}
      </label>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
        <span style={{ fontSize: '0.78rem', color: 'rgba(26,58,58,0.4)', fontFamily: 'monospace' }}>
          {value.toUpperCase()}
        </span>
        <div style={{ position: 'relative' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '6px',
              background: value,
              border: '0.5px solid rgba(26,58,58,0.15)',
              cursor: disabled ? 'not-allowed' : 'pointer',
              overflow: 'hidden',
              opacity: disabled ? 0.5 : 1,
            }}
          >
            <input
              type="color"
              value={value}
              disabled={disabled}
              onChange={e => onChange(e.target.value)}
              style={{
                position: 'absolute',
                inset: 0,
                opacity: 0,
                cursor: disabled ? 'not-allowed' : 'pointer',
                width: '100%',
                height: '100%',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.78rem',
  fontWeight: 500,
  color: 'rgba(26,58,58,0.6)',
  marginBottom: '0.35rem',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.55rem 0.75rem',
  border: '0.5px solid rgba(26,58,58,0.18)',
  borderRadius: 'var(--radius-default)',
  fontSize: '0.85rem',
  color: 'var(--brand-dark)',
  background: '#fff',
  outline: 'none',
  boxSizing: 'border-box',
}

const outlineBtn: React.CSSProperties = {
  background: 'none',
  border: '0.5px solid rgba(10,123,123,0.4)',
  borderRadius: 'var(--radius-default)',
  padding: '0.5rem 1rem',
  fontSize: '0.82rem',
  color: 'var(--brand-primary)',
  fontWeight: 500,
  cursor: 'pointer',
}
