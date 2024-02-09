import { getSuccessResponse } from '@/controller/http.utils'

import service from '@/service'

import type { IGetFileRequest, IGetFileResponse } from '@/models'

export default async function getById(_: Request, params: Record<string, string>): Promise<Response> {
	const getFileRequestData: IGetFileRequest = { id: Number.parseInt(params.id || '0') }

	const file = await service.files.getById(getFileRequestData.id)

	return getSuccessResponse({ file } satisfies IGetFileResponse)
}
