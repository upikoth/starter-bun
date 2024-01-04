import crypto from 'node:crypto'

import {
	getRegistrations as getRegistrationsDb,
	createRegistration as createRegistrationDb,
	getRegistrationByToken as getRegistrationByTokenDb,
	deleteRegistration as deleteRegistrationDb
} from '@/repository/registrations'

import { createUser as createUserDb } from '@/repository/users'

import environment from '@/environment'
import { ErrorCodeEnum, ErorrStatusEnum } from '@/constants'
import { sendMail } from '@/utils'
import type {
	ICreateRegistrationRequest,
	IRegistration,
	ICustomError,
	IConfirmRegistrationRequest,
	IUser,
	IGetRegistrationsRequest
} from '@/models'

import {
	validateCreateRegistrationRequestData,
	validateConfirmRegistrationRequestData,
	validateGetRegistrationsRequestData
} from './validators'

export async function getRegistrations(
	data: IGetRegistrationsRequest
): Promise<{ registrations: IRegistration[], total: number }> {
	const validationError = validateGetRegistrationsRequestData(data)

	if (validationError) {
		throw {
			code: ErrorCodeEnum.ValidationError,
			status: ErorrStatusEnum.BadRequest,
			description: validationError
		} satisfies ICustomError
	}

	const dbRegistrationsResult = await getRegistrationsDb(data)

	return {
		...dbRegistrationsResult,
		registrations: dbRegistrationsResult.registrations.map(r => ({
			id: r.id,
			email: r.email
		}))
	}
}

export async function createRegistration(data: ICreateRegistrationRequest): Promise<IRegistration> {
	const validationError = validateCreateRegistrationRequestData(data)

	if (validationError) {
		throw {
			code: ErrorCodeEnum.ValidationError,
			status: ErorrStatusEnum.BadRequest,
			description: validationError
		} satisfies ICustomError
	}

	const passwordSalt = crypto.randomBytes(16).toString('hex')
	const activationToken = crypto.randomBytes(16).toString('hex')
	const passwordHash = crypto
		.createHmac('sha512', passwordSalt)
		.update(data.password)
		.digest('hex')

	const dbUser = await createRegistrationDb({
		...data,
		passwordHash,
		passwordSalt,
		activationToken
	})

	await sendMail({
		to: data.email,
		subject: `Регистрация пользователя на ${environment.FRONT_URL}`,
		html: `
			Для подтверждения регистрации перейдите
			<a href="${environment.FRONT_URL}/#/auth/sign-up-confirm-email?token=${activationToken}">по ссылке</a>`
	})

	return {
		id: dbUser.id,
		email: dbUser.email
	}
}

export async function confirmRegistration(data: IConfirmRegistrationRequest): Promise<IUser> {
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
