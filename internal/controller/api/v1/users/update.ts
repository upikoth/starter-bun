import { getSuccessResponse } from '@/controller/http.utils'

import { updateUser as updateUserFromService } from '@/service/users'

import type { IUpdateUserRequest, IUpdateUserResponse } from '@/models'

export default async function updateUser(req: Request, params: Record<string, string>): Promise<Response> {
	const bodyJson = await req.json()

	const updateUsersRequestData: IUpdateUserRequest = {
		id: Number.parseInt(params.id || '0'),
		email: bodyJson.email || undefined,
		status: bodyJson.status || undefined
	}

	const user = await updateUserFromService(updateUsersRequestData)

	return getSuccessResponse({ user } satisfies IUpdateUserResponse)
}
