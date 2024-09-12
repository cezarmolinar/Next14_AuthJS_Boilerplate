export interface UserModel {
  id?: string
  name: string
  email: string
  emailVerified?: Date
  image?: string
  profile: string
  password?: string
  createdAt?: Date
  updatedAt?: Date
}
