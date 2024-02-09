import { eq } from 'drizzle-orm'

import { db } from '../sqlite'
import { files } from '../sqlite/schema'
import type { IDbFile } from '../sqlite/schema'

export default async function getById(id: number): Promise<IDbFile | undefined> {
	const res: (IDbFile | undefined)[] = await db
		.select()
		.from(files)
		.where(eq(files.id, id))

	return res[0]
}
