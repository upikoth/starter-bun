import { ErrorCodeEnum, ErorrStatusEnum } from '@/constants'

import {
	getFiles as getFilesDb
} from '@/repository'

import type {
	IFile,
	ICustomError,
	IGetFilesRequest
} from '@/models'

import {
	validateGetFilesRequestData
} from './validators'

export default async function getFiles(
	data: IGetFilesRequest
): Promise<{ files: IFile[], total: number }> {
	const validationError = validateGetFilesRequestData(data)

	if (validationError) {
		throw {
			code: ErrorCodeEnum.ValidationError,
			status: ErorrStatusEnum.BadRequest,
			description: validationError
		} satisfies ICustomError
	}

	const dbFilesResult = await getFilesDb(data)

	return {
		...dbFilesResult,
		files: dbFilesResult.files.map((f) => ({
			id: f.id,
			name: f.name,
			s3Id: f.s3Id,
			uploadedByUserId: f.uploadedByUserId
		}))
	}
}
