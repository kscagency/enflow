'use client'

import { useState } from 'react'

const MOCK_NOTIFICATIONS = [
  {
    id: '1',
    group: 'Today',
    text: 'Your March campaign report is ready to view.',
    time: 'Today · 9:14 AM',
    type: 'report',
    unread: true,
    action: 'View report →',
  },
  {
    id: '2',
    group: 'Today',
    text: '3 new files added to your Assets folder.',
    time: 'Today · 8:30 AM',
    type: 'file',
    unread: true,
    action: 'View files →',
  },
  {
    id: '3',
    group: 'Earlier',
    text: 'Your February campaign report is ready to view.',
    time: 'Feb 28 · 10:05 AM',
    type: 'report',
    unread: false,
    action: 'View report →',
  },
  {
    id: '4',
    group: 'Earlier',
    text: 'New file added to your Deliverables folder.',
    time: 'Feb 24 · 2:18 PM',
    type: 'file',
    unread: false,
    action: 'View files →',
  },
  {
    id: '5',
    group: 'Earlier',
    text: '5 new files added to your Assets folder.',
    time: 'Feb 18 · 11:42 AM',
    type: 'file',
    unread: false,
    action: 'View files →',
  },
  {
    id: '6',
    group: 'Earlier',
    text: 'Your January campaign report is ready to view.',
    time: 'Jan 31 · 9:00 AM',
    type: 'report',
    unread: false,
    action: 'View report →',
  },
]

const FILTERS = ['All', 'Unread', 'Files', 'Reports']

function NotifIcon({ type, unread }: { type: string; unread: boolean }) {
  const color = unread ? '#0A7B7B' : '#aaa'
  const bg = unread ? 'rgba(10,123,123,0.1)' : '#F5F6F4'

  if (type === 'report') {
    return (
      <div style={{ width: '34px', height: '34px', borderRadius: '9px', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="1" y="4" width="14" height="10" rx="1.5" stroke={color} strokeWidth="1.2"/>
          <path d="M5 4V3a1 1 0 011-1h4a1 1 0 011 1v1" stroke={color} strokeWidth="1.2"/>
          <path d="M4 9h8M4 12h5" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      </div>
    )
  }
  return (
    <div style={{ width: '34px', height: '34px', borderRadius: '9px', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M2 3.5A1.5 1.5 0 013.5 2h2l1 1.5H12.5A1.5 1.5 0 0114 5v7a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 012 12V3.5z" stroke={color} strokeWidth="1.2"/>
      </svg>
    </div>
  )
}

export default function PortalNotificationsPage() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = MOCK_NOTIFICATIONS.filter(n => {
    if (activeFilter === 'All') return true
    if (activeFilter === 'Unread') return n.unread
    if (activeFilter === 'Files') return n.type === 'file'
    if (activeFilter === 'Reports') return n.type === 'report'
    return true
  })

  const groups = ['Today', 'Earlier']

  return (
    <>
      {/* Topbar */}
      <div style={{
        background: '#fff',
        borderBottom: '0.5px solid #e0e3e0',
        padding: '0 28px',
        height: '52px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '15px', fontWeight: 700, color: '#080C0C', letterSpacing: '-0.01em' }}>
          Notifications
        </span>
        <span style={{ fontSize: '12px', fontWeight: 500, color: '#0A7B7B', cursor: 'pointer' }}>
          Mark all as read
        </span>
      </div>

      {/* Filter bar */}
      <div style={{ background: '#fff', borderBottom: '0.5px solid #e0e3e0', padding: '0 28px', display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: '12px', fontWeight: 500,
              color: activeFilter === f ? '#0A7B7B' : '#aaa',
              padding: '11px 14px', cursor: 'pointer',
              border: 'none', background: 'transparent',
              borderBottom: `2px solid ${activeFilter === f ? '#0A7B7B' : 'transparent'}`,
              transition: 'color 0.15s',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: '20px 28px', flex: 1, overflowY: 'auto' }}>
        {groups.map(group => {
          const groupItems = filtered.filter(n => n.group === group)
          if (groupItems.length === 0) return null
          return (
            <div key={group} style={{ marginBottom: '24px' }}>
              <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#aaa', margin: '0 0 10px' }}>
                {group}
              </p>
              <div style={{ background: '#fff', border: '0.5px solid #e0e3e0', borderRadius: '12px', overflow: 'hidden' }}>
                {groupItems.map((n, i) => {
                  const isLast = i === groupItems.length - 1
                  return (
                    <div
                      key={n.id}
                      style={{
                        display: 'flex', alignItems: 'flex-start', gap: '14px',
                        padding: '14px 18px',
                        borderBottom: isLast ? 'none' : '0.5px solid #f5f5f3',
                        borderLeft: n.unread ? '2.5px solid #0A7B7B' : 'none',
                        background: n.unread ? 'rgba(10,123,123,0.02)' : 'transparent',
                        position: 'relative',
                      }}
                    >
                      <NotifIcon type={n.type} unread={n.unread} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: '13px', color: n.unread ? '#080C0C' : '#888', margin: '0 0 4px', lineHeight: 1.45 }}>
                          {n.text}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '11px', color: '#bbb' }}>{n.time}</span>
                          <span style={{ fontSize: '11px', fontWeight: 500, color: '#0A7B7B', cursor: 'pointer' }}>{n.action}</span>
                        </div>
                      </div>
                      <div style={{
                        width: '7px', height: '7px', borderRadius: '50%',
                        background: n.unread ? '#E24B4A' : 'transparent',
                        flexShrink: 0, marginTop: '6px',
                      }} />
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
