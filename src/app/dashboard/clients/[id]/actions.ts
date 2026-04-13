'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addDriveFolder(formData: FormData) {
  const supabase = await createClient()
  const clientId = formData.get('client_id') as string

  const { error } = await supabase.from('drive_folders').insert({
    client_id: clientId,
    folder_name: formData.get('folder_name') as string,
    drive_folder_id: formData.get('drive_folder_id') as string,
    folder_type: formData.get('folder_type') as 'assets' | 'reports' | 'deliverables',
  })

  if (error) return { error: error.message }

  revalidatePath(`/dashboard/clients/${clientId}`)
  return {}
}

export async function saveReportEmbed(formData: FormData) {
  const supabase = await createClient()
  const clientId = formData.get('client_id') as string
  const embedId = formData.get('embed_id') as string | null
  const embedUrl = formData.get('embed_url') as string

  if (embedId) {
    const { error } = await supabase
      .from('report_embeds')
      .update({ embed_url: embedUrl, updated_at: new Date().toISOString() })
      .eq('id', embedId)
    if (error) return { error: error.message }
  } else {
    const { error } = await supabase.from('report_embeds').insert({
      client_id: clientId,
      embed_url: embedUrl,
    })
    if (error) return { error: error.message }
  }

  revalidatePath(`/dashboard/clients/${clientId}`)
  return {}
}
