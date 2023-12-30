import Joi from 'joi'

import type {
	IGetSessionsRequest,
	ICreateSessionRequest
} from '@/models'

const getSessionsRequestDataSchema = Joi.object({
	limit: Joi.number()
		.integer()
		.min(0)
		.required(),
	offset: Joi.number()
		.integer()
		.min(0)
		.required()
})

export function validateGetSessionsRequestData(data: IGetSessionsRequest): string {
	return getSessionsRequestDataSchema.validate(data).error?.message || ''
}

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
