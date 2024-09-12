'use server'

import UserRepository from './userRepository'

export default async function UserGetFirst() {
  return await UserRepository.getFirst()
}
