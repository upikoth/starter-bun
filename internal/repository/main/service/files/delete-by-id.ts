import { eq } from 'drizzle-orm'

import { db } from '../../sqlite'
import { files } from '../../sqlite/schema'

export default async function deleteById(id: number): Promise<void> {
	return db
		.delete(files)
		.where(eq(files.id, id))
}
