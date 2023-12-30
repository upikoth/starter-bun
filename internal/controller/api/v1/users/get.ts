import { getSuccessResponse } from '@internal/controller/http.utils'

import { getUser as getUserFromService } from '@internal/service/users'

import type { IGetUserRequest, IGetUserResponse } from '@internal/models'

export default async function getUser(_: Request, params: Record<string, string>): Promise<Response> {
	const getUsersRequestData: IGetUserRequest = { id: Number.parseInt(params.id || '0' ) }

	const user = await getUserFromService(getUsersRequestData)

	return getSuccessResponse({ user } satisfies IGetUserResponse)
}
