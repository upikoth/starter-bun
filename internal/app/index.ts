import { logger } from '@internal/packages'

import environment from '@internal/environment'

import { responseNotFound, getSuccessResponse, getErrorResponse } from '@internal/controller/http.const'
import { migrateIfNeeded } from '@internal/repository/sqlite'

import { ErrorCodeEnum, ErorrStatusEnum } from '@internal/constants'
import type { ICustomError } from '@internal/models'

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
				const url = new URL(req.url)
				const query = url.search
				const body = await req.clone().text()

				logger.info(`request: ${url.pathname}`, {
					query,
					body
				})

				const filePath = router.match(req)?.filePath
				const params = router.match(req)?.params

				if (typeof filePath !== 'string') {
					return responseNotFound
				}

				const module = await import(filePath)

				if (typeof module !== 'object' || typeof module.default !== 'function') {
					return responseNotFound
				}

				const handler = module.default

				try {
					const responseData = await handler(req, params)
					logger.info(`response: ${url.pathname}`, { responseData })

					return getSuccessResponse(responseData)
				} catch (err) {
					logger.error(`response: ${url.pathname}`, err)

					return getErrorResponseFromError(err)
				}
			}
		})

		logger.info('Сервис успешно запущен')
	} catch (err) {
		logger.error('Ошибка старта сервера', err)
		return
	}
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
