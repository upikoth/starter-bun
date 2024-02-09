import { getSuccessResponse } from '@/controller/http.utils'

import service from '@/service'

import type {
	IGetRegistrationsRequest,
	IGetRegistrationsResponse
} from '@/models'

export default async function getAll(req: Request): Promise<Response> {
	const { searchParams } = new URL(req.url)

	const limit = Number.parseInt(searchParams.get('limit') || '10')
	const offset = Number.parseInt(searchParams.get('offset') || '0')

	const getSessionsRequestData: IGetRegistrationsRequest = {
		limit,
		offset
	}

	const { registrations, total } = await service.registrations.getAll(getSessionsRequestData)

	return getSuccessResponse({
		registrations,
		limit,
		offset,
		total
	} satisfies IGetRegistrationsResponse)
}
