import { Server } from 'bun'

import { startServer } from '@/app'

let server: Server | null = null

export function getActiveServer(): Server {
	if (server) {
		return server
	}

	server = startServer()

	if (!server) {
		throw new Error('Не удалось запустить сервер во время тестирования')
	}

	return server
}
