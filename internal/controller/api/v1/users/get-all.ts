import { getSuccessResponse } from '@/controller/http.utils'

import { getUsers as getUsersFromService } from '@/service'

import type {
	IGetUsersRequest,
	IGetUsersResponse,
	UserStatusEnum
} from '@/models'

export default async function getUsers(req: Request): Promise<Response> {
	const { searchParams } = new URL(req.url)

	const limit = Number.parseInt(searchParams.get('limit') || '10')
	const offset = Number.parseInt(searchParams.get('offset') || '0')
	const status = searchParams.get('status') as UserStatusEnum || undefined

	const getUsersRequestData: IGetUsersRequest = {
		limit,
		offset,
		status
	}

	const { users, total } = await getUsersFromService(getUsersRequestData)

	return getSuccessResponse({
		users,
		limit,
		offset,
		total
	} satisfies IGetUsersResponse)
}
