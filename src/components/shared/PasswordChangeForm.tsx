'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export function PasswordChangeForm() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrorMsg('')

    if (newPassword.length < 8) {
      setErrorMsg('New password must be at least 8 characters.')
      return
    }
    if (newPassword !== confirmPassword) {
      setErrorMsg('New passwords do not match.')
      return
    }

    setStatus('loading')

    // Re-authenticate with current password to verify it
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user?.email) {
      setStatus('error')
      setErrorMsg('Could not retrieve current user.')
      return
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: currentPassword,
    })

    if (signInError) {
      setStatus('error')
      setErrorMsg('Current password is incorrect.')
      return
    }

    const { error } = await supabase.auth.updateUser({ password: newPassword })

    if (error) {
      setStatus('error')
      setErrorMsg(error.message)
    } else {
      setStatus('success')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.5rem 0.75rem',
    border: '0.5px solid rgba(26,58,58,0.2)',
    borderRadius: 'var(--radius-default)',
    fontSize: '0.875rem',
    fontFamily: 'var(--font-body)',
    background: '#fff',
    color: 'var(--brand-dark)',
    outline: 'none',
    transition: 'border-color var(--transition-fast)',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.75rem',
    fontWeight: 500,
    color: 'var(--brand-dark)',
    marginBottom: '0.375rem',
    opacity: 0.7,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <label htmlFor="current-password" style={labelStyle}>Current Password</label>
        <input
          id="current-password"
          type="password"
          value={currentPassword}
          onChange={e => setCurrentPassword(e.target.value)}
          required
          autoComplete="current-password"
          style={inputStyle}
        />
      </div>

      <div>
        <label htmlFor="new-password" style={labelStyle}>New Password</label>
        <input
          id="new-password"
          type="password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          required
          minLength={8}
          autoComplete="new-password"
          style={inputStyle}
        />
      </div>

      <div>
        <label htmlFor="confirm-password" style={labelStyle}>Confirm New Password</label>
        <input
          id="confirm-password"
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
          autoComplete="new-password"
          style={inputStyle}
        />
      </div>

      {errorMsg && (
        <p style={{ fontSize: '0.8125rem', color: 'var(--brand-error)', margin: 0 }}>
          {errorMsg}
        </p>
      )}

      {status === 'success' && (
        <p style={{ fontSize: '0.8125rem', color: '#16a34a', margin: 0 }}>
          Password updated successfully.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        style={{
          alignSelf: 'flex-start',
          padding: '0.5rem 1.25rem',
          background: 'var(--brand-primary)',
          color: '#fff',
          border: 'none',
          borderRadius: 'var(--radius-default)',
          fontSize: '0.875rem',
          fontWeight: 500,
          fontFamily: 'var(--font-body)',
          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
          opacity: status === 'loading' ? 0.7 : 1,
          transition: 'opacity var(--transition-fast)',
        }}
      >
        {status === 'loading' ? 'Updating…' : 'Update Password'}
      </button>
    </form>
  )
}
