import { type MusicRepository } from '../../../repository/index.js'
import { type Music } from '../../../db/schema.js'

export class MusicService {
  constructor(private musicRepository: MusicRepository) {}

  async getAllSongs(): Promise<Music[]> {
    return await this.musicRepository.findAll()
  }

  async getSongById(id: string): Promise<Music | null> {
    const music = await this.musicRepository.findById(id)
    return music || null
  }

  async createSong(songData: Omit<Music, 'id' | 'createdAt' | 'updatedAt'>): Promise<Music> {
    return await this.musicRepository.create(songData)
  }

  async updateSong(id: string, songData: Partial<Omit<Music, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Music | null> {
    const updatedMusic = await this.musicRepository.update(id, songData)
    return updatedMusic || null
  }

  async deleteSong(id: string): Promise<boolean> {
    return await this.musicRepository.delete(id)
  }
}
