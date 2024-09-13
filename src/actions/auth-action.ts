'use server'

import ControllerDB from '@/controller'
import { signIn } from '@/lib/auth'
import { type loginSchema, registerSchema } from '@/lib/Schemas/userZodSchema'
import bcrypt from 'bcryptjs'
import { AuthError } from 'next-auth'
import { type z } from 'zod'
import { sendAccountVerificationEmail } from './email-verification-actions'

export const UserLoginAction = async (values: z.infer<typeof loginSchema>) => {
  try {
    console.log('ANTES DO LOGIN')
    await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false
    })
    console.log('DEPOIS')
    return { success: true }
  } catch (error) {
    console.log('ERRO:', error)
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message }
    }
    return { error: 'error 500' }
  }
}

export const UserRegisterAction = async (
  values: z.infer<typeof registerSchema>
) => {
  try {
    const { data, success } = registerSchema.safeParse(values)
    if (!success) {
      return {
        error: 'Dados inválidos'
      }
    }

    // verificar se usuario já existe
    const existUser = await ControllerDB.user.getByEmail(data.email)
    if (existUser) {
      return {
        error: 'Usuário já cadastrado'
      }
    }

    // criptografar a senha
    const passwordHash = await bcrypt.hash(data.password, 10)

    // criar o usuário
    const createdUser = await ControllerDB.user.save({
      email: data.email,
      name: data.name,
      password: passwordHash
    })

    // cria se sessão do usuário
    await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false
    })

    const verificationToken = await ControllerDB.emailValidation.generateToken(
      createdUser.email
    )

    await sendAccountVerificationEmail(createdUser, verificationToken.token)

    return { success: true }
  } catch (error) {
    console.log(error)
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message }
    }
    return { error: 'error 500' }
  }
}
