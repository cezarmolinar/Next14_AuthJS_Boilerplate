'use server'

import ResetTokenRepository from './tokenRepository'

export default async function passwordTokenGenerate(email: string) {
  return ResetTokenRepository.createToken(email)
}
