'use server'

import UserRepository from './userRepository'

export default async function UserGetByEmail(email: string) {
  return UserRepository.getByEmail(email)
}
