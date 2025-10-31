// import type { usersRepository } from '@/repositories/users-repository.js'
// import { compare } from 'bcryptjs'
// import { InvalidCredentialError } from './errors/invalid-credential-error.js'
import type { CheckIn } from '@prisma/client'
import type { CheckInsRepository } from '@/repositories/check-ins-repository.js'
// import { ResourceNotFoundError } from './errors/resource-not-found-error.js'
// // import type { gymsRepository } from '@/repositories/gyms-repository.js'
// import { getDistanceBetweenCoordinates } from '@/utils/get-distance-betwwen-coordenates.js'
// import { MaxDistanceError } from './errors/max-distance-error.js'
// import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error.js'

interface FetchUserCheckInsHistoryUseCaseRequest {
  userId: string
  page: number
}

interface FetchUserCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInsHistoryUseCaseRequest): Promise<FetchUserCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.FindManyByUserId(
      userId,
      page,
    )

    return {
      checkIns,
    }
  }
}
