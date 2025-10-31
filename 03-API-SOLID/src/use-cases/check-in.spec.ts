import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
// import { RegisterUseCase } from './register.js'
// import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.js'
// import { compare } from 'bcryptjs'
// import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.js'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository.js'
import { CheckInUseCase } from './check-in.js'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository.js'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxDistanceError } from './errors/max-distance-error.js'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error.js'
// import { Decimal } from '@prisma/client/runtime/library'
// import { afterEach } from 'node:test'
// import { UsersAlreadyExistsError } from './errors/user-already-exists.js'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in use case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-01',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: -16.7542784,
      longitude: -49.3125632,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('Deve ser possivel fazer Check in', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    // const usersRepository = new InMemoryUsersRepository()
    // const registerUseCase = new RegisterUseCase(usersRepository)

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -16.7542784,
      userLongitude: -49.3125632,
    })

    // console.log(checkIn.created_at)
    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('Não deve ser possivel fazer Check in 2 vezes no dia', async () => {
    // const usersRepository = new InMemoryUsersRepository()
    // const registerUseCase = new RegisterUseCase(usersRepository)
    // vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -16.7542784,
      userLongitude: -49.3125632,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -16.7542784,
        userLongitude: -49.3125632,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  // TDD

  it('Deve ser possivel fazer Check in 2 vezes no dia', async () => {
    // const usersRepository = new InMemoryUsersRepository()
    // const registerUseCase = new RegisterUseCase(usersRepository)
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -16.7542784,
      userLongitude: -49.3125632,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -16.7542784,
      userLongitude: -49.3125632,
    })
    expect(checkIn.id).toEqual(expect.any(String))
    /*
    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
      }),
    ).resolves.toBeTruthy() */
  })

  it('Deve ser possivel fazer Check in na distancia do gym', async () => {
    // vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    // const usersRepository = new InMemoryUsersRepository()
    // const registerUseCase = new RegisterUseCase(usersRepository)

    gymsRepository.items.push({
      id: 'gym-02',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-16.7462411),
      longitude: new Decimal(-49.300362),
    })

    // const { checkIn } = await sut.execute({
    //   gymId: 'gym-01',
    //   userId: 'user-01',
    //   userLatitude: -16.7542784,
    //   userLongitude: -49.3125632,
    // })

    // console.log(checkIn.created_at)
    expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-02',
        userLatitude: -16.7542784,
        userLongitude: -49.3125632,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
