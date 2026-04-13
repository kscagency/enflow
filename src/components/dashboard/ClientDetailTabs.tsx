'use client'

import { useState } from 'react'

type Tab = 'brief' | 'files' | 'report'

interface ClientDetailTabsProps {
  brief: React.ReactNode
  files: React.ReactNode
  report: React.ReactNode
}

export function ClientDetailTabs({ brief, files, report }: ClientDetailTabsProps) {
  const [active, setActive] = useState<Tab>('brief')

  const tabs: { key: Tab; label: string }[] = [
    { key: 'brief', label: 'Brief' },
    { key: 'files', label: 'Files' },
    { key: 'report', label: 'Report' },
  ]

  return (
    <div>
      {/* Tab bar */}
      <div
        style={{
          display: 'flex',
          gap: '0.25rem',
          marginBottom: '1.25rem',
          borderBottom: '0.5px solid rgba(26,58,58,0.12)',
        }}
      >
        {tabs.map(tab => {
          const isActive = active === tab.key
          return (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: isActive ? '2px solid var(--brand-primary)' : '2px solid transparent',
                padding: '0.625rem 1rem',
                fontSize: '0.9rem',
                fontWeight: isActive ? 500 : 400,
                color: isActive ? 'var(--brand-primary)' : 'rgba(26,58,58,0.5)',
                cursor: 'pointer',
                transition: 'color var(--transition-fast), border-color var(--transition-fast)',
                marginBottom: '-0.5px',
              }}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Panel */}
      {active === 'brief' && brief}
      {active === 'files' && files}
      {active === 'report' && report}
    </div>
  )
}
