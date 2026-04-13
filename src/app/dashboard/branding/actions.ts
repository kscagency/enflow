'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function saveBranding(formData: FormData) {
  const supabase = await createClient()
  const agencyId = formData.get('agency_id') as string

  const updates: Record<string, string | null> = {
    brand_primary_color: (formData.get('brand_primary_color') as string) || null,
    brand_accent_color: (formData.get('brand_accent_color') as string) || null,
    brand_background_color: (formData.get('brand_background_color') as string) || null,
    brand_text_color: (formData.get('brand_text_color') as string) || null,
    brand_font_url: (formData.get('brand_font_url') as string) || null,
  }

  // Only include keys that were actually submitted
  const filteredUpdates = Object.fromEntries(
    Object.entries(updates).filter(([key]) => formData.has(key))
  )

  const { error } = await supabase
    .from('agencies')
    .update(filteredUpdates)
    .eq('id', agencyId)

  if (error) return { error: error.message }

  revalidatePath('/dashboard/branding')
  return {}
}

export async function uploadLogo(formData: FormData) {
  const supabase = await createClient()
  const agencyId = formData.get('agency_id') as string
  const file = formData.get('logo') as File

  if (!file || file.size === 0) return { error: 'No file provided' }

  const ext = file.name.split('.').pop() ?? 'png'
  const path = `${agencyId}/logo.${ext}`

  const { error: uploadError } = await supabase.storage
    .from('agency-assets')
    .upload(path, file, { upsert: true, contentType: file.type })

  if (uploadError) return { error: uploadError.message }

  const { data } = supabase.storage.from('agency-assets').getPublicUrl(path)
  const url = data.publicUrl

  const { error: dbError } = await supabase
    .from('agencies')
    .update({ logo_url: url })
    .eq('id', agencyId)

  if (dbError) return { error: dbError.message }

  revalidatePath('/dashboard/branding')
  return { url }
}
