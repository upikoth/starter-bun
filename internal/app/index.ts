import * as Sentry from '@sentry/bun'
import type { Server } from 'bun'

import environment, { loadEnvironmentVariables } from '@/environment'

import { logger, initLogger } from '@/packages'

import { getHttpResponse } from '@/controller'

import repository from '@/repository'

import middlewares from './middlewares'

export function mainRequestHandler(req: Request) {
	const responsePromise = getHttpResponse(req)

	middlewares.forEach((middleware) => {
		middleware(req, responsePromise)
	})

	return responsePromise
}

export function startServer(): Server | null {
	loadEnvironmentVariables()
	initLogger({
		appName: environment.APP_NAME,
		environment: environment.NODE_ENV
	})
	Sentry.init({
		dsn: environment.SENTRY_DNS,
		tracesSampleRate: 1.0,
		environment: environment.NODE_ENV
	})

	try {
		repository.main.utils.migrateIfNeeded()
	} catch (err) {
		logger.error('Ошибка миграций БД', err)
		return null
	}

	let server: Server | null = null

	try {
		server = Bun.serve({
			port: environment.APP_PORT,
			async fetch(req) {
				return mainRequestHandler(req)
			}
		})

		logger.info('Сервис успешно запущен')
	} catch (err) {
		logger.error('Ошибка старта сервера', err)
	}

	return server
}
