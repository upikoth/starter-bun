import { ErrorCodeEnum, ErrorStatusEnum } from '@/constants'

import repository from '@/repository'

import type {
	IFile,
	ICustomError
} from '@/models'

import {
	validateGetFileRequestData
} from './validators'

export default async function getById(id: number): Promise<IFile> {
	const validationError = validateGetFileRequestData({ id })

	if (validationError) {
		throw {
			code: ErrorCodeEnum.ValidationError,
			status: ErrorStatusEnum.BadRequest,
			description: validationError
		} satisfies ICustomError
	}

	const dbFile = await repository.main.files.getById(id)

	if (!dbFile) {
		throw {
			code: ErrorCodeEnum.EntityNotFound,
			status: ErrorStatusEnum.BadRequest,
			description: 'Файл не найден'
		} satisfies ICustomError
	}

	return {
		id: dbFile.id,
		name: dbFile.name,
		s3Path: dbFile.s3Path,
		uploadedByUserId: dbFile.uploadedByUserId
	}
}
