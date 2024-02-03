import crypto from 'crypto'

import { ErrorCodeEnum, ErorrStatusEnum } from '@/constants'

import { uploadFileToS3 } from '@/utils'

import type {
	IFile,
	ICustomError,
	IUploadFileRequest
} from '@/models'

import {
	validateuploadFileRequestData
} from './validators'

export default async function uploadFile(
	data: IUploadFileRequest
): Promise<{ file: IFile }> {
	const validationError = validateuploadFileRequestData(data)

	if (validationError) {
		throw {
			code: ErrorCodeEnum.ValidationError,
			status: ErorrStatusEnum.BadRequest,
			description: validationError
		} satisfies ICustomError
	}

	const s3Id = crypto.randomBytes(32).toString('hex')

	try {
		await uploadFileToS3(data.file, s3Id, data.uploadedByUserId)
	} catch (err) {
		throw {
			code: ErrorCodeEnum.s3Error,
			status: ErorrStatusEnum.Success,
			description: String(err)
		} satisfies ICustomError
	}

	return {
		file: {
			id: 1,
			s3Id,
			name: data.file.name,
			uploadedByUserId: data.uploadedByUserId
		}
	}
}
