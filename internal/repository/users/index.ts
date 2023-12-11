import type { IUser, IGetUsersRequest, IGetUserRequest } from '@internal/models/users'
import { db } from '@internal/repository/sqlite'
import { eq } from 'drizzle-orm'

import type { ICustomError } from '@internal/models'
import { ErrorCodeEnum, ErorrStatusEnum } from '@internal/constants'

import { users } from '../sqlite/schema'
import type { IDbUser } from '../sqlite/schema'

export async function getUsers(data: IGetUsersRequest): Promise<IUser[]> {
	const res: IDbUser[] = await db
		.select()
		.from(users)
		.limit(data.limit)
		.offset(data.offset)

	return res
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
