import { eq } from 'drizzle-orm'

import {
	ErrorCodeEnum,
	ErorrStatusEnum
} from '@/constants'

import type {
	ICustomError,
	IUpdateUserRequest
} from '@/models'

import { db } from '../sqlite'
import { users } from '../sqlite/schema'
import type { IDbUser } from '../sqlite/schema'

export default async function update(data: IUpdateUserRequest): Promise<IDbUser> {
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
