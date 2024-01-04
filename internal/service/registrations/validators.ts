import Joi from 'joi'

import type {
	ICreateRegistrationRequest,
	IConfirmRegistrationRequest
} from '@/models'

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
