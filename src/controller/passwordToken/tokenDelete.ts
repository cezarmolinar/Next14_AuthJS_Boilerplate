'use server'

import ResetTokenRepository from './tokenRepository'

export default async function passwordTokenDelete(id: string) {
  return ResetTokenRepository.deleteToken(id)
}
