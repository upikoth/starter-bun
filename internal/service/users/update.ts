import { ErrorCodeEnum, ErrorStatusEnum } from '@/constants'

import service from '@/service'

import repository from '@/repository'

import type {
	IUser,
	ICustomError,
	IUpdateUserRequest
} from '@/models'
import { UserRoleEnum, UserStatusEnum } from '@/models'

import {
	validateUpdateUserRequestData
} from './validators'

export default async function update(data: IUpdateUserRequest): Promise<IUser> {
	const validationError = validateUpdateUserRequestData(data)

	if (validationError) {
		throw {
			code: ErrorCodeEnum.ValidationError,
			status: ErrorStatusEnum.BadRequest,
			description: validationError
		} satisfies ICustomError
	}

	if (data.role === UserRoleEnum.SuperAdmin) {
		throw {
			code: ErrorCodeEnum.Forbidden,
			status: ErrorStatusEnum.Forbidden,
			description: 'Недостаточно прав'
		} satisfies ICustomError
	}

	if (data.status === UserStatusEnum.Blocked) {
		service.sessions.deleteByUserId(data.id)
	}

	const dbUser = await repository.main.users.update(data)

	return {
		id: dbUser.id,
		email: dbUser.email,
		role: dbUser.role,
		status: dbUser.status
	}
}
