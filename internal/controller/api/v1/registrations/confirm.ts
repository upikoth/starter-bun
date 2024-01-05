import { getSuccessResponse } from '@/controller/http.utils'

import { confirmRegistration as confirmRegistrationFromService } from '@/service'

import type {
	IConfirmRegistrationResponse,
	IConfirmRegistrationRequest
} from '@/models'

export default async function createRegistration(req: Request): Promise<Response> {
	const bodyJson = ((await req.json()) || {}) as Record<string, string>

	const token = bodyJson.token || ''

	const createSessionRequestData: IConfirmRegistrationRequest = { token }

	const user = await confirmRegistrationFromService(createSessionRequestData)

	return getSuccessResponse({ user } satisfies IConfirmRegistrationResponse)
}
