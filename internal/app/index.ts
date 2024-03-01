import * as Sentry from '@sentry/bun'

import environment, { loadEnvironmentVariables } from '@/environment'

import { logger, initLogger } from '@/packages'

import { getHttpResponse } from '@/controller'

import repository from '@/repository'

import middlewares from './middlewares'

export function startServer(): void {
	loadEnvironmentVariables()
	initLogger({
		appName: environment.APP_NAME,
		environment: environment.NODE_ENV
	})
	Sentry.init({
		dsn: 'https://de1dbb6c90dba6fb674035f6daf034cd@o1149686.ingest.sentry.io/4506837135720448',
		tracesSampleRate: 1.0,
		environment: environment.NODE_ENV
	})

	try {
		repository.main.utils.migrateIfNeeded()
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
