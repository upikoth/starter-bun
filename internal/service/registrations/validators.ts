import Joi from 'joi'

import type {
	ICreateRegistrationRequest,
	IConfirmRegistrationRequest,
	IGetRegistrationsRequest,
	IDeleteRegistrationRequest
} from '@/models'

const getRegistrationsRequestDataSchema = Joi.object({
	limit: Joi.number()
		.integer()
		.min(0)
		.required(),
	offset: Joi.number()
		.integer()
		.min(0)
		.required()
})

export function validateGetRegistrationsRequestData(data: IGetRegistrationsRequest): string {
	return getRegistrationsRequestDataSchema.validate(data).error?.message || ''
}

const createRegistrationRequestDataSchema = Joi.object({
	email: Joi.string()
		.email()
		.required(),
	password: Joi.string()
		.required()
})

export function validateCreateRegistrationRequestData(data: ICreateRegistrationRequest): string {
	return createRegistrationRequestDataSchema.validate(data).error?.message || ''
}

const confirmRegistrationRequestDataSchema = Joi.object({
	token: Joi.string()
		.min(1)
		.required()
})

export function validateConfirmRegistrationRequestData(data: IConfirmRegistrationRequest): string {
	return confirmRegistrationRequestDataSchema.validate(data).error?.message || ''
}

const deleteRegistrationRequestDataSchema = Joi.object({
	id: Joi.number()
		.integer()
		.min(1)
		.required()
})

export function validateDeleteRegistrationRequestData(data: IDeleteRegistrationRequest): string {
	return deleteRegistrationRequestDataSchema.validate(data).error?.message || ''
}
