import { expect, describe, it, beforeEach } from 'vitest'
// import { RegisterUseCase } from './register.js'
// import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.js'
// import { compare } from 'bcryptjs'
// import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.js'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository.js'
// import { CheckInUseCase } from './check-in.js'
// import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository.js'
// import { Decimal } from '@prisma/client/runtime/library'
// import { MaxDistanceError } from './errors/max-distance-error.js'
// import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error.js'
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history.js'
// import { Decimal } from '@prisma/client/runtime/library'
// import { afterEach } from 'node:test'
// import { UsersAlreadyExistsError } from './errors/user-already-exists.js'

let checkInsRepository: InMemoryCheckInsRepository
// let gymsRepository: InMemoryGymsRepository
let sut: FetchUserCheckInsHistoryUseCase

describe('Fetch User Check-in History use case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    // gymsRepository = new InMemoryGymsRepository()
    sut = new FetchUserCheckInsHistoryUseCase(checkInsRepository)
  })

  /* 
    await gymsRepository.create({
      id: 'gym-01',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: -16.7542784,
      longitude: -49.3125632,
    })
*/

  it('Deve ser possivel fazer muiltiplos check-in history', async () => {
    // vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    // const usersRepository = new InMemoryUsersRepository()
    // const registerUseCase = new RegisterUseCase(usersRepository)
    await checkInsRepository.create({
      gym_id: 'gym-01',
      userId: 'user-01',
    })
    await checkInsRepository.create({
      gym_id: 'gym-02',
      userId: 'user-01',
    })

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 1,
    })

    // console.log(checkIn.created_at)
    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-01' }),
      expect.objectContaining({ gym_id: 'gym-02' }),
    ])
  })

  it('Deve ser possivel fazer muiltiplas paginas check-in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        gym_id: `gym-${i}`,
        userId: 'user-01',
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 2,
    })

    // console.log(checkIn.created_at)
    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-21' }),
      expect.objectContaining({ gym_id: 'gym-22' }),
    ])
  })
})
