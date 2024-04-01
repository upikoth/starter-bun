import { ErrorCodeEnum, ErrorStatusEnum } from '@/constants'

import repository from '@/repository'

import type {
	IRegistration,
	ICustomError,
	IGetRegistrationsRequest
} from '@/models'

import {
	validateGetRegistrationsRequestData
} from './validators'

export default async function getAll(
	data: IGetRegistrationsRequest
): Promise<{ registrations: IRegistration[], total: number }> {
	const validationError = validateGetRegistrationsRequestData(data)

	if (validationError) {
		throw {
			code: ErrorCodeEnum.ValidationError,
			status: ErrorStatusEnum.BadRequest,
			description: validationError
		} satisfies ICustomError
	}

	const dbRegistrationsResult = await repository.main.registrations.getAll(data)

	return {
		...dbRegistrationsResult,
		registrations: dbRegistrationsResult.registrations.map((r) => ({
			id: r.id,
			email: r.email
		}))
	}
}
