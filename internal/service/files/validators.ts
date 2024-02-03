import Joi from 'joi'

import type {
	IUploadFileRequest
} from '@/models'

const uploadFileRequestDataSchema = Joi.object({
	file: Joi.object()
		.required(),
	uploadedByUserId: Joi.number()
		.required()
		.min(1)
})

export function validateuploadFileRequestData(data: IUploadFileRequest): string {
	return uploadFileRequestDataSchema.validate(data).error?.message || ''
}
