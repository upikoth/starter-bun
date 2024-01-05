import { eq, sql } from 'drizzle-orm'

import type {
	ICreateSessionRequest,
	IDeleteRegistrationRequest,
	IGetRegistrationsRequest
} from '@/models'

import { db } from '../sqlite'
import { registrations } from '../sqlite/schema'
import type { IDbRegistration } from '../sqlite/schema'

export async function getRegistrations(
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

export async function createRegistration(
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

export async function getRegistrationById(id: number): Promise<IDbRegistration | undefined> {
	const res: (IDbRegistration | undefined)[] = await db
		.select()
		.from(registrations)
		.where(eq(registrations.id, id))

	return res[0]
}

export async function getRegistrationByToken(token: string): Promise<IDbRegistration | undefined> {
	const res: (IDbRegistration | undefined)[] = await db
		.select()
		.from(registrations)
		.where(eq(registrations.activationToken, token))

	return res[0]
}

export async function deleteRegistration(data: IDeleteRegistrationRequest): Promise<void> {
	return db
		.delete(registrations)
		.where(eq(registrations.id, data.id))
}
