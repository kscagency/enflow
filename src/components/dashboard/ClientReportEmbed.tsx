'use client'

import { useState, useTransition } from 'react'
import type { ReportEmbed } from '@/types/database'

interface ClientReportEmbedProps {
  embeds: ReportEmbed[]
  clientId: string
  onSave: (formData: FormData) => Promise<{ error?: string }>
}

export function ClientReportEmbed({ embeds, clientId, onSave }: ClientReportEmbedProps) {
  const currentEmbed = embeds[0] ?? null
  const [url, setUrl] = useState(currentEmbed?.embed_url ?? '')
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSaved(false)
    const formData = new FormData()
    formData.set('client_id', clientId)
    formData.set('embed_url', url)
    if (currentEmbed) formData.set('embed_id', currentEmbed.id)

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
    <div
      style={{
        background: '#fff',
        border: '0.5px solid rgba(26,58,58,0.12)',
        borderRadius: 'var(--radius-default)',
        padding: '1.5rem',
      }}
    >
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 700, color: 'var(--brand-dark)', margin: '0 0 1rem' }}>
        Report Embed
      </h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
        <input
          type="url"
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="https://lookerstudio.google.com/embed/..."
          style={{
            flex: 1,
            padding: '0.575rem 0.75rem',
            border: '0.5px solid rgba(26,58,58,0.18)',
            borderRadius: 'var(--radius-default)',
            fontSize: '0.875rem',
            color: 'var(--brand-dark)',
            background: '#fff',
            outline: 'none',
          }}
        />
        <button
          type="submit"
          disabled={isPending || !url}
          style={{
            background: 'var(--brand-primary)',
            color: '#fff',
            border: 'none',
            borderRadius: 'var(--radius-default)',
            padding: '0.575rem 1.125rem',
            fontSize: '0.875rem',
            fontWeight: 500,
            cursor: isPending || !url ? 'not-allowed' : 'pointer',
            opacity: isPending || !url ? 0.6 : 1,
            whiteSpace: 'nowrap',
            transition: 'opacity var(--transition-fast)',
          }}
        >
          {isPending ? 'Saving…' : currentEmbed ? 'Update' : 'Save'}
        </button>
      </form>

      {saved && (
        <p style={{ fontSize: '0.825rem', color: '#059669', margin: '0 0 0.75rem' }}>Report URL saved.</p>
      )}
      {error && (
        <p style={{ fontSize: '0.825rem', color: 'var(--brand-error)', margin: '0 0 0.75rem' }}>{error}</p>
      )}

      {url && (
        <div
          style={{
            border: '0.5px solid rgba(26,58,58,0.1)',
            borderRadius: 'var(--radius-default)',
            overflow: 'hidden',
            background: 'rgba(26,58,58,0.02)',
          }}
        >
          <div
            style={{
              padding: '0.5rem 0.875rem',
              borderBottom: '0.5px solid rgba(26,58,58,0.08)',
              fontSize: '0.75rem',
              color: 'rgba(26,58,58,0.45)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4l3 3" />
            </svg>
            Preview
          </div>
          <iframe
            src={url}
            style={{ width: '100%', height: '480px', border: 'none', display: 'block' }}
            allowFullScreen
          />
        </div>
      )}

      {!url && (
        <p style={{ margin: 0, fontSize: '0.875rem', color: 'rgba(26,58,58,0.4)', textAlign: 'center', padding: '2rem 0' }}>
          Paste a report URL above to preview it here.
        </p>
      )}
    </div>
  )
}
