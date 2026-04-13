'use client'

import { useState, useTransition } from 'react'
import { login } from './actions'

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      const result = await login(formData)
      if (result?.error) {
        setError(result.error)
      }
    })
  }

  return (
    <main
      style={{ background: 'var(--brand-login-bg)' }}
      className="min-h-screen flex items-center justify-center px-4"
    >
      <div className="w-full max-w-sm">
        {/* Wordmark */}
        <div className="text-center mb-8">
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              color: 'var(--brand-accent)',
              fontSize: '2rem',
              letterSpacing: '0.15em',
              fontWeight: 700,
            }}
          >
            ENFLOW
          </span>
        </div>

        {/* Card */}
        <div
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '0.5px solid rgba(18,191,191,0.2)',
            borderRadius: 'var(--radius-default)',
            boxShadow: '0 0 40px rgba(18,191,191,0.08)',
          }}
          className="p-8"
        >
          <h1
            style={{ color: '#e8f0ef', fontFamily: 'var(--font-heading)' }}
            className="text-xl font-bold mb-6"
          >
            Sign in
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                style={{ color: 'rgba(232,240,239,0.6)', fontSize: '0.8125rem' }}
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '0.5px solid rgba(18,191,191,0.25)',
                  borderRadius: 'var(--radius-default)',
                  color: '#e8f0ef',
                  padding: '0.625rem 0.875rem',
                  fontSize: '0.9375rem',
                  outline: 'none',
                  transition: 'border-color var(--transition-fast)',
                }}
                onFocus={e =>
                  (e.currentTarget.style.borderColor = 'var(--brand-accent)')
                }
                onBlur={e =>
                  (e.currentTarget.style.borderColor = 'rgba(18,191,191,0.25)')
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="password"
                style={{ color: 'rgba(232,240,239,0.6)', fontSize: '0.8125rem' }}
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '0.5px solid rgba(18,191,191,0.25)',
                  borderRadius: 'var(--radius-default)',
                  color: '#e8f0ef',
                  padding: '0.625rem 0.875rem',
                  fontSize: '0.9375rem',
                  outline: 'none',
                  transition: 'border-color var(--transition-fast)',
                }}
                onFocus={e =>
                  (e.currentTarget.style.borderColor = 'var(--brand-accent)')
                }
                onBlur={e =>
                  (e.currentTarget.style.borderColor = 'rgba(18,191,191,0.25)')
                }
              />
            </div>

            {error && (
              <p
                style={{
                  color: 'var(--brand-error)',
                  fontSize: '0.8125rem',
                  padding: '0.5rem 0.75rem',
                  background: 'rgba(226,75,74,0.1)',
                  borderRadius: 'var(--radius-default)',
                  border: '0.5px solid rgba(226,75,74,0.3)',
                }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isPending}
              style={{
                background: isPending
                  ? 'rgba(10,123,123,0.6)'
                  : 'var(--brand-primary)',
                color: '#fff',
                border: 'none',
                borderRadius: 'var(--radius-default)',
                padding: '0.75rem',
                fontSize: '0.9375rem',
                fontWeight: 500,
                cursor: isPending ? 'not-allowed' : 'pointer',
                transition: 'background var(--transition-fast)',
                marginTop: '0.25rem',
              }}
            >
              {isPending ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <a
              href="#"
              style={{
                color: 'rgba(18,191,191,0.7)',
                fontSize: '0.8125rem',
                textDecoration: 'none',
              }}
            >
              Forgot password?
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
