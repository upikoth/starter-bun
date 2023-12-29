import type {
	ICreateSessionRequest,
	ISession,
	ICustomError
} from '@internal/models'

import { ErrorCodeEnum, ErorrStatusEnum } from '@internal/constants'

import { validateCreateSessionRequestData } from './validators'

export async function createSession(data: ICreateSessionRequest): Promise<ISession> {
	const validationError = validateCreateSessionRequestData(data)

	if (validationError) {
		throw {
			code: ErrorCodeEnum.ValidationError,
			status: ErorrStatusEnum.BadRequest,
			description: validationError
		} satisfies ICustomError
	}

	return {
		id: 1,
		userId: 1,
		session: '123'
	}
}
