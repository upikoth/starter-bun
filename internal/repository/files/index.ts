import { IFile } from '@/models'

import { db } from '../sqlite'
import { files } from '../sqlite/schema'

export async function createFile(
	data: Omit<IFile, 'id'>
): Promise<IFile> {
	const res: IFile[] = await db
		.insert(files)
		.values(data)
		.returning()

	return res[0]
}
