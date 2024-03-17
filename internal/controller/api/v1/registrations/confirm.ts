import { getSuccessResponse } from '@/controller/http.utils'

import service from '@/service'

import type {
	IConfirmRegistrationResponse,
	IConfirmRegistrationRequest
} from '@/models'

export default async function confirm(req: Request): Promise<Response> {
	const bodyJson = req.body ? await req.json() : {}

	const token = bodyJson.token || ''

	const createSessionRequestData: IConfirmRegistrationRequest = { token }

	const user = await service.registrations.confirm(createSessionRequestData)

	return getSuccessResponse({ user } satisfies IConfirmRegistrationResponse)
}
