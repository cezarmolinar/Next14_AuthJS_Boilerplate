export interface ResetPasswordTokenModel {
  id?: string
  email: string
  token: string
  expires: Date
}
