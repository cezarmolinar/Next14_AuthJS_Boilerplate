import { auth } from './auth'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function getCurrentUser() {
  const session = await auth()
  return session?.user
}
