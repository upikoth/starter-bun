import type { IUser, IGetUsersRequest } from '@internal/models/users'
import { db } from '@internal/repository/sqlite'

import { users } from '../sqlite/schema'
import type { IDbUser } from '../sqlite/schema'

export async function getUsers(data: IGetUsersRequest): Promise<IUser[]> {
	const res: IDbUser[] = await db
		.select()
		.from(users)
		.limit(data.limit)
		.offset(data.offset)

	return res
}
