import { eq } from 'drizzle-orm'

import { db } from '../sqlite'
import { sessions } from '../sqlite/schema'
import type { IDbSession } from '../sqlite/schema'

export default async function getBySession(sessionValue: string): Promise<IDbSession | undefined> {
	const res: (IDbSession | undefined)[] = await db
		.select()
		.from(sessions)
		.where(eq(sessions.session, sessionValue))

	return res[0]
}
