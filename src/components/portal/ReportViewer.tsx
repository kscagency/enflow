'use client'

import { useState } from 'react'

interface ReportViewerProps {
  embedUrl: string
  label: string | null
}

export function ReportViewer({ embedUrl, label }: ReportViewerProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div>
      {label && (
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1rem',
            fontWeight: 700,
            color: 'var(--brand-dark)',
            margin: '0 0 1rem',
          }}
        >
          {label}
        </h2>
      )}

      <div
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '600px',
          borderRadius: 'var(--radius-default)',
          overflow: 'hidden',
          border: '0.5px solid rgba(26,58,58,0.12)',
          background: 'rgba(26,58,58,0.03)',
        }}
      >
        {!loaded && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255,255,255,0.85)',
              zIndex: 1,
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: '3px solid rgba(10,123,123,0.15)',
                borderTopColor: 'var(--brand-primary)',
                animation: 'spin 0.7s linear infinite',
              }}
            />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        <iframe
          src={embedUrl}
          style={{
            width: '100%',
            minHeight: '600px',
            border: 'none',
            display: 'block',
          }}
          onLoad={() => setLoaded(true)}
          title={label ?? 'Report'}
          allowFullScreen
        />
      </div>
    </div>
  )
}
