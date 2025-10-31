import { expect, describe, it, beforeEach } from 'vitest'
// import { RegisterUseCase } from './register.js'
// import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.js'
// import { compare } from 'bcryptjs'
// import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.js'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository.js'
import { CreateGymUseCase } from './create-gym.js'
// import { UsersAlreadyExistsError } from './errors/user-already-exists.js'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Registro use case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('Deve ser possivel criar gym', async () => {
    // const usersRepository = new InMemoryUsersRepository()
    // const registerUseCase = new RegisterUseCase(usersRepository)

    const { gym } = await sut.execute({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -16.7542784,
      longitude: -49.3125632,
    })
    expect(gym.id).toEqual(expect.any(String))
  })
})
