import { eq } from 'drizzle-orm'

import {
	ErrorCodeEnum,
	ErrorStatusEnum
} from '@/constants'

import type {
	ICustomError
} from '@/models'

import { db } from '../../sqlite'
import { users } from '../../sqlite/schema'
import type {
	IMainUser,
	IMainUpdateUserRequest
} from '../../models'

export default async function update(data: IMainUpdateUserRequest): Promise<IMainUser> {
	const res: (IMainUser | undefined)[] = await db
		.update(users)
		.set(data)
		.where(eq(users.id, data.id))
		.returning()

	const user = res[0]

	if (!user) {
		throw {
			code: ErrorCodeEnum.EntityNotFound,
			status: ErrorStatusEnum.BadRequest,
			description: 'Пользователь не найден'
		} satisfies ICustomError
	}

	return user
}
