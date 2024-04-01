import { ErrorCodeEnum, ErrorStatusEnum } from '@/constants'

import { getSessionFromRequest } from '@/utils'

import { getSuccessResponse } from '@/controller/http.utils'

import service from '@/service'

import type {
	IUploadFileRequest,
	IUploadFileResponse,
	ICustomError
} from '@/models'

export default async function upload(req: Request): Promise<Response> {
	let file = null

	try {
		const formData = await req.formData()

		file = formData.get('file')
	} catch (err) {
		throw {
			code: ErrorCodeEnum.ValidationError,
			status: ErrorStatusEnum.BadRequest,
			description: String(err)
		} satisfies ICustomError
	}

	if (!(file instanceof File)) {
		throw {
			code: ErrorCodeEnum.ValidationError,
			status: ErrorStatusEnum.BadRequest,
			description: 'Файл не передан в запросе'
		} satisfies ICustomError
	}

	const sessionId = getSessionFromRequest(req)
	const { session } = await service.sessions.check(sessionId)

	const uploadFileRequestData: IUploadFileRequest = {
		file,
		uploadedByUserId: session.userId
	}

	const { file: filesResponseFromService } = await service.files.upload(uploadFileRequestData)

	const response = getSuccessResponse({
		file: filesResponseFromService
	} satisfies IUploadFileResponse)

	return response
}
