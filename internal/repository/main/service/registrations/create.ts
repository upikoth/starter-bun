import { eq } from 'drizzle-orm'

import { db } from '../../sqlite'
import { registrations } from '../../sqlite/schema'
import type {
	IMainCreateRegistrationRequest,
	IMainRegistration
} from '../../models'

export default async function create(
	data: IMainCreateRegistrationRequest
): Promise<IMainRegistration> {
	await db
		.delete(registrations)
		.where(eq(registrations.email, data.email))

	const res: IMainRegistration[] = await db
		.insert(registrations)
		.values(data)
		.returning()

	return res[0]
}
