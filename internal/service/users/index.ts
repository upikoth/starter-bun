import { getUsers as getUsersDb, getUser as getUserDb, createUser as createUserDb } from '@internal/repository/users'

import type { IUser, IGetUsersRequest, ICustomError, IGetUserRequest, ICreateUserRequest } from '@internal/models'
import { ErrorCodeEnum, ErorrStatusEnum } from '@internal/constants'

import { validateGetUsersRequestData, validateGetUserRequestData, validateCreateUserRequestData } from './validators'

export function getUsers(data: IGetUsersRequest): Promise<IUser[]> {
	const validationError = validateGetUsersRequestData(data)

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
	const validationError = validateGetUserRequestData(data)

	if (validationError) {
		throw {
			code: ErrorCodeEnum.ValidationError,
			status: ErorrStatusEnum.BadRequest,
			description: validationError
		} satisfies ICustomError
	}

	return getUserDb(data)
}

export function createUser(data: ICreateUserRequest): Promise<IUser> {
	const validationError = validateCreateUserRequestData(data)

	if (validationError) {
		throw {
			code: ErrorCodeEnum.ValidationError,
			status: ErorrStatusEnum.BadRequest,
			description: validationError
		} satisfies ICustomError
	}

	return createUserDb(data)
}
