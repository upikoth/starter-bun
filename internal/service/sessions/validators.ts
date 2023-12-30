import Joi from 'joi'

import type { ICreateSessionRequest } from '@/models'

const createSessionRequestDataSchema = Joi.object({
	email: Joi.string()
		.email()
		.required(),
	password: Joi.string()
		.required()
})

export function validateCreateSessionRequestData(data: ICreateSessionRequest): string {
	return createSessionRequestDataSchema.validate(data).error?.message || ''
}
