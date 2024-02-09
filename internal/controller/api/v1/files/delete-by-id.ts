import { getSuccessResponse } from '@/controller/http.utils'

import service from '@/service'

import type { IDeleteFileRequest } from '@/models'

export default async function deleteById(_: Request, params: Record<string, string>): Promise<Response> {
	const deleteFileRequestData: IDeleteFileRequest = { id: Number.parseInt(params.id || '0') }

	await service.files.deleteById(deleteFileRequestData.id)

	return getSuccessResponse({})
}
