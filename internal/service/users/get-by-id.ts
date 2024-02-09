import { ErrorCodeEnum, ErorrStatusEnum } from '@/constants'

import repository from '@/repository'

import type {
	IUser,
	ICustomError
} from '@/models'

import {
	validateGetUserRequestData
} from './validators'

export default async function getById(id: number): Promise<IUser> {
	const validationError = validateGetUserRequestData({ id })

	if (validationError) {
		throw {
			code: ErrorCodeEnum.ValidationError,
			status: ErorrStatusEnum.BadRequest,
			description: validationError
		} satisfies ICustomError
	}

	const dbUser = await repository.main.users.getById(id)

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
