import { HttpMethod } from '@internal/constants'
import type { ICustomError } from '@internal/models'
import { ErrorCodeEnum, ErorrStatusEnum } from '@internal/constants'

import { getUsers as getUsersFromService, createUser as createUserFromService } from '@internal/service/users'

import type {
	IGetUsersRequest,
	IGetUsersResponse,
	ICreateUserResponse,
	ICreateUserRequest,
	UserStatusEnum
} from '@internal/models'

async function getUsers(req: Request): Promise<IGetUsersResponse> {
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

	return {
		users,
		limit,
		offset,
		total
	}
}

async function createUser(req: Request): Promise<ICreateUserResponse> {
	const bodyJson = await req.json()
	const email = bodyJson.email || ''
	const password = bodyJson.password || ''

	const createuserRequestData: ICreateUserRequest = {
		email,
		password
	}

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
