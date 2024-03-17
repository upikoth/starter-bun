import cookie from 'cookie'
import {
	expect, test, describe, mock
} from 'bun:test'
import examples from '@docs/examples'

import { AUTHORIZATION_HEADER, HttpMethod, ErorrStatusEnum } from '@/constants'

import { random } from '@/utils'

import mainExamples from '@/repository/main/docs/examples'

import { mainRequestHandler } from '@/app'

describe('/api/v1/sessions - Post', () => {
	test('При передаче корректного логина и пароля, сессия успешно создается', async () => {
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

	test('Если не передать одно из обязательных полей, вернется ошибка', async () => {
		const bodyJson = structuredClone(examples.requests.sessions.create.emailPassword)
		const requiredFieldNames = ['email', 'password'] as const

		delete bodyJson[requiredFieldNames[random(1)]]

		const request = new Request({
			url: 'https://example-host.ru/api/v1/sessions',
			method: HttpMethod.Post,
			body: JSON.stringify(bodyJson)
		})

		const response = await mainRequestHandler(request)

		expect(response.status).toBe(ErorrStatusEnum.BadRequest)
	})

	test('Если не передать body запроса, вернется ошибка', async () => {
		const request = new Request({
			url: 'https://example-host.ru/api/v1/sessions',
			method: HttpMethod.Post
		})

		const response = await mainRequestHandler(request)

		expect(response.status).toBe(ErorrStatusEnum.BadRequest)
	})

	test('Если передать не существующий email, вернется ошибка', async () => {
		mock.module('@/repository', () => ({
			default: {
				main: {
					users: {
						getByEmail: () => undefined
					}
				}
			}
		}))

		const request = new Request({
			url: 'https://example-host.ru/api/v1/sessions',
			method: HttpMethod.Post,
			body: JSON.stringify(examples.requests.sessions.create.emailPassword)
		})

		const response = await mainRequestHandler(request)
		const responseJson = await response.json()

		expect(responseJson).toMatchObject(examples.responses.sessions.create.wrongData)
	})

	test('Если передать некорректный пароль, вернется ошибка', async () => {
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

	test('Если заблокированный пользователь попытается авторизоваться, вернется ошибка', async () => {
		mock.module('@/repository', () => ({
			default: {
				main: {
					users: {
						getByEmail: () => mainExamples.responses.users.getByEmail.userBlockedSuccess
					}
				}
			}
		}))

		const request = new Request({
			url: 'https://example-host.ru/api/v1/sessions',
			method: HttpMethod.Post,
			body: JSON.stringify(examples.requests.sessions.create.emailPassword)
		})

		const response = await mainRequestHandler(request)

		expect(response.status).toBe(ErorrStatusEnum.BadRequest)
	})

	test('Если хэш созданной сессии уже существует, вернется ошибка', async () => {
		mock.module('@/repository', () => ({
			default: {
				main: {
					sessions: {
						getBySession: () => mainExamples.responses.sessions.getBySession.success,
						create: () => mainExamples.responses.sessions.create.success
					},
					users: {
						getByEmail: () => mainExamples.responses.users.getByEmail.userActiveSuccess
					}
				}
			}
		}))

		const request = new Request({
			url: 'https://example-host.ru/api/v1/sessions',
			method: HttpMethod.Post,
			body: JSON.stringify(examples.requests.sessions.create.emailPassword)
		})

		const response = await mainRequestHandler(request)

		expect(response.status).toBe(ErorrStatusEnum.BadRequest)
	})
})
