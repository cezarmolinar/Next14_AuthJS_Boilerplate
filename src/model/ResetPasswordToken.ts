export interface ResetPasswordToken {
  id?: string
  email: string
  token: string
  expires: Date
}
