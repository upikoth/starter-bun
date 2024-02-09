import { eq } from 'drizzle-orm'

import type {
	IDeleteFileRequest
} from '@/models'

import { db } from '../sqlite'
import { files } from '../sqlite/schema'

export default async function deleteById(data: IDeleteFileRequest): Promise<void> {
	return db
		.delete(files)
		.where(eq(files.id, data.id))
}
