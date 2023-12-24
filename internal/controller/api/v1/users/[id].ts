import { HttpMethod } from '@internal/constants'
import type { ICustomError } from '@internal/models'
import { ErrorCodeEnum, ErorrStatusEnum } from '@internal/constants'

import { getUser as getUserFromService, updateUser as updateUserFromService } from '@internal/service/users'

import type { IGetUserRequest, IGetUserResponse, IUpdateUserRequest, IUpdateUserResponse } from '@internal/models'

async function getUser(_: Request, params?: Record<string, string>): Promise<IGetUserResponse> {
	const getUsersRequestData: IGetUserRequest = { id: Number.parseInt(params?.id || '0' ) }

	const user = await getUserFromService(getUsersRequestData)

	return { user }
}

async function updateUser(req: Request, params?: Record<string, string>): Promise<IUpdateUserResponse> {
	const bodyJson = await req.json()

	const updateUsersRequestData: IUpdateUserRequest = {
		id: Number.parseInt(params?.id || '0'),
		email: bodyJson.email,
		status: bodyJson.status
	}

	const user = await updateUserFromService(updateUsersRequestData)

	return { user }
}

export default function(req: Request, params?: Record<string, string>) {
	switch (req.method) {
		case HttpMethod.Get: {
			return getUser(req, params)
		}
		case HttpMethod.Patch: {
			return updateUser(req, params)
		}
	}

	throw {
		code: ErrorCodeEnum.UrlNotFound,
		status: ErorrStatusEnum.NotFound,
		description: 'Метод не найден'
	} satisfies ICustomError
}
