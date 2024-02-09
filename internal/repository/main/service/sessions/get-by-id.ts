import { eq } from 'drizzle-orm'

import { db } from '../../sqlite'
import { sessions } from '../../sqlite/schema'
import type { IMainSession } from '../../models'

export default async function getById(id: number): Promise<IMainSession | undefined> {
	const res: (IMainSession | undefined)[] = await db
		.select()
		.from(sessions)
		.where(eq(sessions.id, id))

	return res[0]
}
