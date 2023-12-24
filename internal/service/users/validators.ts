import Joi from 'joi'

import { UserStatusEnum } from '@internal/models'

import type { IGetUsersRequest, IGetUserRequest, ICreateUserRequest, IUpdateUserRequest } from '@internal/models/users'

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

const updateUserRequestDataSchema = Joi.object({
	id: Joi.number()
		.integer()
		.min(1)
		.required(),
	name: Joi.string()
		.min(1)
		.optional(),
	status: Joi.string()
		.valid(...Object.values(UserStatusEnum))
		.optional()
})

export function validateUpdateUserRequestData(data: IUpdateUserRequest): string {
	return updateUserRequestDataSchema.validate(data).error?.message || ''
}
