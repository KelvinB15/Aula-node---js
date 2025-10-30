import fastify from 'fastify'
import { appRoutes } from './http/routes.js'
import { ZodError } from 'zod'
import { env } from './env/index.js'

export const app = fastify()

app.register(appRoutes)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      mensagem: 'Validation error.',
      issues: error.format,
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: envia a mensagem de erro para alguma ferramenta externa, como telegram
  }
  return reply.status(500).send({ message: 'Internal server error.' })
})
