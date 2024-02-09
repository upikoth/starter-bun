import { eq } from 'drizzle-orm'

import { db } from '../sqlite'
import { registrations } from '../sqlite/schema'
import type { IDbRegistration } from '../sqlite/schema'

export default async function getByToken(token: string): Promise<IDbRegistration | undefined> {
	const res: (IDbRegistration | undefined)[] = await db
		.select()
		.from(registrations)
		.where(eq(registrations.activationToken, token))

	return res[0]
}
