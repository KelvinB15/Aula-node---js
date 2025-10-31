import type { Gym, Prisma } from '@prisma/client'
// import type { promises } from 'dns'

export interface gymsRepository {
  findById(id: string): Promise<Gym | null>
  create(data: Prisma.GymCreateInput): Promise<Gym>
}
