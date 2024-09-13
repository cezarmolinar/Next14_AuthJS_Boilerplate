'use server'

import ControllerDB from '@/controller'
import { auth } from '@/lib/auth'
import { UserSettingsSchema } from '@/lib/Schemas/userZodSchema'
// import { auth, update } from '@/auth'
// import { useCurrentUser } from '@/hooks/use-current-user'
// import { prisma } from '@/lib/db'
// import { findUserbyEmail, findUserbyId } from '@/services'
import bcryptjs from 'bcryptjs'
import type { z } from 'zod'

/**
 * This method saves the user's new settings
 * @param {z.infer<typeof UserSettingsSchema>} user - The new user data.
 * @returns {Promise<{error?: string, success?: string}>} The result of the settings change request.
 */
export const changeSettings = async (
  settings: z.infer<typeof UserSettingsSchema>
) => {
  const validData = UserSettingsSchema.safeParse(settings)
  if (!validData.success) {
    return {
      error: 'Dados inválidos'
    }
  }

  const session = await auth()

  if (!session?.user?.id) {
    return {
      error: 'Conecte-se para atualizar seus dados'
    }
  }

  const userData = await ControllerDB.user.getById(session?.user.id)
  if (!userData) {
    return {
      error: 'Usuário não encontrado'
    }
  }

  const { password, newPassword } = validData.data
  if (password && newPassword && userData?.password) {
    const validPassword = bcryptjs.compare(password, userData.password)
    if (!validPassword) {
      return {
        error: 'Senha atual incorreta'
      }
    }

    settings.newPassword = undefined
    settings.password = await bcryptjs.hash(newPassword, 10)
  }

  settings.id = userData.id
  // console.log('SETTINGS', settings)

  // settings.email = undefined
  // settings.isTwoFactorEnabled = undefined;
  try {
    await ControllerDB.user.save({ ...settings })

    return {
      success: 'Perfil atualizado'
    }
  } catch (error) {
    console.error(error)
    return {
      error: 'Algo deu errado' // error.message
    }
  }
}
