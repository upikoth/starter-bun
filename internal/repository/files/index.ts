import { eq, sql } from 'drizzle-orm'

import type {
	IFile,
	IGetFilesRequest,
	IDeleteFileRequest
} from '@/models'

import { db } from '../sqlite'
import { files } from '../sqlite/schema'
import type { IDbFile } from '../sqlite/schema'

export async function getFiles(
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

export async function getFileById(id: number): Promise<IDbFile | undefined> {
	const res: (IDbFile | undefined)[] = await db
		.select()
		.from(files)
		.where(eq(files.id, id))

	return res[0]
}

export async function createFile(
	data: Omit<IFile, 'id'>
): Promise<IFile> {
	const res: IFile[] = await db
		.insert(files)
		.values(data)
		.returning()

	return res[0]
}

export async function deleteFile(data: IDeleteFileRequest): Promise<void> {
	return db
		.delete(files)
		.where(eq(files.id, data.id))
}
