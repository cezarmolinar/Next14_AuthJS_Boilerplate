import prisma from '@/lib/db'
import { type UserModel } from '@/model/User'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class UserRepository {
  private static readonly db = prisma

  static async save(record: UserModel): Promise<UserModel> {
    const usr = await this.db.user.upsert({
      where: { id: record.id },
      update: record,
      create: record
    })
    return usr as UserModel
  }

  static async create(record: UserModel): Promise<UserModel> {
    const usr = await this.db.user.create({
      data: record
    })
    return usr as UserModel
  }

  static async update(record: UserModel): Promise<UserModel> {
    const usr = await this.db.user.update({
      where: { id: record.id },
      data: record
    })
    return usr as UserModel
  }

  static async updatePassword(
    id: string,
    password: string
  ): Promise<UserModel> {
    const usr = await this.db.user.update({
      where: { id },
      data: { password }
    })
    return usr as UserModel
  }

  static async delete(id: string): Promise<void> {
    await this.db.user.delete({ where: { id } })
  }

  static async getAll(): Promise<UserModel[]> {
    const usr = await this.db.user.findMany({
      orderBy: [{ name: 'asc' }]
    })
    return usr as UserModel[]
  }

  static async getById(id: string): Promise<UserModel> {
    const usr = await this.db.user.findUnique({ where: { id } })
    return usr as UserModel
  }

  static async getByEmail(email: string): Promise<UserModel> {
    const usr = await this.db.user.findUnique({ where: { email } })
    return usr as UserModel
  }

  static async getFirst(): Promise<UserModel> {
    const usr = await this.db.user.findFirst()
    return usr as UserModel
  }
}
