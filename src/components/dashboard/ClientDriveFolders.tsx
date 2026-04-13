'use client'

import { useState, useTransition } from 'react'
import type { DriveFolder } from '@/types/database'

interface ClientDriveFoldersProps {
  folders: DriveFolder[]
  clientId: string
  onAdd: (formData: FormData) => Promise<{ error?: string }>
}

const folderTypeLabels: Record<DriveFolder['folder_type'], string> = {
  assets: 'Assets',
  reports: 'Reports',
  deliverables: 'Deliverables',
}

const folderTypeColors: Record<DriveFolder['folder_type'], { bg: string; color: string }> = {
  assets: { bg: 'rgba(18,191,191,0.1)', color: 'var(--brand-primary)' },
  reports: { bg: 'rgba(83,74,183,0.1)', color: 'var(--brand-purple)' },
  deliverables: { bg: 'rgba(16,185,129,0.1)', color: '#059669' },
}

export function ClientDriveFolders({ folders, clientId, onAdd }: ClientDriveFoldersProps) {
  const [showForm, setShowForm] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)
    formData.set('client_id', clientId)

    startTransition(async () => {
      const result = await onAdd(formData)
      if (result?.error) {
        setError(result.error)
      } else {
        setShowForm(false)
        ;(e.target as HTMLFormElement).reset()
      }
    })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div
        style={{
          background: '#fff',
          border: '0.5px solid rgba(26,58,58,0.12)',
          borderRadius: 'var(--radius-default)',
          padding: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 700, color: 'var(--brand-dark)', margin: 0 }}>
            Drive Folders
          </h2>
          <button
            onClick={() => setShowForm(v => !v)}
            style={{
              background: 'none',
              border: '0.5px solid rgba(10,123,123,0.4)',
              borderRadius: 'var(--radius-default)',
              padding: '0.4rem 0.875rem',
              fontSize: '0.8rem',
              color: 'var(--brand-primary)',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            + Add Folder
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            style={{
              background: 'rgba(10,123,123,0.04)',
              border: '0.5px solid rgba(10,123,123,0.12)',
              borderRadius: 'var(--radius-default)',
              padding: '1rem',
              marginBottom: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            {error && <p style={{ margin: 0, color: 'var(--brand-error)', fontSize: '0.825rem' }}>{error}</p>}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label style={labelStyle}>Folder Name *</label>
                <input name="folder_name" required placeholder="Q1 Assets" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Drive Folder ID *</label>
                <input name="drive_folder_id" required placeholder="1BxiM..." style={inputStyle} />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Folder Type *</label>
              <select name="folder_type" required style={inputStyle}>
                <option value="assets">Assets</option>
                <option value="reports">Reports</option>
                <option value="deliverables">Deliverables</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <button type="button" onClick={() => setShowForm(false)} style={{ ...btnBase, color: 'rgba(26,58,58,0.55)', border: '0.5px solid rgba(26,58,58,0.2)' }}>Cancel</button>
              <button type="submit" disabled={isPending} style={{ ...btnBase, background: 'var(--brand-primary)', color: '#fff', border: 'none', opacity: isPending ? 0.6 : 1 }}>
                {isPending ? 'Adding…' : 'Add Folder'}
              </button>
            </div>
          </form>
        )}

        {folders.length === 0 ? (
          <p style={{ margin: 0, fontSize: '0.875rem', color: 'rgba(26,58,58,0.4)', textAlign: 'center', padding: '2rem 0' }}>
            No folders linked yet.
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {folders.map(folder => {
              const colors = folderTypeColors[folder.folder_type]
              return (
                <div
                  key={folder.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    border: '0.5px solid rgba(26,58,58,0.1)',
                    borderRadius: 'var(--radius-default)',
                    background: 'rgba(26,58,58,0.015)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'rgba(26,58,58,0.4)', flexShrink: 0 }}>
                      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                    </svg>
                    <span style={{ fontSize: '0.875rem', color: 'var(--brand-dark)', fontWeight: 500 }}>{folder.folder_name}</span>
                  </div>
                  <span
                    style={{
                      padding: '0.2rem 0.55rem',
                      borderRadius: '999px',
                      fontSize: '0.72rem',
                      fontWeight: 500,
                      background: colors.bg,
                      color: colors.color,
                    }}
                  >
                    {folderTypeLabels[folder.folder_type]}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.78rem',
  fontWeight: 500,
  color: 'rgba(26,58,58,0.6)',
  marginBottom: '0.3rem',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.5rem 0.7rem',
  border: '0.5px solid rgba(26,58,58,0.18)',
  borderRadius: 'var(--radius-default)',
  fontSize: '0.85rem',
  color: 'var(--brand-dark)',
  background: '#fff',
  outline: 'none',
  boxSizing: 'border-box',
}

const btnBase: React.CSSProperties = {
  padding: '0.5rem 1rem',
  borderRadius: 'var(--radius-default)',
  fontSize: '0.82rem',
  fontWeight: 500,
  cursor: 'pointer',
  background: 'none',
}
