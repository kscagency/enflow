import { createClient } from '@/lib/supabase/server'
import { ClientList } from '@/components/dashboard/ClientList'
import { EmptyState } from '@/components/ui/EmptyState'
import { DashboardPageClient } from '@/components/dashboard/DashboardPageClient'
import type { Client } from '@/types/database'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  let clients: Client[] = []

  if (user) {
    const { data: agencyUser } = await supabase
      .from('agency_users')
      .select('agency_id')
      .eq('auth_user_id', user.id)
      .single()

    if (agencyUser) {
      const { data } = await supabase
        .from('clients')
        .select('*')
        .eq('agency_id', agencyUser.agency_id)
        .order('created_at', { ascending: false })

      clients = (data as Client[]) ?? []
    }
  }

  return <DashboardPageClient clients={clients} />
}
