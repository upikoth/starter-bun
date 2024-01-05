import { getSuccessResponse } from '@/controller/http.utils'
import { getSessions as getSessionsFromService } from '@/service'

import type {
	IGetSessionsRequest,
	IGetSessionsResponse
} from '@/models'

export default async function getSessions(req: Request): Promise<Response> {
	const  { searchParams } = new URL(req.url)

	const limit = Number.parseInt(searchParams.get('limit') || '10')
	const offset = Number.parseInt(searchParams.get('offset') || '0')

	const getSessionsRequestData: IGetSessionsRequest = {
		limit,
		offset
	}

	const { sessions, total } = await getSessionsFromService(getSessionsRequestData)

	return getSuccessResponse({
		sessions,
		limit,
		offset,
		total
	} satisfies IGetSessionsResponse)
}
