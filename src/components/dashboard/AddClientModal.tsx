'use client'

import { useRef, useState, useTransition } from 'react'
import { addClient } from '@/app/dashboard/actions'

interface AddClientModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddClientModal({ isOpen, onClose }: AddClientModalProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isPending, startTransition] = useTransition()

  if (!isOpen) return null

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      const result = await addClient(formData)
      if (result?.error) {
        setError(result.error)
      } else {
        setSuccess(true)
        formRef.current?.reset()
        setTimeout(() => { setSuccess(false); onClose() }, 1200)
      }
    })
  }

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', background: 'rgba(6,9,9,0.55)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div style={{
        background: '#fff', borderRadius: '14px', width: '100%', maxWidth: '420px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.18)', overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px 16px', borderBottom: '0.5px solid #e8ecea' }}>
          <div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '17px', fontWeight: 700, color: '#080C0C', margin: 0, letterSpacing: '-0.01em' }}>
              Add client
            </h2>
            <p style={{ fontSize: '12px', color: '#aaa', margin: '3px 0 0' }}>They'll receive a portal invite when you're ready.</p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#aaa', padding: '4px', display: 'flex', alignItems: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M14 4L4 14M4 4l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
        </div>

        {/* Form */}
        <form ref={formRef} onSubmit={handleSubmit} style={{ padding: '20px 24px 24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {success && (
            <div style={{ padding: '10px 14px', borderRadius: '8px', background: 'rgba(10,123,123,0.08)', color: '#0A7B7B', fontSize: '13px', border: '0.5px solid rgba(10,123,123,0.2)' }}>
              Client added!
            </div>
          )}
          {error && (
            <div style={{ padding: '10px 14px', borderRadius: '8px', background: 'rgba(226,75,74,0.06)', color: '#E24B4A', fontSize: '13px', border: '0.5px solid rgba(226,75,74,0.2)' }}>
              {error}
            </div>
          )}

          <Field label="Business name" name="name" required placeholder="Acme Creative" />
          <Field label="Website URL" name="internal_notes" placeholder="acmecreative.com" />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', paddingTop: '4px' }}>
            <button type="button" onClick={onClose} style={{ background: 'none', border: '0.5px solid #e0e3e0', borderRadius: '8px', padding: '8px 16px', fontSize: '13px', color: '#555', cursor: 'pointer', fontFamily: "'Instrument Sans', sans-serif" }}>
              Cancel
            </button>
            <button
              type="submit" disabled={isPending}
              style={{
                background: isPending ? 'rgba(10,123,123,0.6)' : '#0A7B7B', color: '#fff',
                border: 'none', borderRadius: '8px', padding: '8px 18px',
                fontSize: '13px', fontWeight: 500, cursor: isPending ? 'not-allowed' : 'pointer',
                fontFamily: "'Instrument Sans', sans-serif", position: 'relative', overflow: 'hidden',
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '0.5px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3) 50%, transparent)' }} />
              <span style={{ position: 'relative' }}>{isPending ? 'Adding…' : 'Add client'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function Field({ label, name, required, placeholder, type = 'text' }: { label: string; name: string; required?: boolean; placeholder?: string; type?: string }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#555', marginBottom: '6px' }}>
        {label}
      </label>
      <input
        name={name} type={type} required={required} placeholder={placeholder}
        style={{
          width: '100%', padding: '9px 12px',
          border: '0.5px solid #e0e3e0', borderRadius: '8px',
          fontSize: '13px', color: '#080C0C', background: '#fff',
          outline: 'none', boxSizing: 'border-box',
          fontFamily: "'Instrument Sans', sans-serif", transition: 'border-color 0.15s',
        }}
        onFocus={e => (e.currentTarget.style.borderColor = 'rgba(10,123,123,0.5)')}
        onBlur={e => (e.currentTarget.style.borderColor = '#e0e3e0')}
      />
    </div>
  )
}
