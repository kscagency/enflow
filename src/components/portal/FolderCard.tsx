import type { DriveFolder } from '@/types/database'

const FOLDER_TYPE_CONFIG: Record<
  DriveFolder['folder_type'],
  { label: string; color: string; bg: string; border: string; icon: React.ReactNode }
> = {
  assets: {
    label: 'Assets',
    color: '#185FA5',
    bg: 'rgba(24,95,165,0.08)',
    border: 'rgba(24,95,165,0.25)',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  },
  reports: {
    label: 'Reports',
    color: '#0A7B7B',
    bg: 'rgba(10,123,123,0.08)',
    border: 'rgba(10,123,123,0.25)',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
  deliverables: {
    label: 'Deliverables',
    color: '#534AB7',
    bg: 'rgba(83,74,183,0.08)',
    border: 'rgba(83,74,183,0.25)',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
}

interface FolderCardProps {
  folder: DriveFolder
}

export function FolderCard({ folder }: FolderCardProps) {
  const config = FOLDER_TYPE_CONFIG[folder.folder_type]

  return (
    <div
      style={{
        padding: '1.25rem',
        border: '0.5px solid rgba(26,58,58,0.12)',
        borderRadius: 'var(--radius-default)',
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.875rem',
      }}
    >
      <div
        style={{
          width: '40px',
          height: '40px',
          borderRadius: 'var(--radius-default)',
          background: config.bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: config.color,
        }}
      >
        {config.icon}
      </div>

      <div>
        <p
          style={{
            margin: 0,
            fontWeight: 600,
            fontSize: '0.9rem',
            color: 'var(--brand-dark)',
            wordBreak: 'break-word',
          }}
        >
          {folder.folder_name}
        </p>
      </div>

      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '0.2rem 0.55rem',
          borderRadius: '999px',
          fontSize: '0.7rem',
          fontWeight: 500,
          background: config.bg,
          color: config.color,
          border: `0.5px solid ${config.border}`,
          alignSelf: 'flex-start',
        }}
      >
        {config.label}
      </span>
    </div>
  )
}
