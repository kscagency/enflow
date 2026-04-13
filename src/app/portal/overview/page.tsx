import { redirect } from 'next/navigation'

// The portal overview lives at /portal — redirect nav link here back to root
export default function PortalOverviewRedirect() {
  redirect('/portal')
}
