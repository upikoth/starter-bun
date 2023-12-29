import { UserStatusEnum } from '@internal/models'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
	id: integer('id').primaryKey(),
	email: text('email').unique().notNull().default(''),
	status: text('status').notNull().default(UserStatusEnum.Active).$type<UserStatusEnum>(),
	passwordHash: text('password_hash').notNull().default(''),
	passwordSalt: text('password_salt').notNull().default('')
})

type DbUser = typeof users.$inferSelect
type DbUserInsert = typeof users.$inferInsert

export interface IDbUser extends DbUser{}
export interface IDbUserInsert extends DbUserInsert{}
