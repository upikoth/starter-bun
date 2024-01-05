import { getSuccessResponse } from '@/controller/http.utils'

import { updateUser as updateUserFromService } from '@/service'

import type { IUpdateUserRequest, IUpdateUserResponse, UserStatusEnum } from '@/models'

export default async function updateUser(req: Request, params: Record<string, string>): Promise<Response> {
	const bodyJson = ((await req.json()) || {}) as Record<string, string>

	const updateUsersRequestData: IUpdateUserRequest = {
		id: Number.parseInt(params.id || '0'),
		email: bodyJson.email || undefined,
		status: bodyJson.status as UserStatusEnum || undefined
	}

	const user = await updateUserFromService(updateUsersRequestData)

	return getSuccessResponse({ user } satisfies IUpdateUserResponse)
}
