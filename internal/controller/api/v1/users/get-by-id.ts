import { getSuccessResponse } from '@/controller/http.utils'

import { getUser as getUserFromService } from '@/service'

import type { IGetUserRequest, IGetUserResponse } from '@/models'

export default async function getById(_: Request, params: Record<string, string>): Promise<Response> {
	const getUsersRequestData: IGetUserRequest = { id: Number.parseInt(params.id || '0') }

	const user = await getUserFromService(getUsersRequestData)

	return getSuccessResponse({ user } satisfies IGetUserResponse)
}
