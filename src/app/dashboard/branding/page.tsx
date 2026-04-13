import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { BrandingForm } from '@/components/dashboard/BrandingForm'
import { saveBranding, uploadLogo } from './actions'
import type { Agency, PlanTier } from '@/types/database'

export default async function BrandingPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) notFound()

  const { data: agencyUser } = await supabase
    .from('agency_users')
    .select('agency_id')
    .eq('auth_user_id', user.id)
    .single()

  if (!agencyUser) notFound()

  const { data: agencyData } = await supabase
    .from('agencies')
    .select('*')
    .eq('id', agencyUser.agency_id)
    .single()

  if (!agencyData) notFound()

  const agency = agencyData as Agency

  let plan: PlanTier | null = null
  if (agency.plan_tier_id) {
    const { data } = await supabase
      .from('plan_tiers')
      .select('*')
      .eq('id', agency.plan_tier_id)
      .single()
    plan = (data as PlanTier) ?? null
  }

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.375rem',
            fontWeight: 700,
            color: 'var(--brand-dark)',
            margin: 0,
          }}
        >
          Branding
        </h1>
        <p style={{ margin: '0.35rem 0 0', fontSize: '0.875rem', color: 'rgba(26,58,58,0.5)' }}>
          Customize how your client portal looks. Changes apply immediately.
        </p>
      </div>

      <BrandingForm
        agency={agency}
        plan={plan}
        onSave={saveBranding}
        onLogoUpload={uploadLogo}
      />
    </div>
  )
}
