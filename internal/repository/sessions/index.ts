import { db } from '@/repository/sqlite'
import { eq } from 'drizzle-orm'

import type { ICustomError } from '@/models'
import { ErrorCodeEnum, ErorrStatusEnum } from '@/constants'

import { sessions } from '../sqlite/schema'
import type { IDbSession } from '../sqlite/schema'

export async function createSession(
	data: { userId: number, session: string }
): Promise<IDbSession> {
	const isSessionAlreadyExist = (await db
		.select()
		.from(sessions)
		.where(eq(sessions.session, data.session))).length > 0

	if (isSessionAlreadyExist) {
		throw {
			code: ErrorCodeEnum.SessionAlreadyExist,
			status: ErorrStatusEnum.BadRequest,
			description: 'Такая сессия уже существует'
		} satisfies ICustomError
	}

	const res: IDbSession[] | [] = await db
		.insert(sessions)
		.values(data)
		.returning()

	const user: IDbSession | undefined = res[0]

	return user
}
