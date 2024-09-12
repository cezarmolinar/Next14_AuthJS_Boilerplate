'use server'

import UserRepository from './userRepository'

export default async function UserUpdatePassword(id: string, password: string) {
  return UserRepository.updatePassword(id, password)
}
