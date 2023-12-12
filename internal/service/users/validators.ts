import Joi from 'joi'

import type { IGetUsersRequest, IGetUserRequest, ICreateUserRequest } from '@internal/models/users'

const getUsersRequestDataSchema = Joi.object({
	limit: Joi.number()
		.integer()
		.min(0)
		.required(),
	offset: Joi.number()
		.integer()
		.min(0)
		.required()
})

export function validateGetUsersRequestData(data: IGetUsersRequest): string {
	return getUsersRequestDataSchema.validate(data).error?.message || ''
}

const getUserRequestDataSchema = Joi.object({
	id: Joi.number()
		.integer()
		.min(1)
		.required()
})

export function validateGetUserRequestData(data: IGetUserRequest): string {
	return getUserRequestDataSchema.validate(data).error?.message || ''
}

const createUserRequestDataSchema = Joi.object({
	name: Joi.string()
		.min(1)
		.required()
})

export function validateCreateUserRequestData(data: ICreateUserRequest): string {
	return createUserRequestDataSchema.validate(data).error?.message || ''
}
