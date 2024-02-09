import { sql } from 'drizzle-orm'

import type {
	IGetRegistrationsRequest
} from '@/models'

import { db } from '../sqlite'
import { registrations } from '../sqlite/schema'
import type { IDbRegistration } from '../sqlite/schema'

export default async function getAll(
	data: IGetRegistrationsRequest
): Promise<{ registrations: IDbRegistration[], total: number }> {
	const dbRegistrations: IDbRegistration[] = await db
		.select()
		.from(registrations)
		.limit(data.limit)
		.offset(data.offset)

	const { total }: { total: number } = (await db
		.select({ total: sql<number>`count(${registrations.id})` })
		.from(registrations)
	)[0]

	return {
		registrations: dbRegistrations,
		total
	}
}
