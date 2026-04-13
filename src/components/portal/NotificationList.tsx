'use client'

import type { Notification } from '@/types/database'
import { markAsRead, markAllAsRead } from '@/app/portal/notifications/actions'

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMinutes = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMinutes / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffDays > 1) return `${diffDays} days ago`
  if (diffDays === 1) return 'Yesterday'
  if (diffHours > 0) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`
  if (diffMinutes > 0) return `${diffMinutes} minute${diffMinutes === 1 ? '' : 's'} ago`
  return 'Just now'
}

function TypeIcon({ type }: { type: Notification['type'] }) {
  if (type === 'file_uploaded') {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    )
  }
  if (type === 'report_ready') {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    )
  }
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

interface NotificationListProps {
  notifications: Notification[]
  clientId: string
}

export function NotificationList({ notifications, clientId }: NotificationListProps) {
  const hasUnread = notifications.some(n => !n.is_read)

  return (
    <div>
      {hasUnread && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
          <button
            onClick={() => markAllAsRead(clientId)}
            style={{
              background: 'transparent',
              border: '0.5px solid rgba(10,123,123,0.35)',
              borderRadius: 'var(--radius-default)',
              padding: '0.4rem 0.875rem',
              fontSize: '0.8rem',
              fontWeight: 500,
              color: 'var(--brand-primary)',
              cursor: 'pointer',
              transition: 'background var(--transition-fast)',
            }}
          >
            Mark all as read
          </button>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {notifications.map((notification, index) => (
          <div
            key={notification.id}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.875rem',
              padding: '0.875rem',
              borderRadius: 'var(--radius-default)',
              background: notification.is_read ? 'transparent' : 'rgba(18,191,191,0.06)',
              borderBottom:
                index < notifications.length - 1
                  ? '0.5px solid rgba(26,58,58,0.08)'
                  : 'none',
              transition: 'background var(--transition-fast)',
            }}
          >
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: 'rgba(10,123,123,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--brand-primary)',
                flexShrink: 0,
                position: 'relative',
              }}
            >
              <TypeIcon type={notification.type} />
              {!notification.is_read && (
                <span
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'var(--brand-accent)',
                    border: '1.5px solid #fff',
                  }}
                />
              )}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                style={{
                  margin: 0,
                  fontSize: '0.875rem',
                  color: 'var(--brand-dark)',
                  fontWeight: notification.is_read ? 400 : 500,
                  lineHeight: 1.45,
                }}
              >
                {notification.message}
              </p>
              <p
                style={{
                  margin: '0.25rem 0 0',
                  fontSize: '0.75rem',
                  color: 'rgba(26,58,58,0.45)',
                }}
              >
                {formatRelativeTime(notification.created_at)}
              </p>
            </div>

            {!notification.is_read && (
              <button
                onClick={() => markAsRead(notification.id)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  padding: '0.25rem 0.5rem',
                  fontSize: '0.75rem',
                  color: 'rgba(26,58,58,0.45)',
                  cursor: 'pointer',
                  flexShrink: 0,
                  borderRadius: '4px',
                  transition: 'color var(--transition-fast)',
                  whiteSpace: 'nowrap',
                }}
              >
                Mark read
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
