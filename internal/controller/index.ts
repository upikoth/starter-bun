import { match } from 'path-to-regexp'

import { ErrorCodeEnum, ErorrStatusEnum } from '@internal/constants'
import type { ICustomError } from '@internal/models'

import routes from './router'
import { getErrorResponse } from './http.utils'

export async function getHttpResponse(req: Request): Promise<Response>  {
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

	const route = routes.find(r => match(r.pathname)(url.pathname) && r.method === req.method)

	if (!route) {
		throw {
			code: ErrorCodeEnum.UrlNotFound,
			status: ErorrStatusEnum.NotFound,
			description: 'Метод не найден'
		} satisfies ICustomError
	}

	return route.handler
}

function getErrorResponseFromError(err: unknown): Response {
	if (!checkIsCustomError(err)) {
		return getErrorResponse(
			{
				code: ErrorCodeEnum.Unknown,
				description: 'Неизвестная ошибка'
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

function checkIsCustomError(error: unknown): error is ICustomError {
	return typeof error === 'object' &&
		typeof (error as ICustomError).description === 'string' &&
		typeof (error as ICustomError).status === 'number' &&
		typeof (error as ICustomError).code === 'number'
}

