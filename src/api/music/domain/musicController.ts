import type { Context } from 'hono'
import { MusicService } from './musicService.js'

export class MusicController {
  
  async getAllSongs(c: Context) {
    const musicService = c.get('musicService') as MusicService
    const songs = await musicService.getAllSongs()
    
    return c.json({
      message: 'Lista de canciones',
      data: songs
    })
  }

  async getSongById(c: Context) {
    const musicService = c.get('musicService') as MusicService
    const id = c.req.param('id')
    const song = await musicService.getSongById(id)
    
    if (!song) {
      return c.json({
        message: 'Canción no encontrada'
      }, 404)
    }

    return c.json({
      message: `Canción con ID: ${id}`,
      data: song
    })
  }

  async createSong(c: Context) {
    const musicService = c.get('musicService') as MusicService
    const body = await c.req.json()
    
    try {
      const newSong = await musicService.createSong(body)
      return c.json({
        message: 'Canción creada exitosamente',
        data: newSong
      }, 201)
    } catch (error) {
      return c.json({
        message: 'Error al crear la canción',
        error: error instanceof Error ? error.message : 'Error desconocido'
      }, 400)
    }
  }

  async updateSong(c: Context) {
    const musicService = c.get('musicService') as MusicService
    const id = c.req.param('id')
    const body = await c.req.json()

    try {
      const updatedSong = await musicService.updateSong(id, body)
      
      if (!updatedSong) {
        return c.json({
          message: 'Canción no encontrada'
        }, 404)
      }

      return c.json({
        message: `Canción con ID ${id} actualizada`,
        data: updatedSong
      })
    } catch (error) {
      return c.json({
        message: 'Error al actualizar la canción',
        error: error instanceof Error ? error.message : 'Error desconocido'
      }, 400)
    }
  }

  async deleteSong(c: Context) {
    const musicService = c.get('musicService') as MusicService
    const id = c.req.param('id')

    try {
      const deleted = await musicService.deleteSong(id)
      
      if (!deleted) {
        return c.json({
          message: 'Canción no encontrada'
        }, 404)
      }

      return c.json({
        message: `Canción con ID ${id} eliminada`
      })
    } catch (error) {
      return c.json({
        message: 'Error al eliminar la canción',
        error: error instanceof Error ? error.message : 'Error desconocido'
      }, 400)
    }
  }
}
