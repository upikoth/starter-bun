import { eq } from 'drizzle-orm'

import type {
	ICreateSessionRequest
} from '@/models'

import { db } from '../sqlite'
import { registrations } from '../sqlite/schema'
import type { IDbRegistration } from '../sqlite/schema'

export default async function create(
	data: ICreateSessionRequest & {
		passwordHash: string,
		passwordSalt: string,
		activationToken: string
	}
): Promise<IDbRegistration> {
	await db
		.delete(registrations)
		.where(eq(registrations.email, data.email))

	const res: IDbRegistration[] = await db
		.insert(registrations)
		.values(data)
		.returning()

	return res[0]
}
