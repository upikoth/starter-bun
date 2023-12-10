import { logger } from '@internal/packages'

import environment from '@internal/environment'

import { responseNotFound } from '@internal/controller/http.cont'
import { migrateIfNeeded } from '@internal/repository/sqlite'

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
				const filePath = router.match(req)?.filePath

				if (typeof filePath !== 'string') {
					return responseNotFound
				}

				const module = await import(filePath)
			
				if (typeof module !== 'object' || typeof module.default !== 'function') {
					return responseNotFound
				}

				const handler = module.default

				return handler(req)
			}
		})
		logger.info('Сервис успешно запущен')
	} catch (err) {
		logger.error('Ошибка старта сервера', err)
		return
	}
}
