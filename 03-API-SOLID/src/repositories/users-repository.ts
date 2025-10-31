import type { Prisma, User } from '@prisma/client'
// import type { promises } from 'dns'

export interface usersRepository {
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
}
