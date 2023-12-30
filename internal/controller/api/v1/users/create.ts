import { getSuccessResponse } from '@/controller/http.utils'
import { createUser as createUserFromService } from '@/service/users'

import type {
	ICreateUserResponse,
	ICreateUserRequest
} from '@/models'

export default async function createUser(req: Request): Promise<Response> {
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
