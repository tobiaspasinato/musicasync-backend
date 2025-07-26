import { mysqlTable, varchar, int, text, timestamp } from 'drizzle-orm/mysql-core'

export const musicsTable = mysqlTable('musics', {
  id: varchar('id', { length: 255 }).primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  artist: varchar('artist', { length: 255 }).notNull(),
  album: varchar('album', { length: 255 }),
  duration: int('duration'), // duración en segundos
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
})

export type Music = typeof musicsTable.$inferSelect
export type NewMusic = typeof musicsTable.$inferInsert
