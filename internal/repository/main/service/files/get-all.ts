import { eq, sql } from 'drizzle-orm'

import { db } from '../../sqlite'
import { files } from '../../sqlite/schema'
import type { IDbFile } from '../../sqlite/schema'
import type {
	IMainGetFilesRequest,
	IMainGetFilesResponse
} from '../../models'

export default async function getAll(
	data: IMainGetFilesRequest
): Promise<IMainGetFilesResponse> {
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
