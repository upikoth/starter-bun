import { getSuccessResponse } from '@internal/controller/http.utils'

import { createSession as createSessionFromService } from '@internal/service/sessions'

import { HttpHeaderEnum, AUTHORIZATION_HEADER, MILLISECONDS_IN_MONTH } from '@internal/constants'

import type {
	ICreateSessionResponse,
	ICreateSessionRequest
} from '@internal/models'

export default async function createSession(req: Request): Promise<Response> {
	const bodyJson = await req.json()
	const email = bodyJson.email || ''
	const password = bodyJson.password || ''

	const createSessionRequestData: ICreateSessionRequest = {
		email,
		password
	}

	const { session, user } = await createSessionFromService(createSessionRequestData)

	const response = getSuccessResponse({ user } satisfies ICreateSessionResponse)
	response.headers.set(
		HttpHeaderEnum.SetCookie,
		`${AUTHORIZATION_HEADER}=${session.session}; HttpOnly; Secure; Path=/; Max-Age=${6 * MILLISECONDS_IN_MONTH};`
	)

	return response
}
