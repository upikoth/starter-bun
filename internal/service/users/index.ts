import crypto from 'node:crypto'

import { deleteAllSessionsOfUser } from '@/service/sessions'

import {
	getUsers as getUsersDb,
	getUser as getUserDb,
	createUser as createUserDb,
	updateUser as updateUserDb,
	getUserByEmail as getUserByEmailDb
} from '@/repository/users'

import type {
	IUser,
	IGetUsersRequest,
	ICustomError,
	IGetUserRequest,
	ICreateUserRequest,
	IUpdateUserRequest
} from '@/models'
import { UserStatusEnum } from '@/models'
import { ErrorCodeEnum, ErorrStatusEnum } from '@/constants'

import {
	validateGetUsersRequestData,
	validateGetUserRequestData,
	validateCreateUserRequestData,
	validateUpdateUserRequestData,
	validateGetUserByEmailRequestData
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
	const passwordHash = crypto
		.createHmac('sha512', passwordSalt)
		.update(data.password)
		.digest('hex')

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

	if (data.status === UserStatusEnum.Blocked) {
		deleteAllSessionsOfUser(data.id)
	}

	const dbUser = await updateUserDb(data)

	return {
		id: dbUser.id,
		email: dbUser.email,
		status: dbUser.status
	}
}

export async function getUserByEmail(email: string): Promise<IUser> {
	const validationError = validateGetUserByEmailRequestData({ email })

	if (validationError) {
		throw {
			code: ErrorCodeEnum.ValidationError,
			status: ErorrStatusEnum.BadRequest,
			description: validationError
		} satisfies ICustomError
	}

	const dbUser = await getUserByEmailDb(email)

	return {
		id: dbUser.id,
		email: dbUser.email,
		status: dbUser.status
	}
}
