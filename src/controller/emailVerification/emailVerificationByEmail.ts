'use server'

import EmailVerificationRepository from './emailVerificationRepository'

export default async function emailVerificationGetByEmail(email: string) {
  return EmailVerificationRepository.findByEmail(email)
}
