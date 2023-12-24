import type {
	IUser,
	IGetUsersRequest,
	IGetUserRequest,
	ICreateUserRequest,
	IUpdateUserRequest
} from '@internal/models/users'
import { db } from '@internal/repository/sqlite'
import { eq, sql } from 'drizzle-orm'

import type { ICustomError } from '@internal/models'
import { ErrorCodeEnum, ErorrStatusEnum } from '@internal/constants'

import { users } from '../sqlite/schema'
import type { IDbUser } from '../sqlite/schema'

export async function getUsers(data: IGetUsersRequest): Promise<{ users: IUser[], total: number}> {
	const dbUsers: IDbUser[] = await db
		.select()
		.from(users)
		.limit(data.limit)
		.offset(data.offset)

	const { total }: { total: number } = (await db
		.select({ total: sql<number>`count(${users.id})` })
		.from(users))[0]

	return {
		users: dbUsers,
		total
	}
}

export async function getUser(data: IGetUserRequest): Promise<IUser> {
	const res: IDbUser[] | [] = await db
		.select()
		.from(users)
		.where(eq(users.id, data.id))

	const user: IDbUser | undefined = res[0]

	if (!user) {
		throw {
			code: ErrorCodeEnum.EntityNotFound,
			status: ErorrStatusEnum.Success,
			description: 'Пользователь не найден'
		} satisfies ICustomError
	}

	return user
}

export async function createUser(data: ICreateUserRequest): Promise<IUser> {
	const res: IDbUser[] | [] = await db
		.insert(users)
		.values(data)
		.returning()

	const user: IDbUser | undefined = res[0]

	return user
}

export async function updateUser(data: IUpdateUserRequest): Promise<IUser> {
	const res: IDbUser[] | [] = await db
		.update(users)
		.set(data)
		.where(eq(users.id, data.id))
		.returning()

	const user: IDbUser | undefined = res[0]

	if (!user) {
		throw {
			code: ErrorCodeEnum.EntityNotFound,
			status: ErorrStatusEnum.Success,
			description: 'Пользователь не найден'
		} satisfies ICustomError
	}

	return user
}
