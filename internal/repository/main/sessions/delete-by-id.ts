import { eq } from 'drizzle-orm'

import type {
	IDeleteSessionRequest
} from '@/models'

import { db } from '../sqlite'
import { sessions } from '../sqlite/schema'

export default async function deleteById(data: IDeleteSessionRequest): Promise<void> {
	return db
		.delete(sessions)
		.where(eq(sessions.id, data.id))
}
