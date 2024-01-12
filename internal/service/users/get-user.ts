import { ErrorCodeEnum, ErorrStatusEnum } from '@/constants'

import {
	getUserById as getUserByIdDb
} from '@/repository'

import type {
	IUser,
	ICustomError,
	IGetUserRequest
} from '@/models'

import {
	validateGetUserRequestData
} from './validators'

export default async function getUser(data: IGetUserRequest): Promise<IUser> {
	const validationError = validateGetUserRequestData(data)

	if (validationError) {
		throw {
			code: ErrorCodeEnum.ValidationError,
			status: ErorrStatusEnum.BadRequest,
			description: validationError
		} satisfies ICustomError
	}

	const dbUser = await getUserByIdDb(data.id)

	if (!dbUser) {
		throw {
			code: ErrorCodeEnum.EntityNotFound,
			status: ErorrStatusEnum.BadRequest,
			description: 'Пользователь не найден'
		} satisfies ICustomError
	}

	return {
		id: dbUser.id,
		email: dbUser.email,
		status: dbUser.status,
		role: dbUser.role
	}
}
