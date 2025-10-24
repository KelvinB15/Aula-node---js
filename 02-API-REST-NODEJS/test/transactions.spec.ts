import { it, beforeAll, afterAll, describe, expect, beforeEach } from 'vitest'
import request from 'supertest'
import { app } from '../src/app.js'
import { execSync } from 'child_process'
// import { it } from 'node:test'

describe('Transactions routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  it('o usuário consegue criar uma nova transação', async () => {
    // fazer a chamada HTTP p/ criar uma nova transação

    await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit',
      })
      .expect(201)

    //   const responseStatusCode = 201

    //   expect(responseStatusCode).toEqual(201)
  })

  it('should be able to list all transactions', async () => {
    const createTransactionsResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit',
      })

    const cookies = createTransactionsResponse.get('Set-Cookie')

    // valida se há
    if (!cookies) {
      throw new Error('Nenhum cookie retornado pela requisição')
    }

    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies) // caso o cookie vier undefined, não rodara essa linha, por isso o if(!cookies)
      .expect(200)

    // console.log(listTransactionsResponse.body)

    const transactionId = listTransactionsResponse.body.transaction[0].id
    const listTransactionsResponse = await request(app.server)
      .get(`/transactions/${transactionId}`)
      .set(`Cookie`, cookies)
      .expect(200)

    /*
    Confira a maneira que o body do listTransactionsResponse está sendo recebido
    Pois ele vem como 
    Object [
        transactions: array [
            object {}
        ]
    ]
    Em vista disso, informe o corpo e qual objeto quer trazer o array
    */
    expect(listTransactionsResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: 'New transaction',
        amount: 5000,
      }),
    ])
  })
})
