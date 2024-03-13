import {
	expect, test, describe, mock
} from 'bun:test'
import examples from '@docs/examples'

import { AUTHORIZATION_HEADER } from '@/constants'

import mainExamples from '@/repository/main/docs/examples'

import { mainRequestHandler } from '@/app'

mock.module('@/repository', () => ({
	default: {
		main: {
			sessions: {
				getBySession: () => mainExamples.responses.sessions.getBySession.success
			},
			users: {
				getById: () => mainExamples.responses.users.getById.userActiveSuccess
			}
		}
	}
}))

describe('/api/v1/session', () => {
	test('Получение данных пользователя', async () => {
		const request = new Request({
			url: 'https://example-host.ru/api/v1/session',
			headers: {
				Cookie: `${AUTHORIZATION_HEADER}=session-test-example`
			}
		})

		const response = await mainRequestHandler(request)
		const responseJson = await response.json()

		expect(responseJson).toMatchObject(examples.responses.sessions.getCurrentSession.success)
	})

	test('Пользователь не авторизован', async () => {
		const request = new Request({
			url: 'https://example-host.ru/api/v1/session'
		})

		const response = await mainRequestHandler(request)
		const responseJson = await response.json()

		expect(responseJson).toMatchObject(examples.responses.default.notAuthorized)
	})
})
