import type { DriveFolder } from '@/types/database'
import { FolderCard } from './FolderCard'

interface FileBrowserProps {
  folders: DriveFolder[]
}

export function FileBrowser({ folders }: FileBrowserProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '1rem',
      }}
    >
      {folders.map(folder => (
        <FolderCard key={folder.id} folder={folder} />
      ))}
    </div>
  )
}
