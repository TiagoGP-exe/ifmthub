import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { api } from './lib/api'


const authRoutes = [
  '/dashboard/bookmark',
  '/dashboard/sketch',
  '/editor',
]

const validateRoutes = [
  '/login',
  '/register',
]


export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

export async function middleware(request: NextRequest) {
  const token = cookies().get('authToken')
  const url = request.nextUrl.clone()

  if (!token?.value) {
    return NextResponse.redirect(new URL('/login', url))
  }

  // if (token?.value && authRoutes.some(e => url.pathname.includes(e))) {

  //   try {
  //     await api.get('/me', {
  //       headers: {
  //         Authorization: `Bearer ${token.value}`
  //       }
  //     });

  //     return NextResponse.next()
  //   } catch (error) {
  //     request.cookies.delete('nextjs')
  //     return NextResponse.redirect(new URL('/login', url))
  //   }
  // }

  if (token?.value && validateRoutes.includes(url.pathname)) {
    try {
      await api.get('/me', {
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      });

      return NextResponse.redirect(new URL('/dashboard', url))
    } catch (error) {
      return NextResponse.redirect(new URL('/login', url))
    }
  }
}