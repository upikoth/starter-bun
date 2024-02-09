import { eq, sql } from 'drizzle-orm'

import type {
	IGetFilesRequest
} from '@/models'

import { db } from '../sqlite'
import { files } from '../sqlite/schema'
import type { IDbFile } from '../sqlite/schema'

export default async function getAll(
	data: IGetFilesRequest
): Promise<{ files: IDbFile[], total: number }> {
	const dbFiles: IDbFile[] = await db
		.select()
		.from(files)
		.where(eq(files.uploadedByUserId, data.uploadedByUserId || files.uploadedByUserId))
		.limit(data.limit)
		.offset(data.offset)

	const { total }: { total: number } = (await db
		.select({ total: sql<number>`count(${files.id})` })
		.from(files)
		.where(eq(files.uploadedByUserId, data.uploadedByUserId || files.uploadedByUserId))
	)[0]

	return {
		files: dbFiles,
		total
	}
}
