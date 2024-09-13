'use server'

import EmailVerificationRepository from './emailVerificationRepository'

export default async function emailVerificationCreateToken(email: string) {
  return EmailVerificationRepository.createToken(email)
}
