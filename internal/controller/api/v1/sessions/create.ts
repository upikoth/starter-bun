import cookie from 'cookie'

import { HttpHeaderEnum, AUTHORIZATION_HEADER, MILLISECONDS_IN_MONTH } from '@/constants'

import { getSuccessResponse } from '@/controller/http.utils'

import service from '@/service'

import type {
	ICreateSessionResponse,
	ICreateSessionRequest
} from '@/models'

export default async function create(req: Request): Promise<Response> {
	const bodyJson = ((await req.json()) || {}) as Record<string, string>
	const email = bodyJson.email || ''
	const password = bodyJson.password || ''

	const createSessionRequestData: ICreateSessionRequest = {
		email,
		password
	}

	const { session, user } = await service.sessions.create(createSessionRequestData)

	const response = getSuccessResponse({
		user,
		session: { id: session.id }
	} satisfies ICreateSessionResponse)

	const cookieHeader = cookie.serialize(AUTHORIZATION_HEADER, session.session, {
		httpOnly: true,
		secure: true,
		path: '/',
		maxAge: 6 * MILLISECONDS_IN_MONTH
	})
	response.headers.set(HttpHeaderEnum.SetCookie, cookieHeader)

	return response
}
