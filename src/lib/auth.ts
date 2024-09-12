/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from '@/lib/db'
import authConfig from './auth.config'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),

  ...authConfig,

  session: { strategy: 'jwt' },
  callbacks: {
    // incluir as informações do usuário ao token JWT.
    // incluir o campo acrescentado em types.next-auth.d.ts
    jwt({ token, user }) {
      if (user) {
        // console.log('USER', user)
        token.profile = user.profile
      }
      return token
    },
    // Acrescentar as informações na sessão. Acrescentado em types.next-auth.d.ts
    session({ session, token }) {
      if (session.user) {
        session.user.profile = token.profile
        session.user.id = token.sub
      }
      // console.log('SESSION', session)
      return session
    }
  },
  pages: {
    signIn: '/login'
  }
})
