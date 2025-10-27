import knex from 'knex'
import type { Knex } from 'knex' // Importa só o tipo
import { env } from './env/index.js'
import fs from 'fs'
import path from 'path'

// Resolve o caminho absoluto para a pasta do banco (baseado no diretório raiz do projeto)
const dbFolder = path.resolve(process.cwd(), './db')

// Cria a pasta caso não exista
if (!fs.existsSync(dbFolder)) {
  fs.mkdirSync(dbFolder, { recursive: true }) // Cria pasta 'db' se não existir
}

// Caminho absoluto para o arquivo do banco (baseado no process.cwd())
const dbFile = path.resolve(process.cwd(), env.DATABASE_URL.replace('./', ''))

const connection = { filename: dbFile } // Usar o caminho absoluto aqui (IMPORTANTE!)

export const config: Knex.Config = {
  client: env.DATABASE_CLIENT,
  connection:
    env.DATABASE_CLIENT === 'sqlite'
      ? connection // Usa aqui o objeto com caminho absoluto
      : env.DATABASE_URL,
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
}

export const knexInstance = knex(config)

// import knex from 'knex'
// import type { Knex } from 'knex' // Importa só o tipo
// import { env } from './env/index.js'

// // console.log(process.env.DATABASE_URL)

// // if (!process.env.DATABASE_URL) {
// //   throw new Error('tem nada ai não mongol')
// // }

// export const config: Knex.Config = {
//   client: env.DATABASE_CLIENT,
//   connection:
//     env.DATABASE_CLIENT === 'sqlite'
//       ? {
//           filename: env.DATABASE_URL,
//         }
//       : env.DATABASE_URL,
//   useNullAsDefault: true,
//   migrations: {
//     extension: 'ts',
//     directory: './db/migrations',
//   },
// }

// export const knexInstance = knex(config)
