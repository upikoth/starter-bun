import crypto from 'crypto'

import { ErrorCodeEnum, ErrorStatusEnum } from '@/constants'

import repository from '@/repository'

import type {
	IFile,
	ICustomError,
	IUploadFileRequest
} from '@/models'

import {
	validateUploadFileRequestData
} from './validators'

export default async function upload(
	data: IUploadFileRequest
): Promise<{ file: IFile }> {
	const validationError = validateUploadFileRequestData(data)

	if (validationError) {
		throw {
			code: ErrorCodeEnum.ValidationError,
			status: ErrorStatusEnum.BadRequest,
			description: validationError
		} satisfies ICustomError
	}

	const s3Id = crypto.randomBytes(32).toString('hex')
	const s3Path = `${data.uploadedByUserId}/${s3Id}`

	try {
		await repository.s3.uploadFileToS3(data.file, s3Path)
	} catch (err) {
		throw {
			code: ErrorCodeEnum.s3Error,
			status: ErrorStatusEnum.Success,
			description: String(err)
		} satisfies ICustomError
	}

	const dbFile = await repository.main.files.create({
		s3Path,
		name: data.file.name,
		uploadedByUserId: data.uploadedByUserId
	})

	return {
		file: dbFile
	}
}
