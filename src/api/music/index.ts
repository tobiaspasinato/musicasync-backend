import { Hono } from 'hono'
import { MusicController } from './domain/musicController.js'
import { musicDependenciesMiddleware } from '../middleware/index.js'
import './types.js' // Importar los tipos extendidos

const musicRouter = new Hono()

// Aplicar middleware de inyección de dependencias específico para música
musicRouter.use('*', musicDependenciesMiddleware)

// Instanciar el controlador
const musicController = new MusicController()

// GET /api/music - Obtener todas las canciones
musicRouter.get('/', (c) => musicController.getAllSongs(c))

// GET /api/music/:id - Obtener una canción por ID
musicRouter.get('/:id', (c) => musicController.getSongById(c))

// POST /api/music - Crear una nueva canción
musicRouter.post('/', (c) => musicController.createSong(c))

// PUT /api/music/:id - Actualizar una canción
musicRouter.put('/:id', (c) => musicController.updateSong(c))

// DELETE /api/music/:id - Eliminar una canción
musicRouter.delete('/:id', (c) => musicController.deleteSong(c))

export default musicRouter