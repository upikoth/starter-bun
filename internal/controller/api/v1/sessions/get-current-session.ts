import { getSessionFromRequest } from '@/utils'

import { getSuccessResponse } from '@/controller/http.utils'

import { checkSession as checkSessionFromService } from '@/service'

import type { IGetCurrentSessionResponse } from '@/models'

export default async function getCurrentSession(req: Request): Promise<Response> {
	const sessionValue = getSessionFromRequest(req)

	const { user, session } = await checkSessionFromService(sessionValue)

	return getSuccessResponse({
		user,
		session: { id: session.id }
	} satisfies IGetCurrentSessionResponse)
}
