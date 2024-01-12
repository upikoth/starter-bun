import { match } from 'path-to-regexp'
import cookie from 'cookie'

import { ErrorCodeEnum, ErorrStatusEnum, AUTHORIZATION_HEADER } from '@/constants'

import { checkIsCustomError } from '@/utils'

import { checkSession as checkSessionFromService } from '@/service'

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

	const parsedCookie = cookie.parse(req.headers.get('Cookie') || '')
	const session = parsedCookie[AUTHORIZATION_HEADER] || ''

	const route = routes.find((r) => match(r.pathname)(url.pathname) && r.method === req.method)

	if (!route) {
		throw {
			code: ErrorCodeEnum.UrlNotFound,
			status: ErorrStatusEnum.NotFound,
			description: 'Метод не найден'
		} satisfies ICustomError
	}

	if (route.authRequired) {
		if (!session) {
			throw {
				code: ErrorCodeEnum.Unauthorized,
				status: ErorrStatusEnum.Unauthorized,
				description: 'Пользователь не авторизован'
			} satisfies ICustomError
		}

		const { user } = await checkSessionFromService(session)
		const isRightsValid = await route.validateRights(req, user)

		if (!isRightsValid) {
			throw {
				code: ErrorCodeEnum.Forbidden,
				status: ErorrStatusEnum.Forbidden,
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
			ErorrStatusEnum.InternalServerError
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
