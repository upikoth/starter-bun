import { ErrorCodeEnum, ErorrStatusEnum } from '@/constants'

import {
	getSessionById as getSessionByIdDb
} from '@/repository'

import type {
	ISession,
	ICustomError
} from '@/models'

import {
	validateGetSessionByIdRequestData
} from './validators'

export default async function getSessionById(id: number): Promise<ISession> {
	const validationError = validateGetSessionByIdRequestData({ id })

	if (validationError) {
		throw {
			code: ErrorCodeEnum.ValidationError,
			status: ErorrStatusEnum.BadRequest,
			description: validationError
		} satisfies ICustomError
	}

	const session = await getSessionByIdDb(id)

	if (!session) {
		throw {
			code: ErrorCodeEnum.EntityNotFound,
			status: ErorrStatusEnum.NotFound,
			description: 'Сессия не найдена'
		} satisfies ICustomError
	}

	return session
}