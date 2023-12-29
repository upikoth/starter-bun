import { logger } from '@internal/packages'

import environment from '@internal/environment'

import { getErrorResponse, errorNotFound } from '@internal/controller/http.const'
import { migrateIfNeeded } from '@internal/repository/sqlite'

import { ErrorCodeEnum, ErorrStatusEnum } from '@internal/constants'
import type { ICustomError } from '@internal/models'

import middlewares from './middlewares'
import { FileSystemRouter } from 'bun'

export function startServer(): void {
	try {
		migrateIfNeeded()
	} catch (err) {
		logger.error('Ошибка миграций БД', err)
		return
	}

	try {
		const router = new Bun.FileSystemRouter({
			style: 'nextjs',
			dir: 'internal/controller'
		})

		Bun.serve({
			port: environment.APP_PORT,
			async fetch(req) {
				const responsePromise = getResponse(req, router)

				middlewares.forEach(middleware => {
					middleware(req, responsePromise)
				})

				const response = await responsePromise
				return response
			}
		})

		logger.info('Сервис успешно запущен')
	} catch (err) {
		logger.error('Ошибка старта сервера', err)
		return
	}
}

async function getResponse(req: Request, router: FileSystemRouter): Promise<Response>  {
	try {
		const params = router.match(req)?.params

		const requestHandler = await getRequestHandler(req, router)
		const response = await requestHandler(req, params)

		return response
	} catch (err) {
		return getErrorResponseFromError(err)
	}
}

async function getRequestHandler(req: Request, router: FileSystemRouter) {
	const filePath = router.match(req)?.filePath

	if (typeof filePath !== 'string') {
		throw errorNotFound
	}

	const module = await import(filePath)

	if (typeof module !== 'object' || typeof module.default !== 'function') {
		throw errorNotFound
	}

	return module.default
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
