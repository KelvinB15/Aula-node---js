import { env } from './env/index.js'
import { app } from './app.js'
import { appRoutes } from './http/routes.js'

await appRoutes

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server Running!')
  })
