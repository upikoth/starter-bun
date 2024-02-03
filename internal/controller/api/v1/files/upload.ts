import { ErrorCodeEnum, ErorrStatusEnum } from '@/constants'

import { getSessionFromRequest } from '@/utils'

import { getSuccessResponse } from '@/controller/http.utils'

import {
	uploadFile as uploadFileFromService,
	checkSession as checkSessionFromService
} from '@/service'

import type {
	IUploadFileRequest,
	IUploadFileResponse,
	ICustomError
} from '@/models'

export default async function uploadFile(req: Request): Promise<Response> {
	let file = null

	try {
		const formData = await req.formData()

		file = formData.get('file')
	} catch (err) {
		throw {
			code: ErrorCodeEnum.ValidationError,
			status: ErorrStatusEnum.BadRequest,
			description: String(err)
		} satisfies ICustomError
	}

	if (!(file instanceof File)) {
		throw {
			code: ErrorCodeEnum.ValidationError,
			status: ErorrStatusEnum.BadRequest,
			description: 'Файл не передан в запросе'
		} satisfies ICustomError
	}

	const sessionId = getSessionFromRequest(req)
	const { session } = await checkSessionFromService(sessionId)

	const uploadFileRequestData: IUploadFileRequest = {
		file,
		uploadedByUserId: session.userId
	}

	const { file: filesResponseFromService } = await uploadFileFromService(uploadFileRequestData)

	const response = getSuccessResponse({
		file: filesResponseFromService
	} satisfies IUploadFileResponse)

	return response
}
