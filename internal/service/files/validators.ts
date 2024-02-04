import Joi from 'joi'

import type {
	IUploadFileRequest,
	IGetFilesRequest,
	IDeleteFileRequest,
	IGetFileRequest
} from '@/models'

const getFilesRequestDataSchema = Joi.object({
	limit: Joi.number()
		.integer()
		.min(0)
		.required(),
	offset: Joi.number()
		.integer()
		.min(0)
		.required(),
	uploadedByUserId: Joi.number()
		.integer()
		.min(1)
		.optional()
})

export function validateGetFilesRequestData(data: IGetFilesRequest): string {
	return getFilesRequestDataSchema.validate(data).error?.message || ''
}

const uploadFileRequestDataSchema = Joi.object({
	file: Joi.object()
		.required(),
	uploadedByUserId: Joi.number()
		.required()
		.min(1)
})

export function validateUploadFileRequestData(data: IUploadFileRequest): string {
	return uploadFileRequestDataSchema.validate(data).error?.message || ''
}

const deleteFileRequestDataSchema = Joi.object({
	id: Joi.number()
		.integer()
		.min(1)
		.required()
})

export function validateDeleteFileRequestData(data: IDeleteFileRequest): string {
	return deleteFileRequestDataSchema.validate(data).error?.message || ''
}

const getFileRequestDataSchema = Joi.object({
	id: Joi.number()
		.integer()
		.min(1)
		.required()
})

export function validateGetFileRequestData(data: IGetFileRequest): string {
	return getFileRequestDataSchema.validate(data).error?.message || ''
}
