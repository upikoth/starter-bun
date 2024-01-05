import { ErrorCodeEnum, ErorrStatusEnum } from '@/constants'

import {
	getUsers as getUsersDb
} from '@/repository'

import type {
	IUser,
	IGetUsersRequest,
	ICustomError
} from '@/models'

import {
	validateGetUsersRequestData
} from './validators'

export default async function getUsers(data: IGetUsersRequest): Promise<{ users: IUser[], total: number }> {
	const validationError = validateGetUsersRequestData(data)

	if (validationError) {
		throw {
			code: ErrorCodeEnum.ValidationError,
			status: ErorrStatusEnum.BadRequest,
			description: validationError
		} satisfies ICustomError
	}

	const dbUsers = await getUsersDb(data)

	return {
		...dbUsers,
		users: dbUsers.users.map((user) => ({
			id: user.id,
			email: user.email,
			status: user.status
		}))
	}
}
