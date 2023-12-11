import { HttpMethod } from '@internal/constants'
import { responseNotFound } from '@internal/controller/http.const'

import { getUsers as getUsersFromService } from '@internal/service/users'

import type { IGetUsersRequest, IGetUsersResponse } from '@internal/models'

async function getUsers(req: Request): Promise<IGetUsersResponse> {
	const  { searchParams } = new URL(req.url)

	const limit = Number.parseInt(searchParams.get('limit') || '10')
	const offset = Number.parseInt(searchParams.get('offset') || '0')

	const getUsersRequestData: IGetUsersRequest = {
		limit,
		offset
	}

	const users = await getUsersFromService(getUsersRequestData)

	return {
		users,
		limit,
		offset
	}
}

export default function(req: Request) {
	switch (req.method) {
		case HttpMethod.Get: {
			return getUsers(req)
		}
	}

	return responseNotFound
}
