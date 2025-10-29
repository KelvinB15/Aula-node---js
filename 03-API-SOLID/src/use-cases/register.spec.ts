import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register.js'
// import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.js'
import { compare } from 'bcryptjs'

describe('Registro use case', () => {
  it('a senha do usuario deve ser hash, ao se registrar', async () => {
    /* JAMAIS faça o teste passar pelo banco 
    const prismaUsersRepository = new PrismaUsersRepository()
    */
    const registerUseCase = new RegisterUseCase({
      async findByEmail(email) {
        return null
      },

      async create(data) {
        return {
          id: 'user-1',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        }
      },
    })

    const { user } = await registerUseCase.execute({
      name: 'John doe',
      email: 'jhondoe@example.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )
    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
