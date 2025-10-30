import { expect, describe, it, beforeEach } from 'vitest'
// import { RegisterUseCase } from './register.js'
// import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.js'
// import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory-users-repository.ts/in-memory-users-repository.js'
import { hash } from 'bcryptjs'
import { AuthenticateUseCase } from './authenticate.js'
import { InvalidCredentialError } from './errors/invalid-credential-error.js'
// import { beforeEach } from 'node:test'
// import { UsersAlreadyExistsError } from './errors/user-already-exists.js'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('autenticação use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('Deve ser possível autenticar', async () => {
    await usersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'jhondoe@example.com',
      password: '123456',
    })
    expect(user.id).toEqual(expect.any(String))
  })

  it('Não deve ser possível autenticar com um email incorreta.', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    // await usersRepository.create({
    //   name: 'Jhon Doe',
    //   email: 'jhondoe@example.com',
    //   password_hash: await hash('123456', 6),
    // })

    await expect(() =>
      sut.execute({
        email: 'jhondoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })
  /*
    const { user } = await sut.execute({
      email: 'jhondoe@example.com',
      password: '123456',
    })
    expect(user.id).toEqual(expect.any(String))
  })
    */

  it('Não deve ser possível autenticar com uma senha incorreta.', async () => {
    await usersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'jhondoe@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })
})
