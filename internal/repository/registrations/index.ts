import { eq } from 'drizzle-orm'

import type { ICreateSessionRequest, ICustomError } from '@/models'
import { ErrorCodeEnum, ErorrStatusEnum } from '@/constants'

import { db } from '@/repository/sqlite'

import { registrations, users } from '../sqlite/schema'
import type { IDbRegistration } from '../sqlite/schema'

export async function createRegistration(
	data: ICreateSessionRequest & {
		passwordHash: string,
		passwordSalt: string,
		activationToken: string
	}
): Promise<IDbRegistration> {
	const isUserWithThisEmailAlreadyExist = (await db
		.select()
		.from(users)
		.where(eq(users.email, data.email))).length > 0

	if (isUserWithThisEmailAlreadyExist) {
		throw {
			code: ErrorCodeEnum.UserWithThisEmailAlreadyExist,
			status: ErorrStatusEnum.BadRequest,
			description: 'Пользователь с таким email уже существует'
		} satisfies ICustomError
	}

	await db
		.delete(registrations)
		.where(eq(registrations.email, data.email))

	const res: IDbRegistration[] = await db.
		insert(registrations)
		.values(data)
		.returning()

	return res[0]
}
