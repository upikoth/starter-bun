import { eq } from 'drizzle-orm'

import { db } from '../sqlite'
import { users } from '../sqlite/schema'
import type { IDbUser } from '../sqlite/schema'

export default async function getById(id: number): Promise<IDbUser | undefined> {
	const res: (IDbUser | undefined)[] = await db
		.select()
		.from(users)
		.where(eq(users.id, id))

	return res[0]
}
