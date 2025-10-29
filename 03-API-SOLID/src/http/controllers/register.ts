import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { RegisterUseCase } from '@/use-cases/register.js'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.js'
import { UsersAlreadyExistsError } from '@/use-cases/errors/user-already-exists.js'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)


  // executa os repositorios
  try {
    //caso queira trocar de repositorio, bastar inserir no 'usersRepository'
    const usersRepository = new PrismaUsersRepository()

    const registerUseCase = new RegisterUseCase(usersRepository)

    await registerUseCase.execute({
        name,
        email,
        password,
    })
  } catch (err) {
    if (err instanceof UsersAlreadyExistsError) {
        return reply.status(409).send({message: err.message})
    }
   
   throw err
    // return reply.status(500).send() 
  }

  return reply.status(201).send()
}
