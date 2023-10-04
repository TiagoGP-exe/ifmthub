import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { api } from './lib/api'


const authRoutes = [
  '/dashboard',
  '/editor',
]


const validateRoutes = [
  '/login',
  '/register',
]

 
export async function middleware(request: NextRequest) {
  const token = cookies().get('authToken')

  const url = request.nextUrl.clone()
  if (!token?.value && authRoutes.includes(url.pathname)) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (token?.value && authRoutes.includes(url.pathname)) {
    try {
      await api.get('/me', {
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      });

      return NextResponse.next()
    } catch (error) {
      return NextResponse.redirect(new URL('/login',url))
    }
  }

  if (token?.value && validateRoutes.includes(url.pathname)) {
    try {
      await api.get('/me', {
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      });

      return NextResponse.redirect(new URL('/dashboard',url))
    } catch (error) {
      return NextResponse.redirect(new URL('/login',url))
    }
  }
}