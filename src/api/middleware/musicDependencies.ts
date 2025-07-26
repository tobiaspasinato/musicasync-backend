import type { Context, Next } from 'hono'
import { MusicService } from '../music/domain/musicService.js'

export const musicDependenciesMiddleware = async (c: Context, next: Next) => {
  // Inyectar dependencias específicas del módulo de música
  c.set('musicService', new MusicService())
  await next()
}
