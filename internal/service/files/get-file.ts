import { ErrorCodeEnum, ErorrStatusEnum } from '@/constants'

import {
	getFileById as getFileByIdb
} from '@/repository'

import type {
	IFile,
	ICustomError,
	IGetFileRequest
} from '@/models'

import {
	validateGetFileRequestData
} from './validators'

export default async function getFile(data: IGetFileRequest): Promise<IFile> {
	const validationError = validateGetFileRequestData(data)

	if (validationError) {
		throw {
			code: ErrorCodeEnum.ValidationError,
			status: ErorrStatusEnum.BadRequest,
			description: validationError
		} satisfies ICustomError
	}

	const dbFile = await getFileByIdb(data.id)

	if (!dbFile) {
		throw {
			code: ErrorCodeEnum.EntityNotFound,
			status: ErorrStatusEnum.BadRequest,
			description: 'Файл не найден'
		} satisfies ICustomError
	}

	return {
		id: dbFile.id,
		name: dbFile.name,
		s3Id: dbFile.s3Id,
		uploadedByUserId: dbFile.uploadedByUserId
	}
}
