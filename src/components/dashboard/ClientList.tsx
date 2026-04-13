import type { Client } from '@/types/database'
import { ClientCard } from './ClientCard'

interface ClientListProps {
  clients: Client[]
}

export function ClientList({ clients }: ClientListProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1rem',
      }}
    >
      {clients.map(client => (
        <ClientCard key={client.id} client={client} />
      ))}
    </div>
  )
}
