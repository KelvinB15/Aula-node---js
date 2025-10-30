import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.js'
// import { RegisterUseCase } from '../register.js'
import { AuthenticateUseCase } from '../authenticate.js'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const authenticateUseCase = new AuthenticateUseCase(usersRepository)
  return authenticateUseCase
}
