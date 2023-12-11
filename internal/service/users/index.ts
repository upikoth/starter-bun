import { getUsers as getUsersDb } from '@internal/repository/users'

import type { IUser, IGetUsersRequest, ICustomError } from '@internal/models'
import { ErrorCodeEnum, ErorrStatusEnum } from '@internal/constants'

import { validateUsersRequestData } from './validators'

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
