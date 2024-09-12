'use server'

import ControllerDB from '@/controller'
import { signIn } from '@/lib/auth'
import { type loginSchema, registerSchema } from '@/lib/Schemas/userZodSchema'
import bcrypt from 'bcryptjs'
import { AuthError } from 'next-auth'
import { type z } from 'zod'

export const UserLoginAction = async (values: z.infer<typeof loginSchema>) => {
  try {
    await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false
    })
    return { success: true }
  } catch (error) {
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

    // console.log(data)
    // verificar se usuario já existe
    const user = await ControllerDB.user.getByEmail(data.email)
    // console.log('user', user)
    if (user) {
      return {
        error: 'Usuário já cadastrado'
      }
    }

    // criptografar a senha
    const passwordHash = await bcrypt.hash(data.password, 10)

    // criar o usuário
    await ControllerDB.user.save({
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

    return { success: true }
  } catch (error) {
    console.log(error)
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message }
    }
    return { error: 'error 500' }
  }
}
