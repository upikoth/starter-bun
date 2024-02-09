import { eq } from 'drizzle-orm'

import { db } from '../sqlite'
import { sessions } from '../sqlite/schema'
import type { IDbSession } from '../sqlite/schema'

export default async function getById(id: number): Promise<IDbSession | undefined> {
	const res: (IDbSession | undefined)[] = await db
		.select()
		.from(sessions)
		.where(eq(sessions.id, id))

	return res[0]
}
