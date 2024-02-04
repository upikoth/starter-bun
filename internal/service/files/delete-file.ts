import { ErrorCodeEnum, ErorrStatusEnum } from '@/constants'

import { deleteFileFromS3 } from '@/utils'

import {
	deleteFile as deleteFileDb,
	getFileById as getFileByIdDb
} from '@/repository'

import type {
	ICustomError,
	IDeleteFileRequest
} from '@/models'

import {
	validateDeleteFileRequestData
} from './validators'

export default async function deleteFile(
	data: IDeleteFileRequest
): Promise<void> {
	const validationError = validateDeleteFileRequestData(data)

	if (validationError) {
		throw {
			code: ErrorCodeEnum.ValidationError,
			status: ErorrStatusEnum.BadRequest,
			description: validationError
		} satisfies ICustomError
	}

	const file = await getFileByIdDb(data.id)

	if (!file) {
		throw {
			code: ErrorCodeEnum.EntityNotFound,
			status: ErorrStatusEnum.BadRequest,
			description: 'Файл не найден'
		} satisfies ICustomError
	}

	try {
		await deleteFileFromS3(file.s3Id, file.uploadedByUserId)
	} catch (err) {
		throw {
			code: ErrorCodeEnum.s3Error,
			status: ErorrStatusEnum.Success,
			description: String(err)
		} satisfies ICustomError
	}

	await deleteFileDb(data)
}
