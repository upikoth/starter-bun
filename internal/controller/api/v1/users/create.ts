import { getSuccessResponse } from '@internal/controller/http.utils'
import { createUser as createUserFromService } from '@internal/service/users'

import type {
	ICreateUserResponse,
	ICreateUserRequest
} from '@internal/models'

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
