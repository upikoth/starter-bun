import { sql, eq } from 'drizzle-orm'

import type {
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
	const res: IDbSession[] = await db
		.insert(sessions)
		.values(data)
		.returning()

	return res[0]
}

export async function deleteSession(data: IDeleteSessionRequest): Promise<void> {
	return db
		.delete(sessions)
		.where(eq(sessions.id, data.id))
}

export async function getSessionById(id: number): Promise<IDbSession | undefined> {
	const res: (IDbSession | undefined)[] = await db
		.select()
		.from(sessions)
		.where(eq(sessions.id, id))

	return res[0]
}

export async function getSessionBySession(sessionValue: string): Promise<IDbSession | undefined> {
	const res: (IDbSession | undefined)[] = await db
		.select()
		.from(sessions)
		.where(eq(sessions.session, sessionValue))

	return res[0]
}

export async function deleteAllSessionsOfUser(userId: number): Promise<void> {
	return db
		.delete(sessions)
		.where(eq(sessions.userId, userId))
}
