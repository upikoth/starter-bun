import { eq } from 'drizzle-orm'

import { db } from '../sqlite'
import { registrations } from '../sqlite/schema'
import type { IDbRegistration } from '../sqlite/schema'

export default async function getById(id: number): Promise<IDbRegistration | undefined> {
	const res: (IDbRegistration | undefined)[] = await db
		.select()
		.from(registrations)
		.where(eq(registrations.id, id))

	return res[0]
}
