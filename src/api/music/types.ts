import type { MusicService } from './domain/musicService.js'

declare module 'hono' {
  interface ContextVariableMap {
    musicService: MusicService
  }
}
