'use server'

import EmailVerificationRepository from './emailVerificationRepository'

export default async function emailVerificationDelete(id: string) {
  return EmailVerificationRepository.deleteToken(id)
}
