import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
// import { RegisterUseCase } from '@/use-cases/register.js'
// import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.js'
// import { UsersAlreadyExistsError } from '@/use-cases/errors/user-already-exists.js'
// import { AuthenticateUseCase } from '@/use-cases/authenticate.js'
import { InvalidCredentialError } from '@/use-cases/errors/invalid-credential-error.js'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case.js'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    // name: z.string(),
    email: z.email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  // executa os repositorios
  try {
    const authenticateUseCase = makeAuthenticateUseCase()
    // caso queira trocar de repositorio, bastar inserir no 'usersRepository'
    // const usersRepository = new PrismaUsersRepository()

    // const authenticateUseCase = new AuthenticateUseCase(usersRepository)

    await authenticateUseCase.execute({
      email,
      password,
    })
  } catch (err) {
    if (err instanceof InvalidCredentialError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
    // return reply.status(500).send()
  }

  return reply.status(200).send()
}
