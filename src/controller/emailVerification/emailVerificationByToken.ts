'use server'

import EmailVerificationRepository from './emailVerificationRepository'

export default async function emailVerificationGetByToken(token: string) {
  return EmailVerificationRepository.findByToken(token)
}
