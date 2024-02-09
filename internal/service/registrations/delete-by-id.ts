import { ErrorCodeEnum, ErorrStatusEnum } from '@/constants'

import repository from '@/repository'

import type {
	ICustomError
} from '@/models'

import {
	validateDeleteRegistrationRequestData
} from './validators'

export default async function deleteById(id: number): Promise<void> {
	const validationError = validateDeleteRegistrationRequestData({ id })

	if (validationError) {
		throw {
			code: ErrorCodeEnum.ValidationError,
			status: ErorrStatusEnum.BadRequest,
			description: validationError
		} satisfies ICustomError
	}

	const registration = await repository.main.registrations.getById(id)

	if (!registration) {
		throw {
			code: ErrorCodeEnum.EntityNotFound,
			status: ErorrStatusEnum.BadRequest,
			description: 'Регистрация не найдена'
		} satisfies ICustomError
	}

	return repository.main.registrations.deleteById(id)
}
