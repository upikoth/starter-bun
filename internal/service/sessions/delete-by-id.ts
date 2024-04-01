import { ErrorCodeEnum, ErrorStatusEnum } from '@/constants'

import repository from '@/repository'

import type {
	ICustomError
} from '@/models'

import {
	validateDeleteSessionRequestData
} from './validators'

export default async function deleteById(id: number): Promise<void> {
	const validationError = validateDeleteSessionRequestData({ id })

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

	return repository.main.sessions.deleteById(id)
}
