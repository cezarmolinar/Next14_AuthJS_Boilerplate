'use server'

import ControllerDB from '@/controller'
import mail from '@/lib/mail'
import {
  NewPasswordSchema,
  ResetPasswordSchema
} from '@/lib/Schemas/userZodSchema'

// import {
//   createResetPasswordToken,
//   deleteResetPasswordToken,
//   findResetPasswordTokenByToken,
//   updatePassword
// } from '@/services/auth'
import bcryptjs from 'bcryptjs'
import type { z } from 'zod'

/**
 * This method initiates the reset password process
 * @param {z.infer<typeof ResetPasswordSchema>} values - The values for resetting the password.
 * @returns {Promise<{error?: string, success?: string}>} The result of the reset password request.
 */
export const resetPassword = async (
  values: z.infer<typeof ResetPasswordSchema>
) => {
  const validatedEmail = ResetPasswordSchema.safeParse(values)
  if (!validatedEmail.success) {
    return { error: 'E-mail inválido' }
  }

  const { email } = validatedEmail.data

  const existingUser = await ControllerDB.user.getByEmail(email)
  if (!existingUser) {
    return { error: 'Usuário não encontrado' }
  }

  const resetToken = await ControllerDB.tokenPassword.generateToken(email)

  const emailEnvidado = await sendResetPasswordEmail(
    resetToken.email,
    resetToken.token
  )

  if (emailEnvidado.error) return { error: emailEnvidado.error }

  return { success: 'E-mail de mudança de senha enviado' }
}

/**
 * This method uses Resend to send an e-mail to change the user's password
 * @param {string} email - The user's email.
 * @param {string} token - The reset password token.
 * @returns {Promise<{error?: string, success?: string}>} The result of the email sending request.
 */
export const sendResetPasswordEmail = async (email: string, token: string) => {
  console.log('ANTES EMAIL')

  const {
    NEXT_PUBLIC_URL,
    RESEND_EMAIL_FROM,
    RESET_PASSWORD_SUBJECT,
    RESET_PASSWORD_URL
  } = process.env

  if (
    !NEXT_PUBLIC_URL ||
    !RESEND_EMAIL_FROM ||
    !RESET_PASSWORD_SUBJECT ||
    !RESET_PASSWORD_URL
  ) {
    return {
      error: 'Configuração de ambiente insuficiente para envio de e-mail.'
    }
  }

  const resetUrl = `${NEXT_PUBLIC_URL}${RESET_PASSWORD_URL}?token=${token}`

  const { data, error } = await mail.emails.send({
    from: RESEND_EMAIL_FROM,
    to: email,
    subject: RESET_PASSWORD_SUBJECT,
    html: `<p>Clique <a href="${resetUrl}">aqui</a> para modificar sua senha.</p>`
  })

  if (error)
    return {
      error
    }

  return {
    success: 'E-mail enviado com sucesso'
  }
}

/**
 * This method updates the user's password
 * @param {z.infer<typeof NewPasswordSchema>} passwordData - The new password data.
 * @param {string | null} token - The reset password token.
 * @returns {Promise<{error?: string, success?: string}>} The result of the password change request.
 */
export const changePasswordAction = async (
  passwordData: z.infer<typeof NewPasswordSchema>,
  token: string | null
) => {
  if (!token) {
    return { error: 'Token não encontrado' }
  }

  const validatedPassword = NewPasswordSchema.safeParse(passwordData)

  if (!validatedPassword.success) {
    return { error: 'Dados inválidos' }
  }

  const { password } = validatedPassword.data

  const existingToken = await ControllerDB.tokenPassword.getByToken(token)
  if (!existingToken) {
    return { error: 'Token inválido' }
  }

  const hasExpired = new Date(existingToken.expires) < new Date()
  if (hasExpired) {
    return { error: 'Token Expirado' }
  }

  const existingUser = await ControllerDB.user.getByEmail(existingToken.email)
  if (!existingUser) {
    return { error: 'Usuário não encontrado' }
  }

  const hashedPassword = await bcryptjs.hash(password, 10)

  await ControllerDB.user.updatePassword(existingUser.id!, hashedPassword)

  await ControllerDB.tokenPassword.delete(existingToken.id!)

  return { success: 'Senha atualizada' }
}
