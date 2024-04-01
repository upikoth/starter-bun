import { ErrorCodeEnum, ErrorStatusEnum } from '@/constants'

import repository from '@/repository'

import type {
	ISession,
	ICustomError
} from '@/models'

import {
	validateGetSessionByIdRequestData
} from './validators'

export default async function getById(id: number): Promise<ISession> {
	const validationError = validateGetSessionByIdRequestData({ id })

	if (validationError) {
		throw {
			code: ErrorCodeEnum.ValidationError,
			status: ErrorStatusEnum.BadRequest,
			description: validationError
		} satisfies ICustomError
	}

	const session = await repository.main.sessions.getById(id)

	if (!session) {
		throw {
			code: ErrorCodeEnum.EntityNotFound,
			status: ErrorStatusEnum.BadRequest,
			description: 'Сессия не найдена'
		} satisfies ICustomError
	}

	return session
}
