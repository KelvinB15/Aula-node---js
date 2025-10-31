import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register.js'
// import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.js'
// import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.js'
import { UsersAlreadyExistsError } from './errors/user-already-exists.js'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Registro use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('Deve ser possivel registrar', async () => {
    // const usersRepository = new InMemoryUsersRepository()
    // const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await sut.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123456',
    })
    expect(user.id).toEqual(expect.any(String))
  })

  it('Não deveria ser possível se cadastrar duas vezes com o mesmo e-mail.', async () => {
    /* JAMAIS faça o teste passar pelo banco 
    const prismaUsersRepository = new PrismaUsersRepository()
    */

    // cria uma tabela no banco ficticio
    // const usersRepository = new InMemoryUsersRepository()
    // const registerUseCase = new registerUseCase(usersRepository)

    const email = 'johndoe@example.com'

    // criação de um usuário ficticio
    await sut.execute({
      name: 'John doe',
      email, // : 'jhondoe@example.com',
      password: '1233213s456',
    })

    // expect ele sempre é um await por esperar uma promise
    await expect(() =>
      sut.execute({
        name: 'Jhon Doe',
        email,
        password: '12321321456',
      }),
    ).rejects.toBeInstanceOf(UsersAlreadyExistsError)
    /*
    // compara se a senha informada está como hash
    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )
    expect(isPasswordCorrectlyHashed).toBe(true) */
  })
})
