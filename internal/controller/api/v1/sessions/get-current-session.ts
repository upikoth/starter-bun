import { getSessionFromRequest } from '@/utils'

import { getSuccessResponse } from '@/controller/http.utils'

import service from '@/service'

import type { IGetCurrentSessionResponse } from '@/models'

export default async function getCurrentSession(req: Request): Promise<Response> {
	const sessionValue = getSessionFromRequest(req)

	const { user, session } = await service.sessions.check(sessionValue)

	return getSuccessResponse({
		user,
		session: { id: session.id }
	} satisfies IGetCurrentSessionResponse)
}
