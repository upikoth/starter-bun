import { HttpMethod } from '@internal/constants'
import { errorNotFound, getSuccessResponse } from '@internal/controller/http.const'

import { getUsers as getUsersFromService, createUser as createUserFromService } from '@internal/service/users'

import type {
	IGetUsersRequest,
	IGetUsersResponse,
	ICreateUserResponse,
	ICreateUserRequest,
	UserStatusEnum
} from '@internal/models'

async function getUsers(req: Request): Promise<Response> {
	const  { searchParams } = new URL(req.url)

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

async function createUser(req: Request): Promise<Response> {
	const bodyJson = await req.json()
	const email = bodyJson.email || ''
	const password = bodyJson.password || ''

	const createUserRequestData: ICreateUserRequest = {
		email,
		password
	}

	const user = await createUserFromService(createUserRequestData)

	return getSuccessResponse({ user } satisfies ICreateUserResponse)
}

export default function(req: Request): Promise<Response>  {
	switch (req.method) {
		case HttpMethod.Get: {
			return getUsers(req)
		}
		case HttpMethod.Post: {
			return createUser(req)
		}
	}

	throw errorNotFound
}
