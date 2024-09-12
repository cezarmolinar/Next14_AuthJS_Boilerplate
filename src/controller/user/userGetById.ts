'use server'

import UserRepository from './userRepository'

export default async function UserGetById(id: string) {
  return UserRepository.getById(id)
}
