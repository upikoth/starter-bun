import { eq } from 'drizzle-orm'

import { db } from '../../sqlite'
import { users } from '../../sqlite/schema'
import type { IMainUser } from '../../models'

export default async function getById(id: number): Promise<IMainUser | undefined> {
	const res: (IMainUser | undefined)[] = await db
		.select()
		.from(users)
		.where(eq(users.id, id))

	return res[0]
}
