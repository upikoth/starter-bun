import { getUsers as getUsersDb, getUser as getUserDb } from '@internal/repository/users'

import type { IUser, IGetUsersRequest, ICustomError, IGetUserRequest } from '@internal/models'
import { ErrorCodeEnum, ErorrStatusEnum } from '@internal/constants'

import { validateUsersRequestData, validateUserRequestData } from './validators'

export function getUsers(data: IGetUsersRequest): Promise<IUser[]> {
	const validationError = validateUsersRequestData(data)

	if (validationError) {
		throw {
			code: ErrorCodeEnum.ValidationError,
			status: ErorrStatusEnum.BadRequest,
			description: validationError
		} satisfies ICustomError
	}

	return getUsersDb(data)
}

export function getUser(data: IGetUserRequest): Promise<IUser> {
	const validationError = validateUserRequestData(data)

	if (validationError) {
		throw {
			code: ErrorCodeEnum.ValidationError,
			status: ErorrStatusEnum.BadRequest,
			description: validationError
		} satisfies ICustomError
	}

	return getUserDb(data)
}
