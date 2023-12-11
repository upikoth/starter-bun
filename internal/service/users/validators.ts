import Joi from 'joi'

import type { IGetUsersRequest } from '@internal/models/users'

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
