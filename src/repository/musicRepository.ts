import { eq } from 'drizzle-orm'
import { db } from '../db/index.js'
import { musicsTable, type Music, type NewMusic } from '../db/schema.js'

export interface MusicRepository {
  findAll(): Promise<Music[]>
  findById(id: string): Promise<Music | undefined>
  create(music: Omit<NewMusic, 'id' | 'createdAt' | 'updatedAt'>): Promise<Music>
  update(id: string, music: Partial<Omit<NewMusic, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Music | undefined>
  delete(id: string): Promise<boolean>
}

export class DrizzleMusicRepository implements MusicRepository {
  
  async findAll(): Promise<Music[]> {
    return await db.select().from(musicsTable)
  }

  async findById(id: string): Promise<Music | undefined> {
    const result = await db
      .select()
      .from(musicsTable)
      .where(eq(musicsTable.id, id))
      .limit(1)
    
    return result[0]
  }

  async create(musicData: Omit<NewMusic, 'id' | 'createdAt' | 'updatedAt'>): Promise<Music> {
    const newMusic: NewMusic = {
      id: `music_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...musicData
    }

    const result = await db
      .insert(musicsTable)
      .values(newMusic)

    // Retornar el registro creado
    const created = await this.findById(newMusic.id!)
    if (!created) {
      throw new Error('Error al crear la música')
    }
    
    return created
  }

  async update(id: string, musicData: Partial<Omit<NewMusic, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Music | undefined> {
    await db
      .update(musicsTable)
      .set(musicData)
      .where(eq(musicsTable.id, id))

    return await this.findById(id)
  }

  async delete(id: string): Promise<boolean> {
    const result = await db
      .delete(musicsTable)
      .where(eq(musicsTable.id, id))

    return result.length > 0
  }
}
