import { getSuccessResponse } from '@/controller/http.utils'

import service from '@/service'

import type {
	IUpdateUserRequest,
	IUpdateUserResponse,
	UserStatusEnum,
	UserRoleEnum
} from '@/models'

export default async function update(req: Request, params: Record<string, string>): Promise<Response> {
	const bodyJson = ((await req.json()) || {}) as Record<string, string>

	const updateUsersRequestData: IUpdateUserRequest = {
		id: Number.parseInt(params.id || '0'),
		role: bodyJson.role as UserRoleEnum || undefined,
		status: bodyJson.status as UserStatusEnum || undefined
	}

	const user = await service.users.update(updateUsersRequestData)

	return getSuccessResponse({ user } satisfies IUpdateUserResponse)
}
