import {
	expect, test, describe, mock
} from 'bun:test'
import examples from '@docs/examples'

import { AUTHORIZATION_HEADER, ErrorStatusEnum, HttpMethod } from '@/constants'

import mainExamples from '@/repository/main/docs/examples'

import { mainRequestHandler } from '@/app'

describe('/api/v1/users - Get', () => {
	test('Если не передать сессионный токен, метод вернет ответ что пользователь не авторизован', async () => {
		const request = new Request({
			url: 'https://example-host.ru/api/v1/users',
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
			url: 'https://example-host.ru/api/v1/users',
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

		const query = (new URLSearchParams(examples.users.requests.getAll.wrong)).toString()

		const request = new Request({
			url: `https://example-host.ru/api/v1/users?${query}`,
			method: HttpMethod.Get,
			headers: {
				Cookie: `${AUTHORIZATION_HEADER}=session-test-example`
			}
		})

		const response = await mainRequestHandler(request)

		expect(response.status).toBe(ErrorStatusEnum.BadRequest)
	})

	test('Если передать токен пользователя с ролью Admin, метод вернет список пользователей', async () => {
		mock.module('@/repository', () => ({
			default: {
				main: {
					sessions: {
						getBySession: () => mainExamples.sessions.responses.getBySession.success
					},
					users: {
						getById: () => mainExamples.users.responses.getById.adminActiveSuccess,
						getAll: () => mainExamples.users.responses.getAll.success
					}
				}
			}
		}))

		const request = new Request({
			url: 'https://example-host.ru/api/v1/users',
			method: HttpMethod.Get,
			headers: {
				Cookie: `${AUTHORIZATION_HEADER}=session-test-example`
			}
		})

		const response = await mainRequestHandler(request)
		const responseJson = await response.json()

		expect(responseJson).toMatchObject(examples.users.responses.getAll.success)
	})

	test('Если передать токен пользователя с ролью SuperAdmin, метод вернет список пользователей', async () => {
		mock.module('@/repository', () => ({
			default: {
				main: {
					sessions: {
						getBySession: () => mainExamples.sessions.responses.getBySession.success
					},
					users: {
						getById: () => mainExamples.users.responses.getById.superAdminActiveSuccess,
						getAll: () => mainExamples.users.responses.getAll.success
					}
				}
			}
		}))

		const request = new Request({
			url: 'https://example-host.ru/api/v1/users',
			method: HttpMethod.Get,
			headers: {
				Cookie: `${AUTHORIZATION_HEADER}=session-test-example`
			}
		})

		const response = await mainRequestHandler(request)
		const responseJson = await response.json()

		expect(responseJson).toMatchObject(examples.users.responses.getAll.success)
	})
})
