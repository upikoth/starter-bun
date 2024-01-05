import { ErrorCodeEnum, ErorrStatusEnum } from '@/constants'

import {
	getUser as getUserFromService
} from '@/service'

import {
	getSessionBySession as getSessionBySessionDb
} from '@/repository'

import type {
	ISession,
	IUser,
	ICustomError
} from '@/models'

import {
	validateCheckSessionRequestData
} from './validators'

export default async function checkSession(sessionValue: string): Promise<{ user: IUser, session: ISession }> {
	const validationError = validateCheckSessionRequestData({ session: sessionValue })

	if (validationError) {
		throw {
			code: ErrorCodeEnum.ValidationError,
			status: ErorrStatusEnum.BadRequest,
			description: validationError
		} satisfies ICustomError
	}

	const session = await getSessionBySessionDb(sessionValue)

	if (!session) {
		throw {
			code: ErrorCodeEnum.Unauthorized,
			status: ErorrStatusEnum.Unauthorized,
			description: 'Пользователь не авторизован'
		} satisfies ICustomError
	}

	const user = await getUserFromService({ id: session.userId })

	return {
		user,
		session
	}
}
