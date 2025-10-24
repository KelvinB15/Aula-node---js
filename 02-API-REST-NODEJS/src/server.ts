import { app } from './app.js'
import { env } from './env/index.js'

app.listen({ port: env.PORT }).then(() => {
  console.log('HTTP Server Running!')
})

// hook global, ou sejá, em toda rota da API funciona

/*
app.addHook('preHandler', async (request) => {
  console.log(`[${request.method}] ${request.url}`)
})
*/
