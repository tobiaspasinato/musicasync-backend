import type { Context, Next } from 'hono'
import { MusicService } from '../music/domain/musicService.js'
import { DrizzleMusicRepository } from '../../repository/index.js'

export const musicDependenciesMiddleware = async (c: Context, next: Next) => {
  // Inyectar dependencias específicas del módulo de música
  const musicRepository = new DrizzleMusicRepository()
  c.set('musicService', new MusicService(musicRepository))
  await next()
}
