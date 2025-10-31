import { expect, describe, it, beforeEach } from 'vitest'
// import { RegisterUseCase } from './register.js'
// import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.js'
// import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.js'
import { hash } from 'bcryptjs'
// import { AuthenticateUseCase } from './authenticate.js'
// import { InvalidCredentialError } from './errors/invalid-credential-error.js'
import { GetUserProfileUseCase } from './get-user-profile.js'
import { ResourceNotFoundError } from './errors/resource-not-found-error.js'
// import { beforeEach } from 'node:test'
// import { UsersAlreadyExistsError } from './errors/user-already-exists.js'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Obter perfil do usuário use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('Deve ser possível obter o usuário', async () => {
    const createdUser = await usersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })
    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('Jhon Doe')
  })

  it('Não deve ser possível obter o usuário', async () => {
    // await usersRepository.create({
    //   name: 'Jhon Doe',
    //   email: 'jhondoe@example.com',
    //   password_hash: await hash('123456', 6),
    // })

    await expect(() =>
      sut.execute({
        userId: 'Eu sou um usuário que não existe por não ter id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
  /*
    const { user } = await sut.execute({
      email: 'jhondoe@example.com',
      password: '123456',
    })
    expect(user.id).toEqual(expect.any(String))
  })
    */
})
