import { match } from 'path-to-regexp'

import { ErrorCodeEnum, ErrorStatusEnum } from '@/constants'

import { checkIsCustomError, getSessionFromRequest } from '@/utils'

import service from '@/service'

import type { ICustomError } from '@/models'

import routes from './router'
import { getErrorResponse } from './http.utils'

export async function getHttpResponse(req: Request): Promise<Response> {
	try {
		const requestHandler = await getRequestHandler(req)
		const response = await requestHandler(req)

		return response
	} catch (err) {
		return getErrorResponseFromError(err)
	}
}

async function getRequestHandler(req: Request) {
	const url = new URL(req.url)

	const session = getSessionFromRequest(req)

	const route = routes.find((r) => match(r.pathname)(url.pathname) && r.method === req.method)

	if (!route) {
		throw {
			code: ErrorCodeEnum.UrlNotFound,
			status: ErrorStatusEnum.NotFound,
			description: 'Метод не найден'
		} satisfies ICustomError
	}

	if (route.authRequired) {
		if (!session) {
			throw {
				code: ErrorCodeEnum.Unauthorized,
				status: ErrorStatusEnum.Unauthorized,
				description: 'Пользователь не авторизован'
			} satisfies ICustomError
		}

		const { user } = await service.sessions.check(session)
		const isRightsValid = await route.validateRights(req, user)

		if (!isRightsValid) {
			throw {
				code: ErrorCodeEnum.Forbidden,
				status: ErrorStatusEnum.Forbidden,
				description: 'Недостаточно прав'
			} satisfies ICustomError
		}
	}

	return route.handler
}

function getErrorResponseFromError(err: unknown): Response {
	if (!checkIsCustomError(err)) {
		return getErrorResponse(
			{
				code: ErrorCodeEnum.Unknown,
				description: String(err)
			},
			ErrorStatusEnum.InternalServerError
		)
	}

	return getErrorResponse(
		{
			code: err.code,
			description: err.description
		},
		err.status
	)
}
