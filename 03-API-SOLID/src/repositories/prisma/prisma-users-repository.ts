import { prisma } from '@/lib/prisma.js'
import type { Prisma, User } from '@prisma/client'
import type { usersRepository } from '../users-repository.js'

export class PrismaUsersRepository implements usersRepository {
  public items: User[] = []
  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
