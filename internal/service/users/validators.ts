import Joi from 'joi'

import { UserStatusEnum, UserRoleEnum } from '@/models'
import type {
	IGetUsersRequest,
	IGetUserRequest,
	ICreateUserRequest,
	IUpdateUserRequest
} from '@/models/users'

const getUsersRequestDataSchema = Joi.object({
	limit: Joi.number()
		.integer()
		.min(0)
		.required(),
	offset: Joi.number()
		.integer()
		.min(0)
		.required(),
	status: Joi.string()
		.valid(...Object.values(UserStatusEnum))
		.optional()
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
	email: Joi.string()
		.email()
		.required(),
	password: Joi.string()
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
	email: Joi.string()
		.email()
		.optional(),
	role: Joi.string()
		.valid(...Object.values(UserRoleEnum))
		.optional(),
	status: Joi.string()
		.valid(...Object.values(UserStatusEnum))
		.optional()
})

export function validateUpdateUserRequestData(data: IUpdateUserRequest): string {
	return updateUserRequestDataSchema.validate(data).error?.message || ''
}

const getUserByEmailRequestDataSchema = Joi.object({
	email: Joi.string()
		.email()
		.required()
})

export function validateGetUserByEmailRequestData(data: { email: string }): string {
	return getUserByEmailRequestDataSchema.validate(data).error?.message || ''
}
