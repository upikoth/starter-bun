import { ErrorCodeEnum, ErrorStatusEnum } from '@/constants'

import repository from '@/repository'

import type {
	IFile,
	ICustomError,
	IGetFilesRequest
} from '@/models'

import {
	validateGetFilesRequestData
} from './validators'

export default async function getAll(
	data: IGetFilesRequest
): Promise<{ files: IFile[], total: number }> {
	const validationError = validateGetFilesRequestData(data)

	if (validationError) {
		throw {
			code: ErrorCodeEnum.ValidationError,
			status: ErrorStatusEnum.BadRequest,
			description: validationError
		} satisfies ICustomError
	}

	const dbFilesResult = await repository.main.files.getAll(data)

	return {
		...dbFilesResult,
		files: dbFilesResult.files.map((f) => ({
			id: f.id,
			name: f.name,
			s3Path: f.s3Path,
			uploadedByUserId: f.uploadedByUserId
		}))
	}
}
