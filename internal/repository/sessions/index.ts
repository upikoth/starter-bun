import { sql, eq } from 'drizzle-orm'

import { ErrorCodeEnum, ErorrStatusEnum } from '@/constants'

import type {
	ICustomError,
	IGetSessionsRequest,
	IDeleteSessionRequest
} from '@/models'

import { db } from '../sqlite'
import { sessions } from '../sqlite/schema'
import type { IDbSession } from '../sqlite/schema'

export async function getSessions(data: IGetSessionsRequest): Promise<{ sessions: IDbSession[], total: number }> {
	const dbSessions: IDbSession[] = await db
		.select()
		.from(sessions)
		.limit(data.limit)
		.offset(data.offset)

	const { total }: { total: number } = (await db
		.select({ total: sql<number>`count(${sessions.id})` })
		.from(sessions)
	)[0]

	return {
		sessions: dbSessions,
		total
	}
}

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

export async function deleteSession(data: IDeleteSessionRequest): Promise<void> {
	const res: IDbSession[] | [] = await db
		.select()
		.from(sessions)
		.where(eq(sessions.id, data.id))

	const session: IDbSession | undefined = res[0]

	if (!session) {
		throw {
			code: ErrorCodeEnum.EntityNotFound,
			status: ErorrStatusEnum.BadRequest,
			description: 'Сессия не найдена'
		} satisfies ICustomError
	}

	return db
		.delete(sessions)
		.where(eq(sessions.id, data.id))
}

export async function getSessionBySession(sessionValue: string): Promise<IDbSession> {
	const res: IDbSession[] | [] = await db
		.select()
		.from(sessions)
		.where(eq(sessions.session, sessionValue))

	const session: IDbSession | undefined = res[0]

	if (!session) {
		throw {
			code: ErrorCodeEnum.EntityNotFound,
			status: ErorrStatusEnum.BadRequest,
			description: 'Сессия не найдена'
		} satisfies ICustomError
	}

	return session
}

export async function deleteAllSessionsOfUser(userId: number): Promise<void> {
	return db
		.delete(sessions)
		.where(eq(sessions.userId, userId))
}
