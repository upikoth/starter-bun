import { sql } from 'drizzle-orm'

import { db } from '../../sqlite'
import { registrations } from '../../sqlite/schema'
import type {
	IMainRegistration,
	IMainGetRegistrationsRequest,
	IMainGetRegistrationsResponse
} from '../../models'

export default async function getAll(
	data: IMainGetRegistrationsRequest
): Promise<IMainGetRegistrationsResponse> {
	const dbRegistrations: IMainRegistration[] = await db
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
