// Importa o knex e os tipos necessários
import knex from 'knex'
import type { Knex } from 'knex'
import { env } from './env/index.js'

// Importa módulos nativos do Node para lidar com o sistema de arquivos e caminhos
import fs from 'fs'
import path from 'path'

// Criamos uma variável de conexão que pode ser uma string (PostgreSQL) ou um objeto (SQLite)
let connection: Knex.StaticConnectionConfig | string

// 🔹 Se o banco for SQLite (ou seja, DATABASE_CLIENT=sqlite)
if (env.DATABASE_CLIENT === 'sqlite') {
  // 🟢 Cria o caminho absoluto para a pasta onde ficará o banco
  const dbFolder = path.resolve('./db')

  // 🟢 Garante que a pasta ./db existe antes de tentar abrir o arquivo SQLite
  // Se não existir, cria automaticamente (para evitar o erro SQLITE_CANTOPEN)
  if (!fs.existsSync(dbFolder)) {
    fs.mkdirSync(dbFolder, { recursive: true })
  }

  // 🟢 Cria o caminho absoluto do arquivo de banco, substituindo o "./" inicial
  // Isso evita erros de caminho relativo em ambientes como o Render
  const dbFile = path.resolve(env.DATABASE_URL.replace('./', ''))

  // 🟢 Define o formato de conexão para o SQLite (arquivo local)
  connection = { filename: dbFile }
} else {
  // 🔹 Caso o banco seja PostgreSQL (ou outro), apenas usa a string de conexão
  connection = env.DATABASE_URL
}

// 🔧 Configuração principal do Knex
export const config: Knex.Config = {
  client: env.DATABASE_CLIENT, // Define qual cliente será usado (sqlite ou pg)
  connection, // Passa o objeto de conexão criado acima
  useNullAsDefault: env.DATABASE_CLIENT === 'sqlite', // SQLite exige isso
  migrations: {
    extension: 'ts', // Usa arquivos TypeScript para migrations
    directory: './db/migrations', // Define onde estão as migrations
  },
}

// 🟢 Cria a instância do knex pronta para ser usada no projeto
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
