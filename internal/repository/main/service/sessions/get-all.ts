import { sql } from 'drizzle-orm'

import { db } from '../../sqlite'
import { sessions } from '../../sqlite/schema'
import type {
	IMainSession,
	IMainGetSessionsRequest,
	IMainGetSessionsResponse
} from '../../models'

export default async function getAll(data: IMainGetSessionsRequest): Promise<IMainGetSessionsResponse> {
	const dbSessions: IMainSession[] = await db
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
