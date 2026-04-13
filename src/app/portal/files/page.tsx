'use client'

import { useState } from 'react'

const MOCK_FILES = [
  { id: '1', name: 'Brand_Guidelines.pdf', size: '2.4 MB', date: 'Mar 18', type: 'pdf' },
  { id: '2', name: 'Logo_Primary.png', size: '340 KB', date: 'Mar 10', type: 'image' },
  { id: '3', name: 'Logo_White.png', size: '280 KB', date: 'Mar 10', type: 'image' },
  { id: '4', name: 'Banner_March.jpg', size: '1.1 MB', date: 'Mar 14', type: 'image' },
  { id: '5', name: 'Ad_Copy_Q1.docx', size: '88 KB', date: 'Feb 28', type: 'doc' },
  { id: '6', name: 'Social_Captions.docx', size: '54 KB', date: 'Feb 22', type: 'doc' },
  { id: '7', name: 'Campaign_Assets.zip', size: '14.2 MB', date: 'Mar 1', type: 'zip' },
  { id: '8', name: 'Hero_Image.png', size: '2.8 MB', date: 'Mar 5', type: 'image' },
]

const TABS = ['Assets', 'Reports', 'Deliverables']

function FileTypeIcon({ type }: { type: string }) {
  if (type === 'pdf') {
    return (
      <div style={{ width: '100%', height: '64px', borderRadius: '7px', background: '#FEF0F0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
        <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.05em', background: '#E24B4A', color: '#fff', padding: '3px 7px', borderRadius: '5px' }}>PDF</span>
      </div>
    )
  }
  if (type === 'doc') {
    return (
      <div style={{ width: '100%', height: '64px', borderRadius: '7px', background: '#EEF3FE', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
        <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.05em', background: '#185FA5', color: '#fff', padding: '3px 7px', borderRadius: '5px' }}>DOC</span>
      </div>
    )
  }
  if (type === 'zip') {
    return (
      <div style={{ width: '100%', height: '64px', borderRadius: '7px', background: '#FEF7EC', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
        <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.05em', background: '#854F0B', color: '#fff', padding: '3px 7px', borderRadius: '5px' }}>ZIP</span>
      </div>
    )
  }
  // image / default
  return (
    <div style={{ width: '100%', height: '64px', borderRadius: '7px', background: '#EDF9F6', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="4" width="20" height="20" rx="3" fill="#0A7B7B" opacity="0.15"/>
        <path d="M9 14l3.5 3.5L19 10" stroke="#0A7B7B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  )
}

export default function PortalFilesPage() {
  const [activeTab, setActiveTab] = useState('Assets')
  const [gridView, setGridView] = useState(true)

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
          Files
        </span>
        <span style={{ fontSize: '12px', color: '#aaa' }}>Last updated today</span>
      </div>

      {/* Tabs bar */}
      <div style={{ background: '#fff', borderBottom: '0.5px solid #e0e3e0', padding: '0 28px', display: 'flex', alignItems: 'center', gap: '2px', flexShrink: 0 }}>
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: '13px', fontWeight: 500,
              color: activeTab === tab ? '#0A7B7B' : '#aaa',
              padding: '12px 16px',
              cursor: 'pointer',
              border: 'none', background: 'transparent',
              borderBottom: `2px solid ${activeTab === tab ? '#0A7B7B' : 'transparent'}`,
              transition: 'color 0.15s',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: '20px 28px', flex: 1, overflowY: 'auto' }}>
        {/* Files meta */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <span style={{ fontSize: '12px', color: '#aaa' }}>{MOCK_FILES.length} files</span>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button
              onClick={() => setGridView(true)}
              style={{
                width: '28px', height: '28px', borderRadius: '7px', cursor: 'pointer', border: 'none',
                background: gridView ? 'rgba(10,123,123,0.1)' : '#fff',
                borderColor: gridView ? 'rgba(10,123,123,0.3)' : '#e0e3e0',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                outline: `0.5px solid ${gridView ? 'rgba(10,123,123,0.3)' : '#e0e3e0'}`,
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <rect x="1" y="1" width="4" height="4" rx="1" stroke={gridView ? '#0A7B7B' : '#aaa'} strokeWidth="1"/>
                <rect x="7" y="1" width="4" height="4" rx="1" stroke={gridView ? '#0A7B7B' : '#aaa'} strokeWidth="1"/>
                <rect x="1" y="7" width="4" height="4" rx="1" stroke={gridView ? '#0A7B7B' : '#aaa'} strokeWidth="1"/>
                <rect x="7" y="7" width="4" height="4" rx="1" stroke={gridView ? '#0A7B7B' : '#aaa'} strokeWidth="1"/>
              </svg>
            </button>
            <button
              onClick={() => setGridView(false)}
              style={{
                width: '28px', height: '28px', borderRadius: '7px', cursor: 'pointer', border: 'none',
                background: !gridView ? 'rgba(10,123,123,0.1)' : '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                outline: `0.5px solid ${!gridView ? 'rgba(10,123,123,0.3)' : '#e0e3e0'}`,
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 3h10M1 6h10M1 9h10" stroke={!gridView ? '#0A7B7B' : '#aaa'} strokeWidth="1" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Files grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: '12px' }}>
          {MOCK_FILES.map(file => (
            <div
              key={file.id}
              style={{
                background: '#fff', border: '0.5px solid #e0e3e0', borderRadius: '10px',
                padding: '14px', cursor: 'pointer', transition: 'border-color 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(10,123,123,0.3)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#e0e3e0' }}
            >
              <FileTypeIcon type={file.type} />
              <p style={{ fontSize: '12px', fontWeight: 500, color: '#080C0C', margin: '0 0 3px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {file.name}
              </p>
              <p style={{ fontSize: '11px', color: '#bbb', margin: 0 }}>
                {file.size} · {file.date}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
