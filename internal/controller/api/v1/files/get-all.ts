import { getSuccessResponse } from '@/controller/http.utils'

import { getFiles as getFilesFromService } from '@/service'

import type {
	IGetFilesRequest,
	IGetFilesResponse
} from '@/models'

export default async function getFiles(req: Request): Promise<Response> {
	const { searchParams } = new URL(req.url)

	const limit = Number.parseInt(searchParams.get('limit') || '10')
	const offset = Number.parseInt(searchParams.get('offset') || '0')

	const uploadedByUserIdFromSearchParams = searchParams.get('uploadedByUserId')
	const uploadedByUserId = uploadedByUserIdFromSearchParams
		? Number.parseInt(uploadedByUserIdFromSearchParams)
		: undefined

	const getFilesRequestData: IGetFilesRequest = {
		limit,
		offset,
		uploadedByUserId
	}

	const { files, total } = await getFilesFromService(getFilesRequestData)

	return getSuccessResponse({
		files,
		limit,
		offset,
		total
	} satisfies IGetFilesResponse)
}
