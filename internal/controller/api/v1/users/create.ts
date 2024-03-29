import { getSuccessResponse } from '@/controller/http.utils'

import service from '@/service'

import type {
	ICreateUserResponse,
	ICreateUserRequest
} from '@/models'

export default async function create(req: Request): Promise<Response> {
	const bodyJson = req.body ? await req.json() : {}
	const email = bodyJson.email || ''
	const password = bodyJson.password || ''

	const createUserRequestData: ICreateUserRequest = {
		email,
		password
	}

	const user = await service.users.create(createUserRequestData)

	return getSuccessResponse({ user } satisfies ICreateUserResponse)
}
