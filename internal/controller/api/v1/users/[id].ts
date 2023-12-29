import { HttpMethod } from '@internal/constants'
import { errorNotFound, getSuccessResponse } from '@internal/controller/http.const'

import { getUser as getUserFromService, updateUser as updateUserFromService } from '@internal/service/users'

import type { IGetUserRequest, IGetUserResponse, IUpdateUserRequest, IUpdateUserResponse } from '@internal/models'

async function getUser(_: Request, params?: Record<string, string>): Promise<Response> {
	const getUsersRequestData: IGetUserRequest = { id: Number.parseInt(params?.id || '0' ) }

	const user = await getUserFromService(getUsersRequestData)

	return getSuccessResponse({ user } satisfies IGetUserResponse)
}

async function updateUser(req: Request, params?: Record<string, string>): Promise<Response> {
	const bodyJson = await req.json()

	const updateUsersRequestData: IUpdateUserRequest = {
		id: Number.parseInt(params?.id || '0'),
		email: bodyJson.email,
		status: bodyJson.status
	}

	const user = await updateUserFromService(updateUsersRequestData)

	return getSuccessResponse({ user } satisfies IUpdateUserResponse)
}

export default function(req: Request, params?: Record<string, string>): Promise<Response>  {
	switch (req.method) {
		case HttpMethod.Get: {
			return getUser(req, params)
		}
		case HttpMethod.Patch: {
			return updateUser(req, params)
		}
	}

	throw errorNotFound
}
