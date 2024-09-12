'use server'

import ResetTokenRepository from './tokenRepository'

export default async function passwordTokenGetByToken(token: string) {
  return ResetTokenRepository.findTokenByToken(token)
}
