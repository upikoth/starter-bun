import { eq } from 'drizzle-orm'

import { db } from '../../sqlite'
import { registrations } from '../../sqlite/schema'
import type { IMainRegistration } from '../../models'

export default async function getByToken(token: string): Promise<IMainRegistration | undefined> {
	const res: (IMainRegistration | undefined)[] = await db
		.select()
		.from(registrations)
		.where(eq(registrations.activationToken, token))

	return res[0]
}
