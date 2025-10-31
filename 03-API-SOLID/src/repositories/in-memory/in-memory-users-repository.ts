import type { Prisma, User } from '@prisma/client'
import type { usersRepository } from '../users-repository.js'

export class InMemoryUsersRepository implements usersRepository {
  public items: User[] = []
  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }
    return null
  }

  async findByEmail(email: string) {
    // throw new Error('Metodo não implementado')
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.items.push(user)

    return user
  }
}
