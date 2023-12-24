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
	const isUserWithThisEmailAlreadyExist = (await db
		.select()
		.from(users)
		.where(eq(users.email, data.email))).length > 0

	if (isUserWithThisEmailAlreadyExist) {
		throw {
			code: ErrorCodeEnum.UserWithThisEmailAlreadyExist,
			status: ErorrStatusEnum.Success,
			description: 'Пользователь с таким email уже существует'
		} satisfies ICustomError
	}

	const res: IDbUser[] | [] = await db
		.insert(users)
		.values(data)
		.returning()

	const user: IDbUser | undefined = res[0]

	return user
}

export async function updateUser(data: IUpdateUserRequest): Promise<IUser> {
	const isUserWithThisEmailAlreadyExist = !!data.email && (await db
		.select()
		.from(users)
		.where(eq(users.email, data.email))).length > 0

	if (isUserWithThisEmailAlreadyExist) {
		throw {
			code: ErrorCodeEnum.UserWithThisEmailAlreadyExist,
			status: ErorrStatusEnum.Success,
			description: 'Пользователь с таким email уже существует'
		} satisfies ICustomError
	}

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
