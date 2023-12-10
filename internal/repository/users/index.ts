import type { IUser } from '@internal/models/users'
import { db } from '@internal/repository/sqlite'

import { users } from '../sqlite/schema'
import type { IDbUser } from '../sqlite/schema'

export function getAll(): IUser[] {
	const res: IDbUser[] = db.select().from(users).all()

	return res
}
