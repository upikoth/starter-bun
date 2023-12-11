import Joi from 'joi'

import type { IGetUsersRequest, IGetUserRequest } from '@internal/models/users'

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

export function validateUsersRequestData(data: IGetUsersRequest): string {
	return getUsersRequestDataSchema.validate(data).error?.message || ''
}

const getUserRequestDataSchema = Joi.object({
	id: Joi.number()
		.integer()
		.min(1)
		.required()
})

export function validateUserRequestData(data: IGetUserRequest): string {
	return getUserRequestDataSchema.validate(data).error?.message || ''
}
