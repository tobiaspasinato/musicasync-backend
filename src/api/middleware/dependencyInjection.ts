import type { Context, Next } from 'hono'

export const dependencyInjectionMiddleware = async (c: Context, next: Next) => {
  // Este middleware puede ser usado por cualquier módulo de la API
  // Las dependencias específicas se inyectan según el contexto
  await next()
}
