import crypto from 'node:crypto'

import { getUserByEmail as getUserByEmailDb } from '@internal/repository/users'
import { createSession as createSessionDb } from '@internal/repository/sessions'

import type {
	ICreateSessionRequest,
	ISession,
	IUser,
	ICustomError
} from '@internal/models'
import { UserStatusEnum } from '@internal/models'

import { ErrorCodeEnum, ErorrStatusEnum } from '@internal/constants'

import { validateCreateSessionRequestData } from './validators'

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
