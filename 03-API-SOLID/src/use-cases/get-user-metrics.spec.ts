import { expect, describe, it, beforeEach } from 'vitest'
// import { RegisterUseCase } from './register.js'
// import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.js'
// import { compare } from 'bcryptjs'
// import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.js'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository.js'
import { GetUserMetricsUseCase } from './get-user-metrics.js'
// import { CheckInUseCase } from './check-in.js'
// import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository.js'
// import { Decimal } from '@prisma/client/runtime/library'
// import { MaxDistanceError } from './errors/max-distance-error.js'
// import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error.js'
// import { GetUserMetricsUseCase } from './fetch-user-check-ins-history.js'
// import { Decimal } from '@prisma/client/runtime/library'
// import { afterEach } from 'node:test'
// import { UsersAlreadyExistsError } from './errors/user-already-exists.js'

let checkInsRepository: InMemoryCheckInsRepository
// let gymsRepository: InMemoryGymsRepository
let sut: GetUserMetricsUseCase

describe('Get User use case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    // gymsRepository = new InMemoryGymsRepository()
    sut = new GetUserMetricsUseCase(checkInsRepository)
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

  it('Deve ser possivel fazer Get User Metrics Check-ins count from metrics', async () => {
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

    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    })

    // console.log(checkIn.created_at)
    expect(checkInsCount).toEqual(2)
  })
})
