import environment, { loadEnvironmentVariables } from '@/environment'

import { logger, initLogger } from '@/packages'

import { getHttpResponse } from '@/controller'

import { migrateIfNeeded } from '@/repository/main/sqlite'

import middlewares from './middlewares'

export function startServer(): void {
	loadEnvironmentVariables()
	initLogger({
		appName: environment.APP_NAME,
		environment: environment.NODE_ENV
	})

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
