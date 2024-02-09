import { getSuccessResponse } from '@/controller/http.utils'

import { createRegistration as createRegistrationFromService } from '@/service'

import type {
	ICreateRegistrationResponse,
	ICreateRegistrationRequest
} from '@/models'

export default async function create(req: Request): Promise<Response> {
	const bodyJson = ((await req.json()) || {}) as Record<string, string>

	const email = bodyJson.email || ''
	const password = bodyJson.password || ''

	const createSessionRequestData: ICreateRegistrationRequest = {
		email,
		password
	}

	const registration = await createRegistrationFromService(createSessionRequestData)

	const response = getSuccessResponse({ registration } satisfies ICreateRegistrationResponse)

	return response
}
