// import { prisma } from '@/lib/prisma.js'
// import { PrismaUsersRepository } from '@/repositories/prisma-users-repository.js'
import type { usersRepository } from '@/repositories/users-repository.js'
import { hash } from 'bcryptjs'
import { UsersAlreadyExistsError } from './errors/user-already-exists.js'
import type { User } from '@prisma/client'

interface registerUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: usersRepository) {}

  async execute({
    name,
    email,
    password,
  }: registerUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    /* antes de cotinuar (await) verifica se existe no banco com 'prisma' na tabela 'user'
se tem dados unicos (findUnique) 
    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    })
*/

    /* teste se a função de exitencias de findUnique eixiste, caso exista return erro de conflito 409 */
    if (userWithSameEmail) {
      throw new UsersAlreadyExistsError()
    }

    // const prismaUsersRepository = new PrismaUsersRepository()

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })

    return {
      user,
    }
    /*
  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  }) */
  }
}
