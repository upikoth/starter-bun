import { ErrorCodeEnum, ErrorStatusEnum } from '@/constants'

import repository from '@/repository'

import type {
	IUser,
	IGetUsersRequest,
	ICustomError
} from '@/models'

import {
	validateGetUsersRequestData
} from './validators'

export default async function getAll(data: IGetUsersRequest): Promise<{ users: IUser[], total: number }> {
	const validationError = validateGetUsersRequestData(data)

	if (validationError) {
		throw {
			code: ErrorCodeEnum.ValidationError,
			status: ErrorStatusEnum.BadRequest,
			description: validationError
		} satisfies ICustomError
	}

	const dbUsers = await repository.main.users.getAll(data)

	return {
		...dbUsers,
		users: dbUsers.users.map((user) => ({
			id: user.id,
			email: user.email,
			status: user.status,
			role: user.role
		}))
	}
}
