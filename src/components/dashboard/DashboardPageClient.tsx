'use client'

import { useState } from 'react'
import type { Client } from '@/types/database'
import { ClientList } from './ClientList'
import { EmptyState } from '@/components/ui/EmptyState'
import { AddClientModal } from './AddClientModal'

interface DashboardPageClientProps {
  clients: Client[]
}

export function DashboardPageClient({ clients }: DashboardPageClientProps) {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      {/* Page header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.5rem',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.375rem',
            fontWeight: 700,
            color: 'var(--brand-dark)',
            margin: 0,
          }}
        >
          Clients
        </h1>
        <button
          onClick={() => setModalOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'var(--brand-primary)',
            color: '#fff',
            border: 'none',
            borderRadius: 'var(--radius-default)',
            padding: '0.625rem 1.125rem',
            fontSize: '0.875rem',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'opacity var(--transition-fast)',
          }}
          onMouseOver={e => (e.currentTarget.style.opacity = '0.85')}
          onMouseOut={e => (e.currentTarget.style.opacity = '1')}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add Client
        </button>
      </div>

      {clients.length === 0 ? (
        <EmptyState
          title="No clients yet"
          description="Add your first client to get started. They'll receive an invite to access their portal."
          action={{ label: 'Add Client', onClick: () => setModalOpen(true) }}
        />
      ) : (
        <ClientList clients={clients} />
      )}

      <AddClientModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
