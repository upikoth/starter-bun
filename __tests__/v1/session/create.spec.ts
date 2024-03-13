import cookie from 'cookie'
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
				getBySession: () => undefined,
				create: () => mainExamples.responses.sessions.create.success
			},
			users: {
				getByEmail: () => mainExamples.responses.users.getByEmail.userActiveSuccess
			}
		}
	}
}))

describe('/api/v1/sessions - Post', () => {
	test('Сессия успешно создана', async () => {
		const request = new Request({
			url: 'https://example-host.ru/api/v1/sessions',
			method: HttpMethod.Post,
			body: JSON.stringify(examples.requests.sessions.create.emailPassword)
		})

		const response = await mainRequestHandler(request)
		const responseJson = await response.json()

		const parsedSetCookieObject = cookie.parse(response.headers.get('Set-Cookie') || '')

		expect(parsedSetCookieObject[AUTHORIZATION_HEADER]).toBeString()
		expect(responseJson).toMatchObject(examples.responses.sessions.create.success)
	})

	test('Некорректно указаны логин или пароль', async () => {
		const request = new Request({
			url: 'https://example-host.ru/api/v1/sessions',
			method: HttpMethod.Post,
			body: JSON.stringify({
				...examples.requests.sessions.create.emailPassword,
				password: 'wrong-password'
			})
		})

		const response = await mainRequestHandler(request)
		const responseJson = await response.json()

		expect(responseJson).toMatchObject(examples.responses.sessions.create.wrongData)
	})
})
