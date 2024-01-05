import { ErrorCodeEnum, ErorrStatusEnum } from '@/constants'

import {
	getSessions as getSessionsDb
} from '@/repository'

import type {
	IGetSessionsRequest,
	ICustomError,
	IGetSessionsResponseSession
} from '@/models'

import {
	validateGetSessionsRequestData
} from './validators'

export default async function getSessions(
	data: IGetSessionsRequest
): Promise<{ sessions: IGetSessionsResponseSession[], total: number }> {
	const validationError = validateGetSessionsRequestData(data)

	if (validationError) {
		throw {
			code: ErrorCodeEnum.ValidationError,
			status: ErorrStatusEnum.BadRequest,
			description: validationError
		} satisfies ICustomError
	}

	const dbSessions = await getSessionsDb(data)

	return {
		...dbSessions,
		sessions: dbSessions.sessions.map((s) => ({
			id: s.id,
			userId: s.userId
		}))
	}
}
