import { object, string, z } from 'zod'

export const loginSchema = object({
  email: string({ required_error: 'E-mail é obrigatório' })
    .min(1, 'E-mail é obrigatório')
    .email('E-mail inválido'),
  password: string({ required_error: 'Senha é obrigatória' })
    .min(1, 'Senha é obrigatória')
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
})

export const registerSchema = object({
  email: string({ required_error: 'E-mail é obrigatório' })
    .min(1, 'E-mail é obrigatório')
    .email('E-mail inválido'),
  password: string({ required_error: 'Senha é obragatória' })
    .min(1, 'Senha é obragatória')
    .min(6, 'A senha deve ter no mínimo 6 caracteres'),
  name: string({ required_error: 'Nome é obrigatório' })
    .min(1, 'Nome é obrigatório')
    .min(6, 'O nome deve ter no mínimo 6 caracteres')
})

export const ResetPasswordSchema = object({
  email: string().email()
})

export const NewPasswordSchema = object({
  password: string().min(6, 'A senha deve ter no mínimo 6 caracteres')
})

export const UserSettingsSchema = z
  .object({
    id: z.optional(z.string()),
    name: z.optional(z.string().min(5)),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6))
    // isTwoFactorAuthEnabled: z.optional(z.boolean())
  })
  .refine(
    (values) => {
      if (values.password && !values.newPassword) return false
      return true
    },
    {
      message: 'Nova senha requerida',
      path: ['newPassword']
    }
  )
  .refine(
    (values) => {
      if (values.newPassword && !values.password) return false
      return true
    },
    {
      message: 'Senha requerida',
      path: ['password']
    }
  )
