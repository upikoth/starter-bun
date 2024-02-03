import { ErrorCodeEnum, ErorrStatusEnum } from '@/constants'

import { getSuccessResponse } from '@/controller/http.utils'

import { uploadFiles as uploadFilesFromService } from '@/service'

import type {
	IUploadFilesRequest,
	IUploadFilesResponse,
	ICustomError
} from '@/models'

export default async function uploadFile(req: Request): Promise<Response> {
	let files: Blob[] = []

	try {
		const formData = await req.formData()

		files = formData
			.getAll('files')
			.filter((file) => file instanceof Blob) as Blob[]
	} catch (err) {
		throw {
			code: ErrorCodeEnum.ValidationError,
			status: ErorrStatusEnum.BadRequest,
			description: String(err)
		} satisfies ICustomError
	}

	const uploadFileRequestData: IUploadFilesRequest = {
		files
	}

	const { files: filesResponseFromService } = await uploadFilesFromService(uploadFileRequestData)

	const response = getSuccessResponse({
		files: filesResponseFromService
	} satisfies IUploadFilesResponse)

	return response
}
