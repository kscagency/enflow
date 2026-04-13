export default function HelpPage() {
  return (
    <>
      {/* Topbar */}
      <div style={{
        background: '#fff', borderBottom: '0.5px solid #e0e3e0',
        padding: '0 28px', height: '52px', display: 'flex', alignItems: 'center',
        flexShrink: 0,
      }}>
        <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '15px', fontWeight: 700, color: '#080C0C', letterSpacing: '-0.01em' }}>
          Help
        </span>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '40px 28px', background: '#F5F6F4' }}>
        <div style={{
          maxWidth: '480px', margin: '80px auto 0', textAlign: 'center',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px',
        }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '12px',
            background: 'rgba(10,123,123,0.1)', border: '0.5px solid rgba(10,123,123,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '4px',
          }}>
            <svg width="22" height="22" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6.5" stroke="#0A7B7B" strokeWidth="1.2"/>
              <path d="M8 9V8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2" stroke="#0A7B7B" strokeWidth="1.2" strokeLinecap="round"/>
              <circle cx="8" cy="11" r="0.75" fill="#0A7B7B"/>
            </svg>
          </div>
          <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '17px', fontWeight: 700, color: '#080C0C', margin: 0 }}>
            Help &amp; support coming soon
          </p>
          <p style={{ fontSize: '14px', color: 'rgba(8,12,12,0.45)', margin: 0, lineHeight: '1.5' }}>
            Documentation, guides, and support resources will be available here.
          </p>
        </div>
      </div>
    </>
  )
}
