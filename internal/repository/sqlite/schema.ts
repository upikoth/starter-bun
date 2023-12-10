import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
	id: integer('id').primaryKey(),
	name: text('name').notNull()
})

type DbUser = typeof users.$inferSelect
type DbUserInsert = typeof users.$inferInsert

export interface IDbUser extends DbUser{}
export interface IDbUserInsert extends DbUserInsert{}
