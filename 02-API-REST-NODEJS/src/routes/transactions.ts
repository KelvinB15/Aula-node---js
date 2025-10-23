import type { FastifyInstance } from 'fastify'
// import { knexInstance } from '../database.js'
// import { create } from 'domain'
// import knex from 'knex'
import { randomUUID } from 'crypto'
import { z } from 'zod'
// import knex from 'knex'
import { knexInstance } from '../database.js'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists.js'
// import { request } from 'http'
// import { id } from 'zod/locales'
// import Knex, { knex } from 'knex'

export async function transactionsRoutes(app: FastifyInstance) {
  app.get(
    '/',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const { sessionId } = request.cookies
      const transactions = await knexInstance('transactions')
        .where('session_id', sessionId)
        .select()

      return { transactions }
    },
  )

  // http: //localhost:3333/transactions/:id

  app.get(
    '/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const getTransactionsParamsSchema = z.object({
        id: z.uuid(),
      })
      const { id } = getTransactionsParamsSchema.parse(request.params)

      const { sessionId } = request.cookies

      const transactions = await knexInstance('transactions')
        .where({
          session_id: sessionId,
          id,
        })
        .first()

      return { transactions }
    },
  )

  app.get(
    '/summary',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const { sessionId } = request.cookies
      const summary = await knexInstance('transactions')
        .where('session_id', sessionId)
        .sum('amount', { as: 'amount' })
        .first()

      return { summary }
    },
  )

  app.post('/', async (request, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body,
    )

    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()

      reply.setCookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })
    }

    await knexInstance('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId,
    })
    // const transactions = await knexInstance('transactions')
    //   .select('*')
    //   .where('amount', 1)
    // .insert({
    //   id: crypto.randomUUID(),
    //   title: 'Transação de teste',
    //   amount: 1000,
    // })
    // .returning('*')

    // return transactions
    return reply.status(201).send()
  })
}
