import { eq } from 'drizzle-orm'

import { db } from '../../sqlite'
import { files } from '../../sqlite/schema'
import type { IMainFile } from '../../models'

export default async function getById(id: number): Promise<IMainFile | undefined> {
	const res: (IMainFile | undefined)[] = await db
		.select()
		.from(files)
		.where(eq(files.id, id))

	return res[0]
}
