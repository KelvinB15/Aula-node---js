import 'dotenv/config'
import { z } from 'zod'

// configuração para executar o build, server e test do projeto, através do env
const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3333),
})

// processa a configuração feita anteriormente
const _env = envSchema.safeParse(process.env)

// Caso a execussão não tenha sucesso retorne erro na variaveis env
if (_env.success === false) {
  console.error('Variáveis de ambiente inválidas')

  // Após erro, impede a aplicação de ser executada
  throw new Error('Variáveis de ambiente inválidas')
}

export const env = _env.data
