import { eq } from 'drizzle-orm'

import { db } from '../sqlite'
import { users } from '../sqlite/schema'
import type { IDbUser } from '../sqlite/schema'

export default async function getByEmail(email: string): Promise<IDbUser | undefined> {
	const res: (IDbUser | undefined)[] = await db
		.select()
		.from(users)
		.where(eq(users.email, email))

	return res[0]
}
