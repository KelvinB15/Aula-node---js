// import type { usersRepository } from '@/repositories/users-repository.js'
// import { compare } from 'bcryptjs'
// import { InvalidCredentialError } from './errors/invalid-credential-error.js'
import type { CheckIn } from '@prisma/client'
import type { CheckInsRepository } from '@/repositories/check-ins-repository.js'
import { ResourceNotFoundError } from './errors/resource-not-found-error.js'
import type { gymsRepository } from '@/repositories/gyms-repository.js'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-betwwen-coordenates.js'
import { MaxDistanceError } from './errors/max-distance-error.js'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error.js'

interface CheckInUseCaseRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: gymsRepository,
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    const distance = getDistanceBetweenCoordinates(
      {
        latitude: userLatitude,
        longitude: userLongitude,
      },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    )

    const MAX_DISTANCE_IN_KILOMETERS = 0.1
    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxDistanceError()
    }

    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if (checkInOnSameDay) {
      throw new MaxNumberOfCheckInsError()
    }
    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      userId,
    })

    return {
      checkIn,
    }
  }
}
