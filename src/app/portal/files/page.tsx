'use client'

import { useState } from 'react'

type FileType = 'pdf' | 'doc' | 'zip' | 'img'
interface MockFile { id: string; name: string; type: FileType; size: string; date: string; folder: string }

const MOCK_FILES: MockFile[] = [
  { id: 'f1', name: 'March 2026 Report.pdf', type: 'pdf', size: '2.4 MB', date: 'Mar 18, 2026', folder: 'reports' },
  { id: 'f2', name: 'Brand Kit v2.zip', type: 'zip', size: '18.1 MB', date: 'Mar 12, 2026', folder: 'assets' },
  { id: 'f3', name: 'Social Media Pack.zip', type: 'zip', size: '9.3 MB', date: 'Mar 10, 2026', folder: 'assets' },
  { id: 'f4', name: 'SEO Audit Brief.doc', type: 'doc', size: '340 KB', date: 'Feb 28, 2026', folder: 'deliverables' },
  { id: 'f5', name: 'February Report.pdf', type: 'pdf', size: '2.1 MB', date: 'Feb 28, 2026', folder: 'reports' },
  { id: 'f6', name: 'Campaign Creative.zip', type: 'zip', size: '22.7 MB', date: 'Feb 20, 2026', folder: 'assets' },
  { id: 'f7', name: 'Q1 Strategy Doc.doc', type: 'doc', size: '520 KB', date: 'Feb 15, 2026', folder: 'deliverables' },
  { id: 'f8', name: 'January Report.pdf', type: 'pdf', size: '1.9 MB', date: 'Jan 31, 2026', folder: 'reports' },
]

const TYPE_COLORS: Record<FileType, { bg: string; text: string; border: string }> = {
  pdf: { bg: 'rgba(226,75,74,0.08)', text: '#E24B4A', border: 'rgba(226,75,74,0.2)' },
  doc: { bg: 'rgba(24,95,165,0.08)', text: '#185FA5', border: 'rgba(24,95,165,0.2)' },
  zip: { bg: 'rgba(83,74,183,0.08)', text: '#534AB7', border: 'rgba(83,74,183,0.2)' },
  img: { bg: 'rgba(10,123,123,0.08)', text: '#0A7B7B', border: 'rgba(10,123,123,0.2)' },
}

const TABS = [
  { key: 'assets', label: 'Assets' },
  { key: 'reports', label: 'Reports' },
  { key: 'deliverables', label: 'Deliverables' },
]

export default function PortalFilesPage() {
  const [tab, setTab] = useState('assets')
  const [grid, setGrid] = useState(true)

  const files = MOCK_FILES.filter(f => f.folder === tab)

  return (
    <>
      {/* Topbar */}
      <div style={{ background: '#fff', borderBottom: '0.5px solid #e0e3e0', padding: '0 28px', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '15px', fontWeight: 700, color: '#080C0C', letterSpacing: '-0.01em' }}>Files</span>
        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#F5F6F4', border: '0.5px solid #e0e3e0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 1a5 5 0 00-5 5v2.5L2 10h12l-1-1.5V6a5 5 0 00-5-5z" stroke="#6b6b6a" strokeWidth="1.2"/><path d="M6.5 13a1.5 1.5 0 003 0" stroke="#6b6b6a" strokeWidth="1.2" strokeLinecap="round"/></svg>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', background: '#F5F6F4' }}>
        {/* Tab bar */}
        <div style={{ background: '#fff', borderBottom: '0.5px solid #e0e3e0', padding: '0 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '0' }}>
            {TABS.map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                style={{
                  padding: '12px 16px', background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: '13px', fontWeight: tab === t.key ? 500 : 400,
                  color: tab === t.key ? '#080C0C' : '#aaa',
                  borderBottom: tab === t.key ? '2px solid #0A7B7B' : '2px solid transparent',
                  marginBottom: '-0.5px', transition: 'color 0.15s',
                  fontFamily: "'Instrument Sans', sans-serif",
                }}
              >
                {t.label}
                <span style={{ marginLeft: '6px', fontSize: '11px', color: tab === t.key ? '#0A7B7B' : '#ccc', fontWeight: 400 }}>
                  {MOCK_FILES.filter(f => f.folder === t.key).length}
                </span>
              </button>
            ))}
          </div>
          {/* View toggle */}
          <div style={{ display: 'flex', gap: '4px' }}>
            {[true, false].map(isGrid => (
              <button
                key={String(isGrid)}
                onClick={() => setGrid(isGrid)}
                style={{
                  width: '28px', height: '28px', borderRadius: '6px', border: 'none',
                  background: grid === isGrid ? '#F5F6F4' : 'transparent',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: grid === isGrid ? '#080C0C' : '#ccc',
                }}
              >
                {isGrid ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="5" height="5" rx="1" fill="currentColor"/><rect x="8" y="1" width="5" height="5" rx="1" fill="currentColor"/><rect x="1" y="8" width="5" height="5" rx="1" fill="currentColor"/><rect x="8" y="8" width="5" height="5" rx="1" fill="currentColor"/></svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><line x1="1" y1="3" x2="13" y2="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><line x1="1" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><line x1="1" y1="11" x2="13" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                )}
              </button>
            ))}
          </div>
        </div>

        <div style={{ padding: '24px 28px' }}>
          {files.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px', color: '#aaa', fontSize: '13px' }}>
              No files in this folder yet.
            </div>
          ) : grid ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
              {files.map(file => <FileCard key={file.id} file={file} />)}
            </div>
          ) : (
            <div style={{ background: '#fff', border: '0.5px solid #e0e3e0', borderRadius: '12px', overflow: 'hidden' }}>
              {files.map((file, i) => (
                <div key={file.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderBottom: i < files.length - 1 ? '0.5px solid #f0f0ee' : 'none' }}>
                  <TypeBadge type={file.type} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: 500, color: '#080C0C' }}>{file.name}</div>
                    <div style={{ fontSize: '11px', color: '#aaa' }}>{file.size} · {file.date}</div>
                  </div>
                  <a href="#" style={{ fontSize: '12px', color: '#0A7B7B', textDecoration: 'none', fontWeight: 500 }}>Download</a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

function FileCard({ file }: { file: MockFile }) {
  return (
    <div style={{ background: '#fff', border: '0.5px solid #e0e3e0', borderRadius: '10px', padding: '16px', cursor: 'pointer', transition: 'box-shadow 0.15s' }}>
      <TypeBadge type={file.type} large />
      <div style={{ marginTop: '12px' }}>
        <div style={{ fontSize: '13px', fontWeight: 500, color: '#080C0C', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</div>
        <div style={{ fontSize: '11px', color: '#aaa' }}>{file.size}</div>
        <div style={{ fontSize: '11px', color: '#aaa', marginTop: '2px' }}>{file.date}</div>
      </div>
    </div>
  )
}

function TypeBadge({ type, large }: { type: FileType; large?: boolean }) {
  const c = TYPE_COLORS[type]
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: large ? '40px' : '32px', height: large ? '40px' : '32px',
      borderRadius: large ? '10px' : '7px',
      background: c.bg, border: `0.5px solid ${c.border}`,
      fontSize: large ? '11px' : '10px', fontWeight: 700, color: c.text,
      textTransform: 'uppercase', letterSpacing: '0.02em',
    }}>
      {type}
    </div>
  )
}
