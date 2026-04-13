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
        setTimeout(() => {
          setSuccess(false)
          onClose()
        }, 1200)
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
        background: 'rgba(6,9,9,0.55)',
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 'var(--radius-default)',
          width: '100%',
          maxWidth: '560px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.25rem 1.5rem',
            borderBottom: '0.5px solid rgba(26,58,58,0.1)',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.1rem',
              fontWeight: 700,
              color: 'var(--brand-dark)',
              margin: 0,
            }}
          >
            Add Client
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'rgba(26,58,58,0.45)',
              padding: '0.25rem',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form ref={formRef} onSubmit={handleSubmit} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>

          {success && (
            <div style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-default)', background: 'rgba(16,185,129,0.1)', color: '#059669', fontSize: '0.875rem', border: '0.5px solid rgba(16,185,129,0.3)' }}>
              Client added successfully!
            </div>
          )}

          {error && (
            <div style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-default)', background: 'rgba(226,75,74,0.08)', color: 'var(--brand-error)', fontSize: '0.875rem', border: '0.5px solid rgba(226,75,74,0.2)' }}>
              {error}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <Field label="Client Name *" name="name" required placeholder="Acme Corp" />
            <Field label="Contact Name" name="contact_name" placeholder="Jane Smith" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <Field label="Contact Email *" name="contact_email" type="email" required placeholder="jane@acme.com" />
            <Field label="Phone" name="phone" type="tel" placeholder="+1 555 000 0000" />
          </div>

          <Field label="Services (comma-separated)" name="services" placeholder="SEO, Paid Media, Content" />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <Field label="Monthly Retainer ($)" name="retainer_value" type="number" placeholder="5000" />
            <Field label="Contract Start Date" name="contract_start_date" type="date" />
          </div>

          <div>
            <label style={labelStyle}>Campaign Goals</label>
            <textarea
              name="campaign_goals"
              placeholder="Grow organic traffic by 40%..."
              rows={3}
              style={{ ...inputStyle, resize: 'vertical', width: '100%' }}
            />
          </div>

          <div>
            <label style={labelStyle}>Internal Notes <span style={{ color: 'rgba(26,58,58,0.4)', fontWeight: 400, fontSize: '0.75rem' }}>— not visible to client</span></label>
            <textarea
              name="internal_notes"
              placeholder="Agency-only context..."
              rows={3}
              style={{ ...inputStyle, resize: 'vertical', width: '100%', background: 'rgba(250,199,117,0.06)', borderColor: 'rgba(250,199,117,0.4)' }}
            />
          </div>

          {/* Footer */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', paddingTop: '0.5rem' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                background: 'none',
                border: '0.5px solid rgba(26,58,58,0.2)',
                borderRadius: 'var(--radius-default)',
                padding: '0.625rem 1.125rem',
                fontSize: '0.875rem',
                color: 'rgba(26,58,58,0.65)',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              style={{
                background: isPending ? 'rgba(10,123,123,0.6)' : 'var(--brand-primary)',
                color: '#fff',
                border: 'none',
                borderRadius: 'var(--radius-default)',
                padding: '0.625rem 1.375rem',
                fontSize: '0.875rem',
                fontWeight: 500,
                cursor: isPending ? 'not-allowed' : 'pointer',
                transition: 'background var(--transition-fast)',
              }}
            >
              {isPending ? 'Adding…' : 'Add Client'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.8rem',
  fontWeight: 500,
  color: 'rgba(26,58,58,0.65)',
  marginBottom: '0.35rem',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.575rem 0.75rem',
  border: '0.5px solid rgba(26,58,58,0.18)',
  borderRadius: 'var(--radius-default)',
  fontSize: '0.875rem',
  color: 'var(--brand-dark)',
  background: '#fff',
  outline: 'none',
  boxSizing: 'border-box',
}

interface FieldProps {
  label: string
  name: string
  type?: string
  required?: boolean
  placeholder?: string
}

function Field({ label, name, type = 'text', required, placeholder }: FieldProps) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        style={inputStyle}
      />
    </div>
  )
}
