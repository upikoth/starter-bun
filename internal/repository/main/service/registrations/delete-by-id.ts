import { eq } from 'drizzle-orm'

import { db } from '../../sqlite'
import { registrations } from '../../sqlite/schema'

export default async function deleteById(id: number): Promise<void> {
	return db
		.delete(registrations)
		.where(eq(registrations.id, id))
}
