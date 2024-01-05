import { eq, sql } from 'drizzle-orm'

import type {
	ICreateSessionRequest,
	ICustomError,
	IDeleteRegistrationRequest,
	IGetRegistrationsRequest
} from '@/models'
import { ErrorCodeEnum, ErorrStatusEnum } from '@/constants'

import { db } from '../sqlite'
import { registrations, users } from '../sqlite/schema'
import type { IDbRegistration } from '../sqlite/schema'

export async function getRegistrations(
	data: IGetRegistrationsRequest
): Promise<{ registrations: IDbRegistration[], total: number}> {
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
	const isUserWithThisEmailAlreadyExist = (await db
		.select()
		.from(users)
		.where(eq(users.email, data.email))).length > 0

	if (isUserWithThisEmailAlreadyExist) {
		throw {
			code: ErrorCodeEnum.UserWithThisEmailAlreadyExist,
			status: ErorrStatusEnum.BadRequest,
			description: 'Пользователь с таким email уже существует'
		} satisfies ICustomError
	}

	await db
		.delete(registrations)
		.where(eq(registrations.email, data.email))

	const res: IDbRegistration[] = await db.
		insert(registrations)
		.values(data)
		.returning()

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
	const res: IDbRegistration[] | [] = await db
		.select()
		.from(registrations)
		.where(eq(registrations.id, data.id))

	const registration: IDbRegistration | undefined = res[0]

	if (!registration) {
		throw {
			code: ErrorCodeEnum.EntityNotFound,
			status: ErorrStatusEnum.BadRequest,
			description: 'Регистрация не найдена'
		} satisfies ICustomError
	}

	return db
		.delete(registrations)
		.where(eq(registrations.id, data.id))
}
