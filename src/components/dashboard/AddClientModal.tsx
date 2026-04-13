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
        formRef.current?.reset()
        onClose()
      }
    })
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        background: 'rgba(8,12,12,0.65)',
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div style={{
        background: '#fff',
        border: '0.5px solid #dde0de',
        borderRadius: '14px',
        width: '100%',
        maxWidth: '420px',
        position: 'relative',
        zIndex: 2,
        boxShadow: '0 24px 64px rgba(0,0,0,0.18)',
        fontFamily: "'Instrument Sans', sans-serif",
      }}>
        {/* Header */}
        <div style={{ padding: '24px 28px 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '20px', fontWeight: 700, color: '#080C0C', letterSpacing: '-0.02em', margin: '0 0 4px' }}>
              Add new client
            </h2>
            <p style={{ fontSize: '13px', color: '#6b6b6a', margin: 0, lineHeight: 1.5 }}>
              You can add full details after creating the client.
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              width: '28px', height: '28px',
              borderRadius: '7px',
              background: '#F5F6F4',
              border: '0.5px solid #e0e3e0',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
              marginTop: '2px',
            }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1 1l8 8M9 1L1 9" stroke="#888" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Divider */}
        <div style={{ height: '0.5px', background: '#f0f0ee', margin: '20px 0' }} />

        {/* Body */}
        <form ref={formRef} onSubmit={handleSubmit} style={{ padding: '0 28px' }}>
          {error && (
            <p style={{ fontSize: '12px', color: '#E24B4A', background: 'rgba(226,75,74,0.08)', border: '0.5px solid rgba(226,75,74,0.2)', borderRadius: '8px', padding: '8px 12px', marginBottom: '12px' }}>
              {error}
            </p>
          )}

          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '12px', fontWeight: 500, color: '#444', marginBottom: '6px', display: 'block' }}>
              Business name <span style={{ color: '#0A7B7B', marginLeft: '2px' }}>*</span>
            </label>
            <input
              name="name"
              type="text"
              required
              placeholder="e.g. Acme Creative"
              style={{
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: '13px', color: '#080C0C',
                background: '#F5F6F4',
                border: '0.5px solid #cdd0ce',
                borderRadius: '8px',
                padding: '10px 14px',
                width: '100%',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color 0.15s, box-shadow 0.15s',
              }}
              onFocus={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.border = '1.5px solid #0A7B7B'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(10,123,123,0.1)' }}
              onBlur={e => { e.currentTarget.style.background = '#F5F6F4'; e.currentTarget.style.border = '0.5px solid #cdd0ce'; e.currentTarget.style.boxShadow = 'none' }}
            />
          </div>

          <div style={{ marginBottom: '8px' }}>
            <label style={{ fontSize: '12px', fontWeight: 500, color: '#444', marginBottom: '6px', display: 'block' }}>
              Website URL
            </label>
            <input
              name="website_url"
              type="text"
              placeholder="e.g. acmecreative.com"
              style={{
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: '13px', color: '#080C0C',
                background: '#F5F6F4',
                border: '0.5px solid #cdd0ce',
                borderRadius: '8px',
                padding: '10px 14px',
                width: '100%',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color 0.15s, box-shadow 0.15s',
              }}
              onFocus={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.border = '1.5px solid #0A7B7B'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(10,123,123,0.1)' }}
              onBlur={e => { e.currentTarget.style.background = '#F5F6F4'; e.currentTarget.style.border = '0.5px solid #cdd0ce'; e.currentTarget.style.boxShadow = 'none' }}
            />
          </div>
        </form>

        {/* Footer */}
        <div style={{ padding: '8px 28px 24px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px' }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: '13px', fontWeight: 500, color: '#6b6b6a',
              background: '#F5F6F4',
              border: '0.5px solid #dde0de',
              borderRadius: '8px',
              padding: '10px 18px',
              cursor: 'pointer',
              transition: 'background 0.15s',
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            form=""
            disabled={isPending}
            onClick={() => { formRef.current?.requestSubmit() }}
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: '13px', fontWeight: 500, color: '#fff',
              background: isPending ? 'rgba(10,123,123,0.6)' : '#0A7B7B',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 20px',
              cursor: isPending ? 'not-allowed' : 'pointer',
              position: 'relative',
              overflow: 'hidden',
              transition: 'background 0.15s',
            }}
          >
            <div style={{ position: 'absolute', width: '120px', height: '50px', background: 'radial-gradient(ellipse at center, rgba(18,191,191,0.4) 0%, transparent 70%)', top: '-25px', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '0.5px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3) 40%, rgba(255,255,255,0.55) 50%, rgba(255,255,255,0.3) 60%, transparent)' }} />
            <span style={{ position: 'relative' }}>{isPending ? 'Creating…' : 'Create client'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
