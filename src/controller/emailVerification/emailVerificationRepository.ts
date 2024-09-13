import { v4 as uuid } from 'uuid'
import prisma from '@/lib/db'
import { EmailVerificationModel } from '@/model/EmailVerification'

export default class EmailVerificationRepository {
  private static readonly db = prisma

  static async findByToken(token: string): Promise<EmailVerificationModel> {
    const data = await this.db.emailVerification.findUnique({
      where: { token }
    })

    return data as EmailVerificationModel
  }

  static async findByEmail(email: string): Promise<EmailVerificationModel> {
    const data = await this.db.emailVerification.findUnique({
      where: { email }
    })

    return data as EmailVerificationModel
  }

  static async deleteToken(id: string): Promise<void> {
    await this.db.emailVerification.delete({
      where: { id }
    })
  }

  static async createToken(email: string): Promise<EmailVerificationModel> {
    const token = uuid()
    const expires = new Date(new Date().getTime() + 2 * 60 * 60 * 1000) //two hours

    const existingToken = await this.findByEmail(email)
    if (existingToken) {
      await this.deleteToken(existingToken.id!)
    }

    const verificationToken = await this.db.emailVerification.create({
      data: {
        email,
        token,
        expires
      }
    })

    return verificationToken
  }
}
