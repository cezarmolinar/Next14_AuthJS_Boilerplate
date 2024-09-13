import prisma from '@/lib/db'
import bcrypt from 'bcryptjs'
import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { loginSchema } from './Schemas/userZodSchema'

export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const { data, success } = loginSchema.safeParse(credentials)
        if (!success) {
          throw new Error('Invalid credentials')
        }

        // verificar se o usuário existe
        const user = await prisma.user.findUnique({
          where: {
            email: data.email
          }
        })
        if (!user?.password) {
          throw new Error('No user found')
        }

        // verificar se a senha está correta
        const isValid = await bcrypt.compare(data.password, user.password)
        if (!isValid) {
          throw new Error('Incorrect password')
        }

        const registeredUser = await prisma.user.findUnique({
          where: { email: user?.email }
        })
        if (!registeredUser?.emailVerified)
          throw new Error(
            'Email não verificado. Ative sua conta clicando no link da mensagem enviado ao seu email'
          )

        ///////////////
        return user
      }
    })
  ]
} satisfies NextAuthConfig
