'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Client } from '@/types/database'
import { AddClientModal } from './AddClientModal'

const MOCK_CLIENTS: Client[] = [
  { id: 'mock-1', agency_id: 'a', auth_user_id: null, name: 'Acme Creative', contact_name: 'Marcus Webb', contact_email: 'hello@acmecreative.com', phone: null, invite_status: 'accepted', services: 'SEO, Paid Social', retainer_value: 4500, contract_start_date: null, campaign_goals: null, internal_notes: 'acmecreative.com', invited_at: null, created_at: '2026-03-01T00:00:00Z' },
  { id: 'mock-2', agency_id: 'a', auth_user_id: null, name: 'Bloom Health', contact_name: 'Sara Kim', contact_email: 'sara@bloomhealth.co', phone: null, invite_status: 'pending', services: 'Content, Email', retainer_value: 3000, contract_start_date: null, campaign_goals: null, internal_notes: 'bloomhealth.co', invited_at: null, created_at: '2026-02-15T00:00:00Z' },
  { id: 'mock-3', agency_id: 'a', auth_user_id: null, name: 'Forge Studio', contact_name: 'Liam Torres', contact_email: 'liam@forgestudio.io', phone: null, invite_status: 'accepted', services: 'PPC, Analytics', retainer_value: 6000, contract_start_date: null, campaign_goals: null, internal_notes: 'forgestudio.io', invited_at: null, created_at: '2026-01-20T00:00:00Z' },
  { id: 'mock-4', agency_id: 'a', auth_user_id: null, name: 'Nova Realty', contact_name: 'Priya Nair', contact_email: 'priya@novarealty.com', phone: null, invite_status: 'pending', services: 'SEO, Social', retainer_value: 2800, contract_start_date: null, campaign_goals: null, internal_notes: 'novarealty.com', invited_at: null, created_at: '2026-01-05T00:00:00Z' },
]

function getInitials(name: string) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const AVATAR_COLORS = ['rgba(10,123,123,0.15)', 'rgba(83,74,183,0.15)', 'rgba(250,199,117,0.2)', 'rgba(24,95,165,0.15)']
const AVATAR_TEXT_COLORS = ['#0A7B7B', '#534AB7', '#92580a', '#185FA5']

interface Props { clients: Client[] }

export function DashboardPageClient({ clients: serverClients }: Props) {
  const clients = serverClients.length > 0 ? serverClients : MOCK_CLIENTS
  const [modalOpen, setModalOpen] = useState(false)
  const [search, setSearch] = useState('')

  const filtered = clients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    (c.contact_email ?? '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      {/* Topbar */}
      <div style={{
        background: '#fff', borderBottom: '0.5px solid #e0e3e0',
        padding: '0 28px', height: '52px', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '15px', fontWeight: 700, color: '#080C0C', letterSpacing: '-0.01em' }}>
            Clients
          </span>
          {/* Search */}
          <div style={{ position: 'relative' }}>
            <svg style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} width="13" height="13" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5.5" stroke="#aaa" strokeWidth="1.2"/>
              <path d="M11 11l3 3" stroke="#aaa" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <input
              type="text" placeholder="Search clients…" value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                paddingLeft: '30px', paddingRight: '12px', height: '32px',
                border: '0.5px solid #e0e3e0', borderRadius: '8px',
                fontSize: '13px', color: '#080C0C', background: '#F5F6F4',
                outline: 'none', width: '200px', fontFamily: "'Instrument Sans', sans-serif",
              }}
            />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => setModalOpen(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              background: '#0A7B7B', color: '#fff', border: 'none',
              borderRadius: '8px', padding: '7px 14px', fontSize: '13px',
              fontWeight: 500, cursor: 'pointer', fontFamily: "'Instrument Sans', sans-serif",
              position: 'relative', overflow: 'hidden', transition: 'background 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#0c9090')}
            onMouseLeave={e => (e.currentTarget.style.background = '#0A7B7B')}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '0.5px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3) 50%, transparent)' }} />
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>
            <span style={{ position: 'relative' }}>Add Client</span>
          </button>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#F5F6F4', border: '0.5px solid #e0e3e0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 1a5 5 0 00-5 5v2.5L2 10h12l-1-1.5V6a5 5 0 00-5-5z" stroke="#6b6b6a" strokeWidth="1.2"/><path d="M6.5 13a1.5 1.5 0 003 0" stroke="#6b6b6a" strokeWidth="1.2" strokeLinecap="round"/></svg>
            <div style={{ position: 'absolute', top: '6px', right: '6px', width: '6px', height: '6px', borderRadius: '50%', background: '#E24B4A', border: '1.5px solid #fff' }} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px', background: '#F5F6F4' }}>
        {/* Stat cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '20px' }}>
          <StatCard label="Active Clients" value={clients.filter(c => c.invite_status === 'accepted').length.toString()} sub={`${clients.length} total`} />
          <StatCard label="New Files" value="3" sub="Added this week" accent />
        </div>

        {/* Client table */}
        <div style={{ background: '#fff', border: '0.5px solid #e0e3e0', borderRadius: '12px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '0.5px solid #e8ecea' }}>
                {['Client', 'Website', 'Status', 'Added', ''].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 500, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#aaa', fontFamily: "'Instrument Sans', sans-serif" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: '32px', textAlign: 'center', fontSize: '13px', color: '#aaa' }}>
                    No clients found.
                  </td>
                </tr>
              ) : filtered.map((client, i) => (
                <tr key={client.id} style={{ borderBottom: '0.5px solid #f0f0ee' }}>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0,
                        background: AVATAR_COLORS[i % AVATAR_COLORS.length],
                        border: `0.5px solid ${AVATAR_TEXT_COLORS[i % AVATAR_TEXT_COLORS.length]}30`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '11px', fontWeight: 700, color: AVATAR_TEXT_COLORS[i % AVATAR_TEXT_COLORS.length],
                      }}>
                        {getInitials(client.name)}
                      </div>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 500, color: '#080C0C' }}>{client.name}</div>
                        {client.contact_name && <div style={{ fontSize: '11px', color: '#aaa' }}>{client.contact_name}</div>}
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ fontSize: '12px', color: '#0A7B7B' }}>
                      {client.internal_notes ?? client.contact_email ?? '—'}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', padding: '3px 8px',
                      borderRadius: '999px', fontSize: '11px', fontWeight: 500,
                      background: client.invite_status === 'accepted' ? 'rgba(10,123,123,0.1)' : 'rgba(250,199,117,0.2)',
                      color: client.invite_status === 'accepted' ? '#0A7B7B' : '#92580a',
                      border: `0.5px solid ${client.invite_status === 'accepted' ? 'rgba(10,123,123,0.25)' : 'rgba(250,199,117,0.5)'}`,
                    }}>
                      {client.invite_status === 'accepted' ? 'Active' : 'Pending'}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '12px', color: '#aaa' }}>
                    {formatDate(client.created_at)}
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <Link href={`/dashboard/clients/${client.id}`} style={{
                      fontSize: '12px', fontWeight: 500, color: '#0A7B7B', textDecoration: 'none',
                    }}>
                      View →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddClientModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}

function StatCard({ label, value, sub, accent }: { label: string; value: string; sub: string; accent?: boolean }) {
  return (
    <div style={{
      background: '#fff', border: '0.5px solid #e0e3e0', borderRadius: '12px',
      padding: '16px 20px', position: 'relative', overflow: 'hidden',
    }}>
      {accent && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: '#0A7B7B' }} />}
      <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#aaa', marginBottom: '6px' }}>
        {label}
      </div>
      <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '26px', fontWeight: 700, color: '#080C0C', letterSpacing: '-0.02em', marginBottom: '2px' }}>
        {value}
      </div>
      <div style={{ fontSize: '11px', color: '#aaa' }}>{sub}</div>
    </div>
  )
}
