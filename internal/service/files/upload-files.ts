import { ErrorCodeEnum, ErorrStatusEnum } from '@/constants'

import type {
	IFile,
	ICustomError,
	IUploadFilesRequest
} from '@/models'

import {
	validateUploadFilesRequestData
} from './validators'

export default async function uploadFiles(
	data: IUploadFilesRequest
): Promise<{ files: IFile[] }> {
	const validationError = validateUploadFilesRequestData(data)

	if (validationError) {
		throw {
			code: ErrorCodeEnum.ValidationError,
			status: ErorrStatusEnum.BadRequest,
			description: validationError
		} satisfies ICustomError
	}

	return {
		files: []
	}
}
