import Joi from 'joi'

import type {
	IUploadFilesRequest
} from '@/models'

const uploadFilesRequestDataSchema = Joi.object({
	files: Joi.array()
		.min(1)
		.required()
})

export function validateUploadFilesRequestData(data: IUploadFilesRequest): string {
	return uploadFilesRequestDataSchema.validate(data).error?.message || ''
}
