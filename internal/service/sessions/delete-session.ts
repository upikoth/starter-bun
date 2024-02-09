import { ErrorCodeEnum, ErorrStatusEnum } from '@/constants'

import repository from '@/repository'

import type {
	IDeleteSessionRequest,
	ICustomError
} from '@/models'

import {
	validateDeleteSessionRequestData
} from './validators'

export default async function deleteSession(data: IDeleteSessionRequest): Promise<void> {
	const validationError = validateDeleteSessionRequestData(data)

	if (validationError) {
		throw {
			code: ErrorCodeEnum.ValidationError,
			status: ErorrStatusEnum.BadRequest,
			description: validationError
		} satisfies ICustomError
	}

	const session = await repository.main.sessions.getById(data.id)

	if (!session) {
		throw {
			code: ErrorCodeEnum.EntityNotFound,
			status: ErorrStatusEnum.BadRequest,
			description: 'Сессия не найдена'
		} satisfies ICustomError
	}

	return repository.main.sessions.deleteById(data.id)
}
