import { ErrorCodeEnum, ErorrStatusEnum } from '@/constants'

import {
	getRegistrationByToken as getRegistrationByTokenDb,
	deleteRegistration as deleteRegistrationDb,
	createUser as createUserDb,
	getUserByEmail as getUserByEmailDb
} from '@/repository'

import type {
	ICustomError,
	IConfirmRegistrationRequest,
	IUser
} from '@/models'

import {
	validateConfirmRegistrationRequestData
} from './validators'

export default async function confirmRegistration(data: IConfirmRegistrationRequest): Promise<IUser> {
	const validationError = validateConfirmRegistrationRequestData(data)

	if (validationError) {
		throw {
			code: ErrorCodeEnum.ValidationError,
			status: ErorrStatusEnum.BadRequest,
			description: validationError
		} satisfies ICustomError
	}

	const registration = await getRegistrationByTokenDb(data.token)

	if (!registration) {
		throw {
			code: ErrorCodeEnum.EntityNotFound,
			status: ErorrStatusEnum.BadRequest,
			description: 'Регистрация не найдена'
		} satisfies ICustomError
	}

	const userWithThisEmail = await getUserByEmailDb(registration.email)

	if (userWithThisEmail) {
		throw {
			code: ErrorCodeEnum.UserWithThisEmailAlreadyExist,
			status: ErorrStatusEnum.BadRequest,
			description: 'Пользователь с таким email уже существует'
		} satisfies ICustomError
	}

	const dbUser = await createUserDb({
		email: registration.email,
		passwordHash: registration.passwordHash,
		passwordSalt: registration.passwordSalt
	})

	await deleteRegistrationDb({ id: registration.id })

	return {
		id: dbUser.id,
		email: dbUser.email,
		status: dbUser.status
	}
}
