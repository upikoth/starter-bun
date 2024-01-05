import { ErrorCodeEnum, ErorrStatusEnum } from '@/constants'

import {
	getRegistrations as getRegistrationsDb
} from '@/repository'

import type {
	IRegistration,
	ICustomError,
	IGetRegistrationsRequest
} from '@/models'

import {
	validateGetRegistrationsRequestData
} from './validators'

export default async function getRegistrations(
	data: IGetRegistrationsRequest
): Promise<{ registrations: IRegistration[], total: number }> {
	const validationError = validateGetRegistrationsRequestData(data)

	if (validationError) {
		throw {
			code: ErrorCodeEnum.ValidationError,
			status: ErorrStatusEnum.BadRequest,
			description: validationError
		} satisfies ICustomError
	}

	const dbRegistrationsResult = await getRegistrationsDb(data)

	return {
		...dbRegistrationsResult,
		registrations: dbRegistrationsResult.registrations.map((r) => ({
			id: r.id,
			email: r.email
		}))
	}
}
