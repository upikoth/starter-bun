import { ErrorCodeEnum, ErrorStatusEnum } from '@/constants'

import repository from '@/repository'

import type {
	ICustomError
} from '@/models'

import {
	validateDeleteFileRequestData
} from './validators'

export default async function deleteById(
	id: number
): Promise<void> {
	const validationError = validateDeleteFileRequestData({ id })

	if (validationError) {
		throw {
			code: ErrorCodeEnum.ValidationError,
			status: ErrorStatusEnum.BadRequest,
			description: validationError
		} satisfies ICustomError
	}

	const file = await repository.main.files.getById(id)

	if (!file) {
		throw {
			code: ErrorCodeEnum.EntityNotFound,
			status: ErrorStatusEnum.BadRequest,
			description: 'Файл не найден'
		} satisfies ICustomError
	}

	try {
		await repository.s3.deleteFileFromS3(file.s3Path)
	} catch (err) {
		throw {
			code: ErrorCodeEnum.s3Error,
			status: ErrorStatusEnum.Success,
			description: String(err)
		} satisfies ICustomError
	}

	await repository.main.files.deleteById(id)
}
