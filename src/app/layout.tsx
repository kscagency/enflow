import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { Bricolage_Grotesque, Instrument_Sans } from 'next/font/google'
import { getAgencyBranding, generateBrandCSS } from '@/lib/branding'
import './globals.css'

const bricolage = Bricolage_Grotesque({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['700'],
})

const instrumentSans = Instrument_Sans({
  variable: '--font-body-base',
  subsets: ['latin'],
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: 'Enflow',
  description: 'White-label client portal for agencies',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const subdomain = cookieStore.get('enflow-subdomain')?.value ?? null

  let brandCSS: string | null = null
  if (subdomain) {
    const branding = await getAgencyBranding(subdomain)
    if (branding) {
      brandCSS = generateBrandCSS(branding.agency, branding.tier)
    }
  }

  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${instrumentSans.variable} h-full antialiased`}
    >
      <head>
        {brandCSS && (
          <style
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: brandCSS }}
          />
        )}
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
