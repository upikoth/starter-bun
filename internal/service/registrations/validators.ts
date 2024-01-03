import Joi from 'joi'

import type { ICreateRegistrationRequest } from '@/models'

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
