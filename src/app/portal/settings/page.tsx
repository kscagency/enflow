import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { logout } from '@/app/login/actions'
import { PasswordChangeForm } from '@/components/shared/PasswordChangeForm'

export default async function PortalSettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: client } = await supabase
    .from('clients')
    .select('contact_name, contact_email')
    .eq('auth_user_id', user.id)
    .single()

  const displayName = client?.contact_name ?? user.email ?? 'Client'
  const displayEmail = client?.contact_email ?? user.email ?? ''

  const sectionStyle: React.CSSProperties = {
    background: '#fff',
    borderRadius: 'var(--radius-default)',
    border: '0.5px solid rgba(26,58,58,0.12)',
    padding: '1.5rem',
    marginBottom: '1.5rem',
  }

  const fieldStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
    marginBottom: '1rem',
  }

  const fieldLabelStyle: React.CSSProperties = {
    fontSize: '0.75rem',
    fontWeight: 500,
    color: 'var(--brand-dark)',
    opacity: 0.6,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
  }

  const fieldValueStyle: React.CSSProperties = {
    fontSize: '0.9375rem',
    color: 'var(--brand-dark)',
  }

  return (
    <div style={{ maxWidth: '560px' }}>
      <h1
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.5rem',
          fontWeight: 700,
          color: 'var(--brand-dark)',
          marginBottom: '1.5rem',
        }}
      >
        Account Settings
      </h1>

      <section style={sectionStyle}>
        <h2
          style={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: 'var(--brand-dark)',
            marginBottom: '1rem',
            opacity: 0.85,
          }}
        >
          Profile
        </h2>

        <div style={fieldStyle}>
          <span style={fieldLabelStyle}>Name</span>
          <span style={fieldValueStyle}>{displayName}</span>
        </div>

        <div style={{ ...fieldStyle, marginBottom: 0 }}>
          <span style={fieldLabelStyle}>Email</span>
          <span style={fieldValueStyle}>{displayEmail}</span>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2
          style={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: 'var(--brand-dark)',
            marginBottom: '1rem',
            opacity: 0.85,
          }}
        >
          Change Password
        </h2>
        <PasswordChangeForm />
      </section>

      <section style={{ ...sectionStyle, marginBottom: 0 }}>
        <h2
          style={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: 'var(--brand-dark)',
            marginBottom: '1rem',
            opacity: 0.85,
          }}
        >
          Session
        </h2>
        <form action={logout}>
          <button
            type="submit"
            style={{
              padding: '0.5rem 1.25rem',
              background: 'transparent',
              color: 'var(--brand-error)',
              border: '0.5px solid var(--brand-error)',
              borderRadius: 'var(--radius-default)',
              fontSize: '0.875rem',
              fontWeight: 500,
              fontFamily: 'var(--font-body)',
              cursor: 'pointer',
              transition: 'opacity var(--transition-fast)',
            }}
          >
            Log out
          </button>
        </form>
      </section>
    </div>
  )
}
