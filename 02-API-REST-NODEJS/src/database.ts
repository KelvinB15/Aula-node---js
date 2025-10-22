import knex from 'knex'
import type { Knex } from 'knex' // Importa só o tipo
import { env } from './env/index.js'

// console.log(process.env.DATABASE_URL)

// if (!process.env.DATABASE_URL) {
//   throw new Error('tem nada ai não mongol')
// }

export const config: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: env.DATABASE_URL,
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
}

export const knexInstance = knex(config)
