'use client'

import { useState } from 'react'
import type { Client } from '@/types/database'
import { AddClientModal } from './AddClientModal'

const MOCK_CLIENTS: Client[] = [
  { id: '1', agency_id: 'a', auth_user_id: null, name: 'Acme Creative', contact_name: 'Marcus Webb', contact_email: 'hello@acmecreative.com', phone: null, invite_status: 'pending', services: null, retainer_value: null, contract_start_date: null, campaign_goals: null, internal_notes: null, invited_at: null, created_at: '2026-03-01T00:00:00Z' },
  { id: '2', agency_id: 'a', auth_user_id: null, name: 'Blue Label Co.', contact_name: null, contact_email: null, phone: null, invite_status: 'pending', services: null, retainer_value: null, contract_start_date: null, campaign_goals: null, internal_notes: null, invited_at: null, created_at: '2026-02-18T00:00:00Z' },
  { id: '3', agency_id: 'a', auth_user_id: null, name: 'Northwave Media', contact_name: null, contact_email: null, phone: null, invite_status: 'pending', services: null, retainer_value: null, contract_start_date: null, campaign_goals: null, internal_notes: null, invited_at: null, created_at: '2026-02-10T00:00:00Z' },
  { id: '4', agency_id: 'a', auth_user_id: null, name: 'Spark & Pine', contact_name: null, contact_email: null, phone: null, invite_status: 'pending', services: null, retainer_value: null, contract_start_date: null, campaign_goals: null, internal_notes: null, invited_at: null, created_at: '2026-01-29T00:00:00Z' },
  { id: '5', agency_id: 'a', auth_user_id: null, name: 'Redvine Studio', contact_name: null, contact_email: null, phone: null, invite_status: 'pending', services: null, retainer_value: null, contract_start_date: null, campaign_goals: null, internal_notes: null, invited_at: null, created_at: '2026-01-14T00:00:00Z' },
]

const CLIENT_AVATARS: Record<string, { bg: string; color: string; initials: string; url: string }> = {
  'Acme Creative':   { bg: 'rgba(10,123,123,0.12)', color: '#0A7B7B', initials: 'AC', url: 'acmecreative.com' },
  'Blue Label Co.':  { bg: 'rgba(55,138,221,0.12)', color: '#185FA5', initials: 'BL', url: 'bluelabelco.com' },
  'Northwave Media': { bg: 'rgba(127,119,221,0.12)', color: '#534AB7', initials: 'NW', url: 'northwavemedia.com' },
  'Spark & Pine':    { bg: 'rgba(216,90,48,0.1)', color: '#993C1D', initials: 'SP', url: 'sparkandpine.com' },
  'Redvine Studio':  { bg: 'rgba(212,83,126,0.1)', color: '#993556', initials: 'RV', url: 'redvinestudio.com' },
}

function getInitials(name: string) {
  return name.split(/\s+/).map(w => w[0]).join('').toUpperCase().slice(0, 2)
}

function getAvatarStyle(name: string) {
  const known = CLIENT_AVATARS[name]
  if (known) return known
  const colors = [
    { bg: 'rgba(10,123,123,0.12)', color: '#0A7B7B' },
    { bg: 'rgba(55,138,221,0.12)', color: '#185FA5' },
    { bg: 'rgba(127,119,221,0.12)', color: '#534AB7' },
  ]
  const c = colors[name.length % colors.length]
  return { bg: c.bg, color: c.color, initials: getInitials(name), url: '' }
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

interface DashboardPageClientProps {
  clients: Client[]
}

export function DashboardPageClient({ clients }: DashboardPageClientProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [search, setSearch] = useState('')

  const displayClients = clients.length > 0 ? clients : MOCK_CLIENTS
  const filtered = displayClients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  const newFiles = 14

  return (
    <>
      {/* Topbar */}
      <div style={{
        background: '#fff',
        borderBottom: '0.5px solid #e0e3e0',
        padding: '0 28px',
        height: '52px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '15px', fontWeight: 700, color: '#080C0C', letterSpacing: '-0.01em' }}>
          Agency dashboard
        </span>
        <div style={{
          width: '32px', height: '32px',
          borderRadius: '8px',
          background: '#F5F6F4',
          border: '0.5px solid #e0e3e0',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          position: 'relative',
        }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M8 1a5 5 0 00-5 5v2.5L2 10h12l-1-1.5V6a5 5 0 00-5-5z" stroke="#6b6b6a" strokeWidth="1.2"/>
            <path d="M6.5 13a1.5 1.5 0 003 0" stroke="#6b6b6a" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          <div style={{
            position: 'absolute', top: '6px', right: '6px',
            width: '6px', height: '6px',
            borderRadius: '50%', background: '#E24B4A',
            border: '1.5px solid #fff',
          }} />
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '24px 28px', flex: 1, overflowY: 'auto' }}>
        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: '12px', marginBottom: '24px' }}>
          <div style={{ background: '#fff', border: '0.5px solid #e0e3e0', borderRadius: '10px', padding: '16px 20px' }}>
            <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#aaa', margin: '0 0 8px' }}>Active clients</p>
            <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '28px', fontWeight: 700, color: '#080C0C', letterSpacing: '-0.02em', margin: 0 }}>
              {displayClients.length}
            </p>
          </div>
          <div style={{ background: '#fff', border: '0.5px solid #e0e3e0', borderRadius: '10px', padding: '16px 20px' }}>
            <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#aaa', margin: '0 0 8px' }}>New files</p>
            <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '28px', fontWeight: 700, color: '#080C0C', letterSpacing: '-0.02em', margin: 0 }}>
              {newFiles}
            </p>
          </div>
        </div>

        {/* Section header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '20px', fontWeight: 700, color: '#080C0C', letterSpacing: '-0.01em' }}>
            Clients
          </span>
          <button
            onClick={() => setModalOpen(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              background: '#0A7B7B',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 14px',
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: '12px', fontWeight: 500, color: '#fff',
              cursor: 'pointer',
              position: 'relative', overflow: 'hidden',
              flexShrink: 0,
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#0c9090' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#0A7B7B' }}
          >
            <div style={{ position: 'absolute', width: '100px', height: '40px', background: 'radial-gradient(ellipse at center, rgba(18,191,191,0.4) 0%, transparent 70%)', top: '-20px', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '0.5px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3) 40%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.3) 60%, transparent)' }} />
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ position: 'relative' }}>
              <path d="M6 1v10M1 6h10" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span style={{ position: 'relative' }}>Add client</span>
          </button>
        </div>

        {/* Search */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          background: '#fff',
          border: '0.5px solid #cdd0ce',
          borderRadius: '8px',
          padding: '8px 14px',
          marginBottom: '16px',
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ opacity: 0.3, flexShrink: 0 }}>
            <circle cx="6" cy="6" r="4.5" stroke="#080C0C" strokeWidth="1.2"/>
            <path d="M9.5 9.5L12 12" stroke="#080C0C" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            placeholder="Search clients..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              flex: 1, border: 'none', outline: 'none', background: 'transparent',
              fontSize: '13px', color: '#080C0C',
              fontFamily: "'Instrument Sans', sans-serif",
            }}
          />
        </div>

        {/* Table */}
        <div style={{ background: '#fff', border: '0.5px solid #e0e3e0', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 160px', padding: '10px 20px', borderBottom: '0.5px solid #f0f0ee' }}>
            <span style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#bbb' }}>Company</span>
            <span style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#bbb', textAlign: 'right' }}>Date added</span>
          </div>
          {filtered.length === 0 ? (
            <div style={{ padding: '32px', textAlign: 'center', fontSize: '13px', color: '#bbb' }}>
              No clients found
            </div>
          ) : (
            filtered.map((client, i) => {
              const av = getAvatarStyle(client.name)
              const isLast = i === filtered.length - 1
              return (
                <a
                  key={client.id}
                  href={`/dashboard/clients/${client.id}`}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 160px',
                    padding: '12px 20px',
                    borderBottom: isLast ? 'none' : '0.5px solid #f5f5f3',
                    alignItems: 'center',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    transition: 'background 0.1s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#fafafa' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '32px', height: '32px',
                      borderRadius: '8px',
                      background: av.bg, color: av.color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '11px', fontWeight: 700,
                      flexShrink: 0,
                    }}>
                      {av.initials || getInitials(client.name)}
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 500, color: '#080C0C' }}>{client.name}</div>
                      <div style={{ fontSize: '11px', color: '#bbb', marginTop: '2px' }}>{av.url || (client.contact_email ?? '')}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', fontSize: '13px', color: '#444' }}>
                    {formatDate(client.created_at)}
                  </div>
                </a>
              )
            })
          )}
        </div>
      </div>

      <AddClientModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
