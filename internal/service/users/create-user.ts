import crypto from 'node:crypto'

import { ErrorCodeEnum, ErorrStatusEnum } from '@/constants'

import repository from '@/repository'

import type {
	IUser,
	ICustomError,
	ICreateUserRequest
} from '@/models'
import { UserRoleEnum } from '@/models'

import {
	validateCreateUserRequestData
} from './validators'

export default async function createUser(data: ICreateUserRequest): Promise<IUser> {
	const validationError = validateCreateUserRequestData(data)

	if (validationError) {
		throw {
			code: ErrorCodeEnum.ValidationError,
			status: ErorrStatusEnum.BadRequest,
			description: validationError
		} satisfies ICustomError
	}

	const userWithThisEmail = await repository.main.users.getByEmail(data.email)

	if (userWithThisEmail) {
		throw {
			code: ErrorCodeEnum.UserWithThisEmailAlreadyExist,
			status: ErorrStatusEnum.BadRequest,
			description: 'Пользователь с таким email уже существует'
		} satisfies ICustomError
	}

	const passwordSalt = crypto.randomBytes(16).toString('hex')
	const passwordHash = crypto
		.createHmac('sha512', passwordSalt)
		.update(data.password)
		.digest('hex')

	const dbUser = await repository.main.users.create({
		passwordHash,
		passwordSalt,
		email: data.email,
		role: UserRoleEnum.User
	})

	return {
		id: dbUser.id,
		email: dbUser.email,
		role: dbUser.role,
		status: dbUser.status
	}
}
