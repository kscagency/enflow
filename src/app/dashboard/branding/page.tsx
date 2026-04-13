import { createClient } from '@/lib/supabase/server'
import { BrandingForm } from '@/components/dashboard/BrandingForm'
import { saveBranding, uploadLogo } from './actions'
import type { Agency, PlanTier } from '@/types/database'

const MOCK_AGENCY: Agency = {
  id: 'preview-agency',
  plan_tier_id: null,
  name: 'Acme Agency',
  subdomain: 'acme',
  logo_url: null,
  brand_primary_color: '#0A7B7B',
  brand_accent_color: '#12BFBF',
  brand_background_color: null,
  brand_text_color: null,
  brand_font_url: null,
  created_at: new Date().toISOString(),
}

export default async function BrandingPage() {
  let agency: Agency = MOCK_AGENCY
  let plan: PlanTier | null = null

  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data: agencyUser } = await supabase.from('agency_users').select('agency_id').eq('auth_user_id', user.id).single()
      if (agencyUser) {
        const { data: agencyData } = await supabase.from('agencies').select('*').eq('id', agencyUser.agency_id).single()
        if (agencyData) {
          agency = agencyData as Agency
          if (agency.plan_tier_id) {
            const { data } = await supabase.from('plan_tiers').select('*').eq('id', agency.plan_tier_id).single()
            plan = (data as PlanTier) ?? null
          }
        }
      }
    }
  } catch {
    // No Supabase — use mock data
  }

  return <BrandingForm agency={agency} plan={plan} onSave={saveBranding} onLogoUpload={uploadLogo} />
}
