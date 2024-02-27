import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

import { UserStatusEnum, UserRoleEnum } from '@/models'

export const users = sqliteTable('users', {
	id: integer('id').primaryKey(),
	email: text('email').unique().notNull().default(''),
	role: text('role').notNull().default(UserRoleEnum.User).$type<UserRoleEnum>(),
	status: text('status').notNull().default(UserStatusEnum.Active).$type<UserStatusEnum>(),
	passwordHash: text('password_hash').notNull().default(''),
	passwordSalt: text('password_salt').notNull().default('')
})

type DbUser = typeof users.$inferSelect
type DbUserInsert = typeof users.$inferInsert

export interface IDbUser extends DbUser { }
export interface IDbUserInsert extends DbUserInsert { }

export const sessions = sqliteTable('sessions', {
	id: integer('id').primaryKey(),
	userId: integer('user_id').notNull().references(() => users.id),
	session: text('session').notNull()
})

type DbSession = typeof sessions.$inferSelect
type DbSessionInsert = typeof sessions.$inferInsert

export interface IDbSession extends DbSession { }
export interface IDbSessionInsert extends DbSessionInsert { }

export const registrations = sqliteTable('registrations', {
	id: integer('id').primaryKey(),
	email: text('email').unique().notNull(),
	passwordHash: text('password_hash').notNull(),
	passwordSalt: text('password_salt').notNull(),
	activationToken: text('activation_token').notNull().unique()
})

type DbRegistration = typeof registrations.$inferSelect
type DbRegistrationInsert = typeof registrations.$inferInsert

export interface IDbRegistration extends DbRegistration { }
export interface IDbRegistrationInsert extends DbRegistrationInsert { }

export const files = sqliteTable('files', {
	id: integer('id').primaryKey(),
	name: text('name').notNull(),
	s3Path: text('s3_path').notNull(),
	uploadedByUserId: integer('uploaded_by_user_id').notNull().references(() => users.id)
})

type DbFile = typeof files.$inferSelect
type DbFileInsert = typeof files.$inferInsert

export interface IDbFile extends DbFile { }
export interface IDbFileInsert extends DbFileInsert { }
