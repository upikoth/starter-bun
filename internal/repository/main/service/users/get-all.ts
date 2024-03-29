import { eq, sql } from 'drizzle-orm'

import { db } from '../../sqlite'
import { users } from '../../sqlite/schema'
import type {
	IMainUser,
	IMainGetUsersRequest,
	IMainGetUsersResponse
} from '../../models'

export default async function getAll(data: IMainGetUsersRequest): Promise<IMainGetUsersResponse> {
	const dbUsers: IMainUser[] = await db
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
