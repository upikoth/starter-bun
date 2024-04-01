import { ErrorCodeEnum, ErrorStatusEnum } from '@/constants'

import repository from '@/repository'

import type {
	ICustomError,
	IConfirmRegistrationRequest,
	IUser
} from '@/models'
import { UserRoleEnum } from '@/models'

import {
	validateConfirmRegistrationRequestData
} from './validators'

export default async function confirm(data: IConfirmRegistrationRequest): Promise<IUser> {
	const validationError = validateConfirmRegistrationRequestData(data)

	if (validationError) {
		throw {
			code: ErrorCodeEnum.ValidationError,
			status: ErrorStatusEnum.BadRequest,
			description: validationError
		} satisfies ICustomError
	}

	const registration = await repository.main.registrations.getByToken(data.token)

	if (!registration) {
		throw {
			code: ErrorCodeEnum.EntityNotFound,
			status: ErrorStatusEnum.BadRequest,
			description: 'Регистрация не найдена'
		} satisfies ICustomError
	}

	const userWithThisEmail = await repository.main.users.getByEmail(registration.email)

	if (userWithThisEmail) {
		throw {
			code: ErrorCodeEnum.UserWithThisEmailAlreadyExist,
			status: ErrorStatusEnum.BadRequest,
			description: 'Пользователь с таким email уже существует'
		} satisfies ICustomError
	}

	const dbUser = await repository.main.users.create({
		email: registration.email,
		role:	UserRoleEnum.User,
		passwordHash: registration.passwordHash,
		passwordSalt: registration.passwordSalt
	})

	await repository.main.registrations.deleteById(registration.id)

	return {
		id: dbUser.id,
		email: dbUser.email,
		role: dbUser.role,
		status: dbUser.status
	}
}
