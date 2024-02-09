import { getSuccessResponse } from '@/controller/http.utils'

import service from '@/service'

import type {
	IGetUsersRequest,
	IGetUsersResponse,
	UserStatusEnum
} from '@/models'

export default async function getAll(req: Request): Promise<Response> {
	const { searchParams } = new URL(req.url)

	const limit = Number.parseInt(searchParams.get('limit') || '10')
	const offset = Number.parseInt(searchParams.get('offset') || '0')
	const status = searchParams.get('status') as UserStatusEnum || undefined

	const getUsersRequestData: IGetUsersRequest = {
		limit,
		offset,
		status
	}

	const { users, total } = await service.users.getAll(getUsersRequestData)

	return getSuccessResponse({
		users,
		limit,
		offset,
		total
	} satisfies IGetUsersResponse)
}
