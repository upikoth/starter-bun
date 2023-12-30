import crypto from 'node:crypto'

import { getUserByEmail as getUserByEmailDb } from '@/repository/users'
import {
	getSessions as getSessionsDb,
	createSession as createSessionDb,
	deleteSession as deleteSessionDb
} from '@/repository/sessions'

import type {
	IGetSessionsRequest,
	ICreateSessionRequest,
	IDeleteSessionRequest,
	ISession,
	IUser,
	ICustomError
} from '@/models'
import { IGetSessionsResponseSession, UserStatusEnum } from '@/models'

import { ErrorCodeEnum, ErorrStatusEnum } from '@/constants'

import {
	validateGetSessionsRequestData,
	validateCreateSessionRequestData,
	validateDeleteSessionRequestData
} from './validators'

export async function getSessions(
	data: IGetSessionsRequest
): Promise<{ sessions: IGetSessionsResponseSession[], total: number }> {
	const validationError = validateGetSessionsRequestData(data)

	if (validationError) {
		throw {
			code: ErrorCodeEnum.ValidationError,
			status: ErorrStatusEnum.BadRequest,
			description: validationError
		} satisfies ICustomError
	}

	const dbSessions = await getSessionsDb(data)

	return {
		...dbSessions,
		sessions: dbSessions.sessions.map(s => ({
			id: s.id,
			userId: s.userId
		}))
	}
}

export async function createSession(data: ICreateSessionRequest): Promise<{ session: ISession, user: IUser }> {
	const validationError = validateCreateSessionRequestData(data)

	if (validationError) {
		throw {
			code: ErrorCodeEnum.ValidationError,
			status: ErorrStatusEnum.BadRequest,
			description: validationError
		} satisfies ICustomError
	}

	const dbUser = await getUserByEmailDb(data.email)
	const user: IUser = {
		id: dbUser.id,
		email: dbUser.email,
		status: dbUser.status
	}

	const passwordHash = crypto
		.createHmac('sha512', dbUser.passwordSalt)
		.update(data.password)
		.digest('hex')

	if (passwordHash !== dbUser.passwordHash) {
		throw {
			code: ErrorCodeEnum.EmailOrPasswordInvalid,
			status: ErorrStatusEnum.BadRequest,
			description: 'Email или пароль указаны неверно'
		} satisfies ICustomError
	}

	if (user.status !== UserStatusEnum.Active) {
		throw {
			code: ErrorCodeEnum.UserBlocked,
			status: ErorrStatusEnum.BadRequest,
			description: 'Пользователь заблокирован'
		} satisfies ICustomError
	}

	const sessionValue = crypto.randomBytes(32).toString('hex')

	const dbSession = await createSessionDb({
		userId: user.id,
		session: sessionValue
	})

	return {
		user,
		session: dbSession
	}
}

export async function deleteSession(data: IDeleteSessionRequest): Promise<void> {
	const validationError = validateDeleteSessionRequestData(data)

	if (validationError) {
		throw {
			code: ErrorCodeEnum.ValidationError,
			status: ErorrStatusEnum.BadRequest,
			description: validationError
		} satisfies ICustomError
	}

	return deleteSessionDb(data)
}
