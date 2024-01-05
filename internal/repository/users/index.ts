import { eq, sql } from 'drizzle-orm'

import {
	ErrorCodeEnum,
	ErorrStatusEnum
} from '@/constants'

import type {
	ICustomError,
	IGetUsersRequest,
	IUpdateUserRequest
} from '@/models'

import { db } from '../sqlite'
import { users } from '../sqlite/schema'
import type { IDbUser } from '../sqlite/schema'

export async function getUsers(data: IGetUsersRequest): Promise<{ users: IDbUser[], total: number }> {
	const dbUsers: IDbUser[] = await db
		.select()
		.from(users)
		.where(
			eq(users.status, data.status || users.status)
		)
		.limit(data.limit)
		.offset(data.offset)

	const { total }: { total: number } = (await db
		.select({ total: sql<number>`count(${users.id})` })
		.from(users)
		.where(
			eq(users.status, data.status || users.status)
		))[0]

	return {
		users: dbUsers,
		total
	}
}

export async function getUserById(id: number): Promise<IDbUser | undefined> {
	const res: (IDbUser | undefined)[] = await db
		.select()
		.from(users)
		.where(eq(users.id, id))

	return res[0]
}

export async function getUserByEmail(email: string): Promise<IDbUser | undefined> {
	const res: (IDbUser | undefined)[] = await db
		.select()
		.from(users)
		.where(eq(users.email, email))

	return res[0]
}

export async function createUser(
	data: { email: string, passwordHash: string, passwordSalt: string }
): Promise<IDbUser> {
	const res: IDbUser[] = await db
		.insert(users)
		.values(data)
		.returning()

	return res[0]
}

export async function updateUser(data: IUpdateUserRequest): Promise<IDbUser> {
	const res: (IDbUser | undefined)[] = await db
		.update(users)
		.set(data)
		.where(eq(users.id, data.id))
		.returning()

	const user = res[0]

	if (!user) {
		throw {
			code: ErrorCodeEnum.EntityNotFound,
			status: ErorrStatusEnum.BadRequest,
			description: 'Пользователь не найден'
		} satisfies ICustomError
	}

	return user
}
