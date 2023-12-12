import { HttpMethod } from '@internal/constants'
import type { ICustomError } from '@internal/models'
import { ErrorCodeEnum, ErorrStatusEnum } from '@internal/constants'

import { getUsers as getUsersFromService, createUser as createUserFromService } from '@internal/service/users'

import type { IGetUsersRequest, IGetUsersResponse, ICreateUserResponse, ICreateUserRequest } from '@internal/models'

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

async function createUser(req: Request): Promise<ICreateUserResponse> {
	const bodyJson = await req.json()
	const name = bodyJson.name || ''

	const createuserRequestData: ICreateUserRequest = { name }

	const user = await createUserFromService(createuserRequestData)

	return { user }
}

export default function(req: Request) {
	switch (req.method) {
		case HttpMethod.Get: {
			return getUsers(req)
		}
		case HttpMethod.Post: {
			return createUser(req)
		}
	}

	throw {
		code: ErrorCodeEnum.UrlNotFound,
		status: ErorrStatusEnum.NotFound,
		description: 'Метод не найден'
	} satisfies ICustomError
}
