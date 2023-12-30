import crypto from 'node:crypto'

import { getUserByEmail as getUserByEmailDb } from '@/repository/users'
import {
	createSession as createSessionDb,
	getSessions as getSessionsDb
} from '@/repository/sessions'

import type {
	IGetSessionsRequest,
	ICreateSessionRequest,
	ISession,
	IUser,
	ICustomError
} from '@/models'
import { IGetSessionsResponseSession, UserStatusEnum } from '@/models'

import { ErrorCodeEnum, ErorrStatusEnum } from '@/constants'

import {
	validateGetSessionsRequestData,
	validateCreateSessionRequestData
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
