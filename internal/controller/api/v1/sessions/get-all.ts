import { getSuccessResponse } from '@/controller/http.utils'

import service from '@/service'

import type {
	IGetSessionsRequest,
	IGetSessionsResponse
} from '@/models'

export default async function getAll(req: Request): Promise<Response> {
	const { searchParams } = new URL(req.url)

	const limit = Number.parseInt(searchParams.get('limit') || '10')
	const offset = Number.parseInt(searchParams.get('offset') || '0')

	const getSessionsRequestData: IGetSessionsRequest = {
		limit,
		offset
	}

	const { sessions, total } = await service.sessions.getAll(getSessionsRequestData)

	return getSuccessResponse({
		sessions,
		limit,
		offset,
		total
	} satisfies IGetSessionsResponse)
}
