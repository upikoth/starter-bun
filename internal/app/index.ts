import { logger } from '@internal/packages'

import environment from '@internal/environment'

import { getHttpResponse } from '@internal/controller'
import { migrateIfNeeded } from '@internal/repository/sqlite'

import middlewares from './middlewares'

export function startServer(): void {
	try {
		migrateIfNeeded()
	} catch (err) {
		logger.error('Ошибка миграций БД', err)
		return
	}

	try {
		Bun.serve({
			port: environment.APP_PORT,
			async fetch(req) {
				const responsePromise = getHttpResponse(req)

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
