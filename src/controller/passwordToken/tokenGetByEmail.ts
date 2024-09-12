'use server'

import ResetTokenRepository from './tokenRepository'

export default async function passwordTokenGetByEmail(email: string) {
  return ResetTokenRepository.findTokenByEmail(email)
}
