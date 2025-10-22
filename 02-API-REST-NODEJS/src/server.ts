import fastify from 'fastify'
// import crypto from 'node:crypto'
import { knexInstance } from './database.js'
import { env } from './env/index.js'

const app = fastify()

app.get('/hello', async () => {
  const transactions = await knexInstance('transactions')
    .select('*')
    .where('amount', 1)
  // .insert({
  //   id: crypto.randomUUID(),
  //   title: 'Transação de teste',
  //   amount: 1000,
  // })
  // .returning('*')
  return transactions
})

app.listen({ port: env.PORT }).then(() => {
  console.log('HTTP Server Running!')
})
