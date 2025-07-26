import { Hono } from 'hono'
import musicRouter from './music/index.js'

const apiRouter = new Hono()

// Ruta de salud de la API
apiRouter.get('/', (c) => {
  return c.json({ message: 'API is running', status: 'healthy' })
})

// Montar el router de música en /music
apiRouter.route('/music', musicRouter)

export default apiRouter
