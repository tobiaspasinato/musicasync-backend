# musicasync-backend

API backend para MusicSync utilizando Hono.js y Drizzle ORM con MySQL.

## Configuración

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar la base de datos

1. Crea una base de datos MySQL llamada `musicasync`
2. Copia el archivo `.env.example` a `.env`
3. Configura las variables de entorno en `.env`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=musicasync
PORT=3000
```

### 3. Ejecutar migraciones

```bash
npm run migrate
```

### 4. Iniciar el servidor

```bash
# Desarrollo
npm run dev

# Producción
npm run build
npm start
```

## API Endpoints

### Música

- `GET /api/music` - Obtener todas las canciones
- `GET /api/music/:id` - Obtener canción por ID
- `POST /api/music` - Crear nueva canción
- `PUT /api/music/:id` - Actualizar canción
- `DELETE /api/music/:id` - Eliminar canción

### Ejemplo de payload para crear canción:

```json
{
  "title": "Mi Canción",
  "artist": "Artista",
  "album": "Álbum",
  "duration": 180
}
```

## Tecnologías utilizadas

- **Hono.js** - Framework web rápido y ligero
- **Drizzle ORM** - ORM type-safe para TypeScript
- **MySQL** - Base de datos relacional
- **TypeScript** - Superset tipado de JavaScript
