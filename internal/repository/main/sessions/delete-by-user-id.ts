import { eq } from 'drizzle-orm'

import { db } from '../sqlite'
import { sessions } from '../sqlite/schema'

export default async function deleteByUserId(userId: number): Promise<void> {
	return db
		.delete(sessions)
		.where(eq(sessions.userId, userId))
}
