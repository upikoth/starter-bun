import cookie from 'cookie'

import { AUTHORIZATION_HEADER } from '@/constants'

import { getSuccessResponse } from '@/controller/http.utils'

import { checkSession as checkSessionFromService } from '@/service'

import type { IGetCurrentSessionResponse } from '@/models'

export default async function getCurrentSession(req: Request): Promise<Response> {
	const parsedCookie = cookie.parse(req.headers.get('Cookie') || '')
	const sessionValue = parsedCookie[AUTHORIZATION_HEADER] || ''

	const { user, session } = await checkSessionFromService(sessionValue)

	return getSuccessResponse({
		user,
		session: { id: session.id }
	} satisfies IGetCurrentSessionResponse)
}
