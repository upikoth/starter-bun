import {
	expect, test, describe, mock
} from 'bun:test'
import examples from '@docs/examples'

import { AUTHORIZATION_HEADER, HttpMethod } from '@/constants'

import mainExamples from '@/repository/main/docs/examples'

import { mainRequestHandler } from '@/app'

mock.module('@/repository', () => ({
	default: {
		main: {
			sessions: {
				getBySession: () => mainExamples.sessions.responses.getBySession.success
			},
			users: {
				getById: () => mainExamples.users.responses.getById.userActiveSuccess
			}
		}
	}
}))

describe('/api/v1/session - Get', () => {
	test('Если передать корректную сессию, вернется подробная информация о сессии пользователя', async () => {
		const request = new Request({
			url: 'https://example-host.ru/api/v1/session',
			method: HttpMethod.Get,
			headers: {
				Cookie: `${AUTHORIZATION_HEADER}=session-test-example`
			}
		})

		const response = await mainRequestHandler(request)
		const responseJson = await response.json()

		expect(responseJson).toMatchObject(examples.sessions.responses.getCurrentSession.success)
	})

	test('Если не передать сессионный токен, метод вернет ответ что пользователь не авторизован', async () => {
		const request = new Request({
			url: 'https://example-host.ru/api/v1/session',
			method: HttpMethod.Get
		})

		const response = await mainRequestHandler(request)
		const responseJson = await response.json()

		expect(responseJson).toMatchObject(examples.default.responses.notAuthorized)
	})
})
