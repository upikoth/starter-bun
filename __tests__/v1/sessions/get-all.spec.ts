import {
	expect, test, describe, mock
} from 'bun:test'
import examples from '@docs/examples'

import { AUTHORIZATION_HEADER, ErrorStatusEnum, HttpMethod } from '@/constants'

import mainExamples from '@/repository/main/docs/examples'

import { mainRequestHandler } from '@/app'

describe('/api/v1/sessions - Get', () => {
	test('Если не передать сессионный токен, метод вернет ответ что пользователь не авторизован', async () => {
		const request = new Request({
			url: 'https://example-host.ru/api/v1/session',
			method: HttpMethod.Get
		})

		const response = await mainRequestHandler(request)
		const responseJson = await response.json()

		expect(responseJson).toMatchObject(examples.default.responses.notAuthorized)
	})

	test('Если передать токен пользователя с ролью User, метод вернет ответ что недостаточно прав', async () => {
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

		const request = new Request({
			url: 'https://example-host.ru/api/v1/sessions',
			method: HttpMethod.Get,
			headers: {
				Cookie: `${AUTHORIZATION_HEADER}=session-test-example`
			}
		})

		const response = await mainRequestHandler(request)
		const responseJson = await response.json()

		expect(responseJson).toMatchObject(examples.default.responses.forbidden)
	})

	test('Если передать некорректно limit или offset, вернется ошибка', async () => {
		mock.module('@/repository', () => ({
			default: {
				main: {
					sessions: {
						getBySession: () => mainExamples.sessions.responses.getBySession.success
					},
					users: {
						getById: () => mainExamples.users.responses.getById.adminActiveSuccess
					}
				}
			}
		}))

		const query = (new URLSearchParams(examples.sessions.requests.getAll.wrong)).toString()

		const request = new Request({
			url: `https://example-host.ru/api/v1/sessions?${query}`,
			method: HttpMethod.Get,
			headers: {
				Cookie: `${AUTHORIZATION_HEADER}=session-test-example`
			}
		})

		const response = await mainRequestHandler(request)

		expect(response.status).toBe(ErrorStatusEnum.BadRequest)
	})

	test('Если передать токен пользователя с ролью Admin, метод вернет список сессий', async () => {
		mock.module('@/repository', () => ({
			default: {
				main: {
					sessions: {
						getBySession: () => mainExamples.sessions.responses.getBySession.success,
						getAll: () => mainExamples.sessions.responses.getAll.success
					},
					users: {
						getById: () => mainExamples.users.responses.getById.adminActiveSuccess
					}
				}
			}
		}))

		const request = new Request({
			url: 'https://example-host.ru/api/v1/sessions',
			method: HttpMethod.Get,
			headers: {
				Cookie: `${AUTHORIZATION_HEADER}=session-test-example`
			}
		})

		const response = await mainRequestHandler(request)
		const responseJson = await response.json()

		expect(responseJson).toMatchObject(examples.sessions.responses.getAll.success)
	})

	test('Если передать токен пользователя с ролью SuperAdmin, метод вернет список сессий', async () => {
		mock.module('@/repository', () => ({
			default: {
				main: {
					sessions: {
						getBySession: () => mainExamples.sessions.responses.getBySession.success,
						getAll: () => mainExamples.sessions.responses.getAll.success
					},
					users: {
						getById: () => mainExamples.users.responses.getById.superAdminActiveSuccess
					}
				}
			}
		}))

		const request = new Request({
			url: 'https://example-host.ru/api/v1/sessions',
			method: HttpMethod.Get,
			headers: {
				Cookie: `${AUTHORIZATION_HEADER}=session-test-example`
			}
		})

		const response = await mainRequestHandler(request)
		const responseJson = await response.json()

		expect(responseJson).toMatchObject(examples.sessions.responses.getAll.success)
	})
})
