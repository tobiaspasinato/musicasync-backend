import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import 'dotenv/config'
import apiRouter from './api/index.js'

const app = new Hono()

// Ruta principal
app.get('/', (c) => {
  return c.json({ message: 'MusicSync Backend API', version: '1.0.0' })
})

// Montar el router de la API en /api
app.route('/api', apiRouter)

serve({
  fetch: app.fetch,
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
