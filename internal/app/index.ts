import environment, { loadEnvironmentVariables } from '@/environment'

import { logger } from '@/packages'

import { getHttpResponse } from '@/controller'

import { migrateIfNeeded } from '@/repository/sqlite'

import middlewares from './middlewares'

export function startServer(): void {
	try {
		migrateIfNeeded()
	} catch (err) {
		logger.error('Ошибка миграций БД', err)
		return
	}

	try {
		loadEnvironmentVariables()
	} catch (err) {
		logger.error('Ошибка загрузки env переменных', err)
		return
	}

	try {
		Bun.serve({
			port: environment.APP_PORT,
			async fetch(req) {
				const responsePromise = getHttpResponse(req)

				middlewares.forEach((middleware) => {
					middleware(req, responsePromise)
				})

				const response = await responsePromise
				return response
			}
		})

		logger.info('Сервис успешно запущен')
	} catch (err) {
		logger.error('Ошибка старта сервера', err)
	}
}
