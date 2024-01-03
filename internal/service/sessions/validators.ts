import Joi from 'joi'

import type {
	IGetSessionsRequest,
	ICreateSessionRequest,
	IDeleteSessionRequest
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

const deleteSessionRequestDataSchema = Joi.object({
	id: Joi.number()
		.integer()
		.min(1)
		.required()
})

export function validateDeleteSessionRequestData(data: IDeleteSessionRequest): string {
	return deleteSessionRequestDataSchema.validate(data).error?.message || ''
}

const checkSessionRequestDataSchema = Joi.object({
	session: Joi.string()
		.min(1)
		.required()
})

export function validateCheckSessionRequestData(data: { session: string }): string {
	return checkSessionRequestDataSchema.validate(data).error?.message || ''
}

const deleteAllSessionsOfUserRequestDataSchema = Joi.object({
	userId: Joi.number()
		.integer()
		.min(1)
		.required()
})

export function validateDeleteAllSessionsOfUserRequestData(data: { userId: number }): string {
	return deleteAllSessionsOfUserRequestDataSchema.validate(data).error?.message || ''
}
