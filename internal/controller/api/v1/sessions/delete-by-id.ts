import { getSuccessResponse } from '@/controller/http.utils'

import service from '@/service'

import type { IDeleteSessionRequest } from '@/models'

export default async function deleteById(_: Request, params: Record<string, string>): Promise<Response> {
	const deleteSessionRequestData: IDeleteSessionRequest = { id: Number.parseInt(params.id || '0') }

	await service.sessions.deleteById(deleteSessionRequestData.id)

	return getSuccessResponse({})
}
