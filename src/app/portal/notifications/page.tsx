import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { NotificationList } from '@/components/portal/NotificationList'
import { EmptyState } from '@/components/ui/EmptyState'
import type { Client, Notification } from '@/types/database'

export default async function PortalNotificationsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: clientData } = await supabase
    .from('clients')
    .select('*')
    .eq('auth_user_id', user.id)
    .single()

  if (!clientData) redirect('/login')

  const client = clientData as Client

  const { data: notificationsData } = await supabase
    .from('notifications')
    .select('*')
    .eq('client_id', client.id)
    .order('created_at', { ascending: false })

  const notifications = (notificationsData as Notification[]) ?? []

  return (
    <div>
      <h1
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.375rem',
          fontWeight: 700,
          color: 'var(--brand-dark)',
          margin: '0 0 1.5rem',
        }}
      >
        Notifications
      </h1>

      {notifications.length === 0 ? (
        <EmptyState
          title="No notifications"
          description="You&rsquo;re all caught up. Check back later."
          icon={
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          }
        />
      ) : (
        <NotificationList notifications={notifications} clientId={client.id} />
      )}
    </div>
  )
}
