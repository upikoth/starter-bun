import { getSuccessResponse } from '@/controller/http.utils'

import { deleteFile as deleteFileFromService } from '@/service'

import type { IDeleteFileRequest } from '@/models'

export default async function deleteById(_: Request, params: Record<string, string>): Promise<Response> {
	const deleteFileRequestData: IDeleteFileRequest = { id: Number.parseInt(params.id || '0') }

	await deleteFileFromService(deleteFileRequestData)

	return getSuccessResponse({})
}
