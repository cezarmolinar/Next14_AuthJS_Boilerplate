export interface EmailVerificationModel {
  id?: string
  email: string
  token: string
  expires: Date
}
