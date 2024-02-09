import { eq } from 'drizzle-orm'

import { db } from '../../sqlite'
import { sessions } from '../../sqlite/schema'
import type { IMainSession } from '../../models'

export default async function getBySession(sessionValue: string): Promise<IMainSession | undefined> {
	const res: (IMainSession | undefined)[] = await db
		.select()
		.from(sessions)
		.where(eq(sessions.session, sessionValue))

	return res[0]
}
