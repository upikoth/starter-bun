import { getSuccessResponse } from '@/controller/http.utils'

import { getFile as getFileFromService } from '@/service'

import type { IGetFileRequest, IGetFileResponse } from '@/models'

export default async function getById(_: Request, params: Record<string, string>): Promise<Response> {
	const getFileRequestData: IGetFileRequest = { id: Number.parseInt(params.id || '0') }

	const file = await getFileFromService(getFileRequestData)

	return getSuccessResponse({ file } satisfies IGetFileResponse)
}
