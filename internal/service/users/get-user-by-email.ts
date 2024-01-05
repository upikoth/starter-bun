import { ErrorCodeEnum, ErorrStatusEnum } from '@/constants'

import {
	getUserByEmail as getUserByEmailDb
} from '@/repository'

import type {
	IUser,
	ICustomError
} from '@/models'

import {
	validateGetUserByEmailRequestData
} from './validators'

export default async function getUserByEmail(email: string): Promise<IUser | undefined> {
	const validationError = validateGetUserByEmailRequestData({ email })

	if (validationError) {
		throw {
			code: ErrorCodeEnum.ValidationError,
			status: ErorrStatusEnum.BadRequest,
			description: validationError
		} satisfies ICustomError
	}

	const dbUser = await getUserByEmailDb(email)

	return dbUser ? {
		id: dbUser.id,
		email: dbUser.email,
		status: dbUser.status
	} : undefined
}
