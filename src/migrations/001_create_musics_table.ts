import { db } from '../db/index.js'
import { sql } from 'drizzle-orm'

async function createMusicTable() {
  try {
    console.log('Creando tabla musics...')
    
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS musics (
        id VARCHAR(255) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        artist VARCHAR(255) NOT NULL,
        album VARCHAR(255),
        duration INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `)
    
    console.log('Tabla musics creada exitosamente')
  } catch (error) {
    console.error('Error al crear la tabla:', error)
    throw error
  }
}

// Ejecutar la migración si este archivo se ejecuta directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  createMusicTable()
    .then(() => {
      console.log('Migración completada')
      process.exit(0)
    })
    .catch((error) => {
      console.error('Error en la migración:', error)
      process.exit(1)
    })
}

export { createMusicTable }
