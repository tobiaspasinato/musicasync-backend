export interface Music {
  id: string
  title: string
  artist: string
  album?: string
  duration?: number
}

export class MusicService {
  private songs: Music[] = []

  async getAllSongs(): Promise<Music[]> {
    return this.songs
  }

  async getSongById(id: string): Promise<Music | null> {
    return this.songs.find(song => song.id === id) || null
  }

  async createSong(songData: Omit<Music, 'id'>): Promise<Music> {
    const newSong: Music = {
      id: Date.now().toString(),
      ...songData
    }
    this.songs.push(newSong)
    return newSong
  }

  async updateSong(id: string, songData: Partial<Omit<Music, 'id'>>): Promise<Music | null> {
    const songIndex = this.songs.findIndex(song => song.id === id)
    if (songIndex === -1) return null

    this.songs[songIndex] = { ...this.songs[songIndex], ...songData }
    return this.songs[songIndex]
  }

  async deleteSong(id: string): Promise<boolean> {
    const songIndex = this.songs.findIndex(song => song.id === id)
    if (songIndex === -1) return false

    this.songs.splice(songIndex, 1)
    return true
  }
}
