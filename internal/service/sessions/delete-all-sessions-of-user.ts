import { ErrorCodeEnum, ErorrStatusEnum } from '@/constants'

import repository from '@/repository'

import type {
	ICustomError
} from '@/models'

import {
	validateDeleteAllSessionsOfUserRequestData
} from './validators'

export default async function deleteAllSessionsOfUser(userId: number): Promise<void> {
	const validationError = validateDeleteAllSessionsOfUserRequestData({ userId })

	if (validationError) {
		throw {
			code: ErrorCodeEnum.ValidationError,
			status: ErorrStatusEnum.BadRequest,
			description: validationError
		} satisfies ICustomError
	}

	return repository.main.sessions.deleteByUserId(userId)
}
