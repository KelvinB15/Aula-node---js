import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'teste', 'production'])
    .default('production'),
  DATABASE_URL: z.string(),
  PORT: z.number().default(3333),
})

const _env = envSchema.safeParse(process.env)
/*
if (_env.success === false) {

  console.error('Deu erro no env aqui', _env.error.flatten())

  throw new Error('Deu erro no env aqui')
}
export const env = _env.data
*/

if (_env.success === false) {
  const formatted = z.treeifyError(_env.error)

  console.error('Erro no env, verifique se está sem conteudo')
  console.dir(formatted, { depth: null })

  throw new Error('Erro no env, verifique se está sem conteudo')
}
export const env = _env.data

/*
Aqui o zod está infromando o erro, caso coloque safeParse, ele não irá informa o erro
export const env = envSchema.parse(process.env)
*/
