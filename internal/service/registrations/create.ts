import crypto from 'node:crypto'

import environment from '@/environment'

import { ErrorCodeEnum, ErrorStatusEnum } from '@/constants'

import service from '@/service'

import repository from '@/repository'

import type {
	ICreateRegistrationRequest,
	IRegistration,
	ICustomError
} from '@/models'

import {
	validateCreateRegistrationRequestData
} from './validators'

export default async function create(data: ICreateRegistrationRequest): Promise<IRegistration> {
	const validationError = validateCreateRegistrationRequestData(data)

	if (validationError) {
		throw {
			code: ErrorCodeEnum.ValidationError,
			status: ErrorStatusEnum.BadRequest,
			description: validationError
		} satisfies ICustomError
	}

	const user = await service.users.getByEmail(data.email)

	if (user) {
		throw {
			code: ErrorCodeEnum.UserWithThisEmailAlreadyExist,
			status: ErrorStatusEnum.BadRequest,
			description: 'Пользователь с таким email уже существует'
		} satisfies ICustomError
	}

	const passwordSalt = crypto.randomBytes(16).toString('hex')
	const activationToken = crypto.randomBytes(16).toString('hex')
	const passwordHash = crypto
		.createHmac('sha512', passwordSalt)
		.update(data.password)
		.digest('hex')

	const dbUser = await repository.main.registrations.create({
		...data,
		passwordHash,
		passwordSalt,
		activationToken
	})

	await repository.mailer.sendMail({
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
