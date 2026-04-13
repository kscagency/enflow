export default function BillingPage() {
  return (
    <>
      {/* Topbar */}
      <div style={{
        background: '#fff', borderBottom: '0.5px solid #e0e3e0',
        padding: '0 28px', height: '52px', display: 'flex', alignItems: 'center',
        flexShrink: 0,
      }}>
        <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '15px', fontWeight: 700, color: '#080C0C', letterSpacing: '-0.01em' }}>
          Billing
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
              <rect x="2" y="4" width="12" height="9" rx="1.5" stroke="#0A7B7B" strokeWidth="1.2"/>
              <path d="M5 4V3a1 1 0 011-1h4a1 1 0 011 1v1" stroke="#0A7B7B" strokeWidth="1.2"/>
            </svg>
          </div>
          <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '17px', fontWeight: 700, color: '#080C0C', margin: 0 }}>
            Billing coming soon
          </p>
          <p style={{ fontSize: '14px', color: 'rgba(8,12,12,0.45)', margin: 0, lineHeight: '1.5' }}>
            Manage your subscription, view invoices, and update payment details.
          </p>
        </div>
      </div>
    </>
  )
}
