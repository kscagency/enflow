'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addClient(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  // Get agency_id from agency_users
  const { data: agencyUser, error: agencyUserError } = await supabase
    .from('agency_users')
    .select('agency_id')
    .eq('auth_user_id', user.id)
    .single()

  if (agencyUserError || !agencyUser) return { error: 'Agency not found' }

  const servicesRaw = formData.get('services') as string | null
  const retainerRaw = formData.get('retainer_value') as string | null
  const contractStart = formData.get('contract_start_date') as string | null

  const { error } = await supabase.from('clients').insert({
    agency_id: agencyUser.agency_id,
    name: formData.get('name') as string,
    contact_name: (formData.get('contact_name') as string) || null,
    contact_email: (formData.get('contact_email') as string) || null,
    phone: (formData.get('phone') as string) || null,
    services: servicesRaw || null,
    retainer_value: retainerRaw ? parseFloat(retainerRaw) : null,
    contract_start_date: contractStart || null,
    campaign_goals: (formData.get('campaign_goals') as string) || null,
    internal_notes: (formData.get('internal_notes') as string) || null,
    invite_status: 'pending',
    // TODO: Send actual invite email via supabase.auth.admin.inviteUserByEmail
    // Requires service_role key — not available on the client-side SSR client.
    // Once a service-role admin client is set up, call:
    //   await adminClient.auth.admin.inviteUserByEmail(contact_email, { data: { agency_id, client_id } })
    // and set invited_at = new Date().toISOString()
  })

  if (error) return { error: error.message }

  revalidatePath('/dashboard')
  return { success: true }
}
