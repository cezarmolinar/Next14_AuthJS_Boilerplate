import { v4 as uuid } from 'uuid'
import prisma from '@/lib/db'
import { ResetPasswordTokenModel } from '@/model/ResetPasswordToken'

export default class ResetTokenRepository {
  private static readonly db = prisma

  static async findTokenByToken(token: string): Promise<ResetPasswordTokenModel> {
    const data = await this.db.resetPasswordToken.findUnique({
      where: { token }
    })

    return data as ResetPasswordTokenModel
  }

  static async findTokenByEmail(email: string): Promise<ResetPasswordTokenModel> {
    const data = await this.db.resetPasswordToken.findUnique({
      where: { email }
    })

    return data as ResetPasswordTokenModel
  }

  static async deleteToken(id: string): Promise<void> {
    await this.db.resetPasswordToken.delete({
      where: { id }
    })
  }

  static async createToken(email: string): Promise<ResetPasswordTokenModel> {
    const token = uuid()
    const expires = new Date(new Date().getTime() + 2 * 60 * 60 * 1000) //two hours

    const existingToken = await this.findTokenByEmail(email)
    if (existingToken) {
      await this.deleteToken(existingToken.id!)
    }

    const verificationToken = await this.db.resetPasswordToken.create({
      data: {
        email,
        token,
        expires
      }
    })

    return verificationToken
  }
}
