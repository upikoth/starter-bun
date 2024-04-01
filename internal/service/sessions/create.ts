import crypto from 'node:crypto'

import { ErrorCodeEnum, ErrorStatusEnum } from '@/constants'

import repository from '@/repository'

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

export default async function create(data: ICreateSessionRequest): Promise<{ session: ISession, user: IUser }> {
	const validationError = validateCreateSessionRequestData(data)

	if (validationError) {
		throw {
			code: ErrorCodeEnum.ValidationError,
			status: ErrorStatusEnum.BadRequest,
			description: validationError
		} satisfies ICustomError
	}

	const dbUser = await repository.main.users.getByEmail(data.email)

	if (!dbUser) {
		throw {
			code: ErrorCodeEnum.EmailOrPasswordInvalid,
			status: ErrorStatusEnum.BadRequest,
			description: 'Email или пароль указаны неверно'
		} satisfies ICustomError
	}

	const user: IUser = {
		id: dbUser.id,
		email: dbUser.email,
		status: dbUser.status,
		role: dbUser.role
	}

	const passwordHash = crypto
		.createHmac('sha512', dbUser.passwordSalt)
		.update(data.password)
		.digest('hex')

	if (passwordHash !== dbUser.passwordHash) {
		throw {
			code: ErrorCodeEnum.EmailOrPasswordInvalid,
			status: ErrorStatusEnum.BadRequest,
			description: 'Email или пароль указаны неверно'
		} satisfies ICustomError
	}

	if (user.status !== UserStatusEnum.Active) {
		throw {
			code: ErrorCodeEnum.UserBlocked,
			status: ErrorStatusEnum.BadRequest,
			description: 'Пользователь заблокирован'
		} satisfies ICustomError
	}

	const sessionValue = crypto.randomBytes(32).toString('hex')

	const session = await repository.main.sessions.getBySession(sessionValue)

	if (session) {
		throw {
			code: ErrorCodeEnum.SessionAlreadyExist,
			status: ErrorStatusEnum.BadRequest,
			description: 'Такая сессия уже существует'
		} satisfies ICustomError
	}

	const dbSession = await repository.main.sessions.create({
		userId: user.id,
		session: sessionValue
	})

	return {
		user,
		session: dbSession
	}
}
