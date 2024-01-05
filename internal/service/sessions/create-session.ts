import crypto from 'node:crypto'

import { ErrorCodeEnum, ErorrStatusEnum } from '@/constants'

import {
	createSession as createSessionDb,
	getSessionBySession as getSessionBySessionDb,
	getUserByEmail as getUserByEmailDb
} from '@/repository'

import type {
	ICreateSessionRequest,
	ISession,
	IUser,
	ICustomError
} from '@/models'
import { UserStatusEnum } from '@/models'

import {
	validateCreateSessionRequestData
} from './validators'

export default async function createSession(data: ICreateSessionRequest): Promise<{ session: ISession, user: IUser }> {
	const validationError = validateCreateSessionRequestData(data)

	if (validationError) {
		throw {
			code: ErrorCodeEnum.ValidationError,
			status: ErorrStatusEnum.BadRequest,
			description: validationError
		} satisfies ICustomError
	}

	const dbUser = await getUserByEmailDb(data.email)

	if (!dbUser) {
		throw {
			code: ErrorCodeEnum.EmailOrPasswordInvalid,
			status: ErorrStatusEnum.BadRequest,
			description: 'Email или пароль указаны неверно'
		} satisfies ICustomError
	}

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

	const session = await getSessionBySessionDb(sessionValue)

	if (session) {
		throw {
			code: ErrorCodeEnum.SessionAlreadyExist,
			status: ErorrStatusEnum.BadRequest,
			description: 'Такая сессия уже существует'
		} satisfies ICustomError
	}

	const dbSession = await createSessionDb({
		userId: user.id,
		session: sessionValue
	})

	return {
		user,
		session: dbSession
	}
}
