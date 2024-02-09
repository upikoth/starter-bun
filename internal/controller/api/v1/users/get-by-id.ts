import { getSuccessResponse } from '@/controller/http.utils'

import service from '@/service'

import type { IGetUserRequest, IGetUserResponse } from '@/models'

export default async function getById(_: Request, params: Record<string, string>): Promise<Response> {
	const getUsersRequestData: IGetUserRequest = { id: Number.parseInt(params.id || '0') }

	const user = await service.users.getById(getUsersRequestData.id)

	return getSuccessResponse({ user } satisfies IGetUserResponse)
}
