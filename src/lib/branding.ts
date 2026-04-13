import { createClient } from '@/lib/supabase/server'
import type { Agency, PlanTier } from '@/types'

export async function getAgencyBranding(subdomain: string): Promise<{ agency: Agency; tier: PlanTier } | null> {
  const supabase = await createClient()
  const { data: agency } = await supabase
    .from('agencies')
    .select('*, plan_tiers(*)')
    .eq('subdomain', subdomain)
    .single()

  if (!agency) return null
  return { agency, tier: agency.plan_tiers as PlanTier }
}

export function generateBrandCSS(agency: Agency, tier: PlanTier): string {
  const vars: string[] = []

  // Always available
  vars.push(`--brand-primary: ${agency.brand_primary_color || '#0A7B7B'}`)
  if (agency.logo_url) vars.push(`--brand-logo: url(${agency.logo_url})`)

  // Growth+ features
  if (tier.accent_color && agency.brand_accent_color) {
    vars.push(`--brand-accent: ${agency.brand_accent_color}`)
  }

  // Pro features
  if (tier.full_brand_kit) {
    if (agency.brand_background_color) vars.push(`--brand-bg: ${agency.brand_background_color}`)
    if (agency.brand_text_color) vars.push(`--brand-text: ${agency.brand_text_color}`)
  }
  if (tier.custom_font && agency.brand_font_url) {
    vars.push(`--font-body: '${agency.brand_font_url}'`)
  }

  return `:root { ${vars.join('; ')} }`
}
