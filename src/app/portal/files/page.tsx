import { createClient } from '@/lib/supabase/server'
import { FileBrowser } from '@/components/portal/FileBrowser'
import { EmptyState } from '@/components/ui/EmptyState'
import type { Client, DriveFolder } from '@/types/database'

export default async function PortalFilesPage() {
  let folders: DriveFolder[] = []

  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      const { data: clientData } = await supabase
        .from('clients')
        .select('*')
        .eq('auth_user_id', user.id)
        .single()

      if (clientData) {
        const client = clientData as Client

        const { data: foldersData } = await supabase
          .from('drive_folders')
          .select('*')
          .eq('client_id', client.id)
          .order('created_at')

        folders = (foldersData as DriveFolder[]) ?? []
      }
    }
  } catch {
    // No Supabase connection — render empty state for UI preview
  }

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
        Files
      </h1>

      {folders.length === 0 ? (
        <EmptyState
          title="No files yet"
          description="Your agency will share files here soon."
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
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            </svg>
          }
        />
      ) : (
        <FileBrowser folders={folders} />
      )}
    </div>
  )
}
