import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  if (
    !user &&
    (request.nextUrl.pathname.startsWith('/dashboard') ||
      request.nextUrl.pathname.startsWith('/portal'))
  ) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  if (user && request.nextUrl.pathname === '/login') {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  // Subdomain detection: extract subdomain from hostname
  // e.g. "acme.enflow.app" -> "acme", "localhost" -> null
  const hostname = request.headers.get('host') || ''
  const hostParts = hostname.split('.')
  // A subdomain exists when there are 3+ parts (sub.domain.tld) or on localhost
  // Skip "www" as a subdomain
  let subdomain: string | null = null
  if (hostParts.length >= 3 && hostParts[0] !== 'www') {
    subdomain = hostParts[0]
  }

  if (subdomain) {
    supabaseResponse.cookies.set('enflow-subdomain', subdomain, {
      httpOnly: false,
      sameSite: 'lax',
      path: '/',
    })
  } else {
    // Clear stale subdomain cookie if on root domain
    supabaseResponse.cookies.delete('enflow-subdomain')
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/dashboard/:path*', '/portal/:path*', '/login'],
}
