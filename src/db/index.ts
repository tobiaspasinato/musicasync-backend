import { drizzle } from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise'
import * as schema from './schema.js'

// Configuración de la conexión a la base de datos
const connection = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'musicasync',
  connectionLimit: 10,
})

// Crear instancia de Drizzle
export const db = drizzle(connection, { schema, mode: 'default' })

// Exportar el tipo de la base de datos
export type Database = typeof db
