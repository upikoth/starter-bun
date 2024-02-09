import { eq } from 'drizzle-orm'

import type {
	IDeleteRegistrationRequest
} from '@/models'

import { db } from '../sqlite'
import { registrations } from '../sqlite/schema'

export default async function deleteById(data: IDeleteRegistrationRequest): Promise<void> {
	return db
		.delete(registrations)
		.where(eq(registrations.id, data.id))
}
