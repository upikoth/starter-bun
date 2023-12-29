import crypto from 'node:crypto'

import {
	getUsers as getUsersDb,
	getUser as getUserDb,
	createUser as createUserDb,
	updateUser as updateUserDb
} from '@internal/repository/users'

import type {
	IUser,
	IGetUsersRequest,
	ICustomError,
	IGetUserRequest,
	ICreateUserRequest,
	IUpdateUserRequest
} from '@internal/models'
import { ErrorCodeEnum, ErorrStatusEnum } from '@internal/constants'

import {
	validateGetUsersRequestData,
	validateGetUserRequestData,
	validateCreateUserRequestData,
	validateUpdateUserRequestData
} from './validators'

export async function getUsers(data: IGetUsersRequest): Promise<{ users: IUser[], total: number }> {
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
		users: dbUsers.users.map(user => ({
			id: user.id,
			email: user.email,
			status: user.status
		}))
	}
}

export async function getUser(data: IGetUserRequest): Promise<IUser> {
	const validationError = validateGetUserRequestData(data)

	if (validationError) {
		throw {
			code: ErrorCodeEnum.ValidationError,
			status: ErorrStatusEnum.BadRequest,
			description: validationError
		} satisfies ICustomError
	}

	const dbUser = await getUserDb(data)

	return {
		id: dbUser.id,
		email: dbUser.email,
		status: dbUser.status
	}
}

export async function createUser(data: ICreateUserRequest): Promise<IUser> {
	const validationError = validateCreateUserRequestData(data)

	if (validationError) {
		throw {
			code: ErrorCodeEnum.ValidationError,
			status: ErorrStatusEnum.BadRequest,
			description: validationError
		} satisfies ICustomError
	}

	const passwordSalt = crypto.randomBytes(16).toString('hex')
	const hash = crypto.createHmac('sha512', passwordSalt)
	hash.update(data.password)

	const passwordHash = hash.digest('hex')

	const dbUser = await createUserDb({
		...data,
		passwordHash,
		passwordSalt
	})

	return {
		id: dbUser.id,
		email: dbUser.email,
		status: dbUser.status
	}
}

export async function updateUser(data: IUpdateUserRequest): Promise<IUser> {
	const validationError = validateUpdateUserRequestData(data)

	if (validationError) {
		throw {
			code: ErrorCodeEnum.ValidationError,
			status: ErorrStatusEnum.BadRequest,
			description: validationError
		} satisfies ICustomError
	}
	const dbUser = await updateUserDb(data)

	return {
		id: dbUser.id,
		email: dbUser.email,
		status: dbUser.status
	}
}
