import { HttpMethod } from '@internal/constants'
import { responseNotFound } from '@internal/controller/http.const'

import { getUser as getUserFromService } from '@internal/service/users'

import type { IGetUserRequest, IGetUserResponse } from '@internal/models'

async function getUser(_: Request, params?: Record<string, string>): Promise<IGetUserResponse> {
	const getUsersRequestData: IGetUserRequest = { id: Number.parseInt(params?.id || '0' ) }

	const user = await getUserFromService(getUsersRequestData)

	return { user }
}

export default function(req: Request, params?: Record<string, string>) {
	switch (req.method) {
		case HttpMethod.Get: {
			return getUser(req, params)
		}
	}

	return responseNotFound
}
