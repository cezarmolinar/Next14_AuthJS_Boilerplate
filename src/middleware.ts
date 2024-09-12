import authConfig from '@/lib/auth.config'
import NextAuth from 'next-auth'
import { NextResponse } from 'next/server'

const { auth } = NextAuth(authConfig)

const publicRoutes = ['/']
const authRoutes = [
  '/login',
  '/register',
  '/reset-password',
  '/change-password'
]
const apiAuthPrefix = '/api/auth'

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  // console.log({ isLoggedIn, path: nextUrl.pathname })

  // Permitir rotas de autenticação
  if (nextUrl.pathname.startsWith(apiAuthPrefix)) {
    return NextResponse.next()
  }

  // Permitir rotas públicas
  if (publicRoutes.includes(nextUrl.pathname)) {
    return NextResponse.next()
  }

  // Redirecionar a /dashboard se está logado e acessar rotas de autenticação
  if (isLoggedIn && authRoutes.includes(nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/dashboard', nextUrl))
  }

  // Redirecionar a /login se NÃO logado e tentar acessar rota protegida
  if (
    !isLoggedIn &&
    !authRoutes.includes(nextUrl.pathname) &&
    !publicRoutes.includes(nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL('/login', nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
}
