import fastify from 'fastify'
// import crypto from 'node:crypto'
// import { knexInstance } from './database.js'
import { env } from './env/index.js'
import { transactionsRoutes } from './routes/transactions.js'
import cookie from '@fastify/cookie'

const app = fastify()

app.register(cookie)
app.register(transactionsRoutes, {
  prefix: 'transactions',
})

app.listen({ port: env.PORT }).then(() => {
  console.log('HTTP Server Running!')
})

// hook global, ou sejá, em toda rota da API funciona

app.addHook('preHandler', async (request) => {
  console.log(`[${request.method}] ${request.url}`)
})
