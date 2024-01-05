import { ErrorCodeEnum, ErorrStatusEnum } from '@/constants'

import {
	deleteRegistration as deleteRegistrationDb,
	getRegistrationById as getRegistrationByIdDb
} from '@/repository'

import type {
	ICustomError,
	IDeleteRegistrationRequest
} from '@/models'

import {
	validateDeleteRegistrationRequestData
} from './validators'

export default async function deleteRegistration(data: IDeleteRegistrationRequest): Promise<void> {
	const validationError = validateDeleteRegistrationRequestData(data)

	if (validationError) {
		throw {
			code: ErrorCodeEnum.ValidationError,
			status: ErorrStatusEnum.BadRequest,
			description: validationError
		} satisfies ICustomError
	}

	const registration = await getRegistrationByIdDb(data.id)

	if (!registration) {
		throw {
			code: ErrorCodeEnum.EntityNotFound,
			status: ErorrStatusEnum.BadRequest,
			description: 'Регистрация не найдена'
		} satisfies ICustomError
	}

	return deleteRegistrationDb(data)
}
