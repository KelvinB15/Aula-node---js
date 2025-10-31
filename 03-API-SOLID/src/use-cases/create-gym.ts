// import { prisma } from '@/lib/prisma.js'
// import { PrismaUsersRepository } from '@/repositories/prisma-users-repository.js'
import type { gymsRepository } from '@/repositories/gyms-repository.js'
// import type { usersRepository } from '@/repositories/users-repository.js'
// import { hash } from 'bcryptjs'
// import { UsersAlreadyExistsError } from './errors/user-already-exists.js'
import type { Gym } from '@prisma/client'

interface CreateGymUseCaseRequest {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface CreateGymUseCaseResponse {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(private gymRepository: gymsRepository) {}

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
    const gym = await this.gymRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    })

    return {
      gym,
    }
    /*
  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  }) */
  }
}
