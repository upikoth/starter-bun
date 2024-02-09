import { sql } from 'drizzle-orm'

import type {
	IGetSessionsRequest
} from '@/models'

import { db } from '../sqlite'
import { sessions } from '../sqlite/schema'
import type { IDbSession } from '../sqlite/schema'

export default async function getAll(data: IGetSessionsRequest): Promise<{ sessions: IDbSession[], total: number }> {
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
