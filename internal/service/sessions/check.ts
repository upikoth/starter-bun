import { ErrorCodeEnum, ErrorStatusEnum } from '@/constants'

import service from '@/service'

import repository from '@/repository'

import type {
	ISession,
	IUser,
	ICustomError
} from '@/models'

import {
	validateCheckSessionRequestData
} from './validators'

export default async function check(sessionValue: string): Promise<{ user: IUser, session: ISession }> {
	const validationError = validateCheckSessionRequestData({ session: sessionValue })

	if (validationError) {
		throw {
			code: ErrorCodeEnum.ValidationError,
			status: ErrorStatusEnum.BadRequest,
			description: validationError
		} satisfies ICustomError
	}

	const session = await repository.main.sessions.getBySession(sessionValue)

	if (!session) {
		throw {
			code: ErrorCodeEnum.Unauthorized,
			status: ErrorStatusEnum.Unauthorized,
			description: 'Пользователь не авторизован'
		} satisfies ICustomError
	}

	const user = await service.users.getById(session.userId)

	return {
		user,
		session
	}
}
