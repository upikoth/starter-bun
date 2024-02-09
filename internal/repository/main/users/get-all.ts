import { eq, sql } from 'drizzle-orm'

import type {
	IGetUsersRequest
} from '@/models'

import { db } from '../sqlite'
import { users } from '../sqlite/schema'
import type { IDbUser } from '../sqlite/schema'

export default async function getAll(data: IGetUsersRequest): Promise<{ users: IDbUser[], total: number }> {
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
