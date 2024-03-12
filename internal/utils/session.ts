import cookie from 'cookie'

import { AUTHORIZATION_HEADER } from '@/constants'

export function getSessionFromRequest(req: Request) {
	const parsedCookie = cookie.parse(req.headers.get('Cookie') || '')
	const session = parsedCookie[AUTHORIZATION_HEADER] || req.headers.get('SwaggerAuthorization') || ''

	return session
}
