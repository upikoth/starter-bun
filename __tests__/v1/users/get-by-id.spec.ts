import {
	expect, test, describe, mock
} from 'bun:test'
import examples from '@docs/examples'

import { AUTHORIZATION_HEADER, ErrorStatusEnum, HttpMethod } from '@/constants'

import mainExamples from '@/repository/main/docs/examples'

import { mainRequestHandler } from '@/app'

describe('/api/v1/users/:id - Get', () => {
	test('Если не передать сессионный токен, метод вернет ответ что пользователь не авторизован', async () => {
		const request = new Request({
			url: 'https://example-host.ru/api/v1/users/1',
			method: HttpMethod.Get
		})

		const response = await mainRequestHandler(request)
		const responseJson = await response.json()

		expect(responseJson).toMatchObject(examples.default.responses.notAuthorized)
	})

	test(`Если передать токен пользователя с ролью User, метод вернет успешный ответ,
				если пользователь запрашивает информацию о себе`, async () => {
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

		const currentUserId = mainExamples.users.responses.getById.userActiveSuccess.id

		const request = new Request({
			url: `https://example-host.ru/api/v1/users/${currentUserId}`,
			method: HttpMethod.Get,
			headers: {
				Cookie: `${AUTHORIZATION_HEADER}=session-test-example`
			}
		})

		const response = await mainRequestHandler(request)
		const responseJson = await response.json()

		expect(responseJson).toMatchObject(examples.users.responses.getById.userActiveSuccess)
	})

	test(`Если передать токен пользователя с ролью User, метод вернет ошибку
				если пользователь запрашивает информацию о других пользователях`, async () => {
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

		const anotherUserId = mainExamples.users.responses.getById.userActiveSuccess.id + 1

		const request = new Request({
			url: `https://example-host.ru/api/v1/users/${anotherUserId}`,
			method: HttpMethod.Get,
			headers: {
				Cookie: `${AUTHORIZATION_HEADER}=session-test-example`
			}
		})

		const response = await mainRequestHandler(request)
		const responseJson = await response.json()

		expect(responseJson).toMatchObject(examples.default.responses.forbidden)
	})

	test('Если передать некорректно id, вернется ошибка', async () => {
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

		const request = new Request({
			url: 'https://example-host.ru/api/v1/users/wrong-id-example',
			method: HttpMethod.Get,
			headers: {
				Cookie: `${AUTHORIZATION_HEADER}=session-test-example`
			}
		})

		const response = await mainRequestHandler(request)

		expect(response.status).toBe(ErrorStatusEnum.BadRequest)
	})

	test('Если передать токен пользователя с ролью Admin, метод вернет информацию о любом пользователе', async () => {
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

		const request = new Request({
			url: 'https://example-host.ru/api/v1/users/10',
			method: HttpMethod.Get,
			headers: {
				Cookie: `${AUTHORIZATION_HEADER}=session-test-example`
			}
		})

		const response = await mainRequestHandler(request)
		const responseJson = await response.json()

		expect(responseJson).toMatchObject(examples.users.responses.getById.adminActiveSuccess)
	})

	test(`Если передать токен пользователя с ролью Admin и запросить информацию о несуществующем пользователе,
				метод вернет ошибку`, async () => {
		mock.module('@/repository', () => ({
			default: {
				main: {
					sessions: {
						getBySession: () => mainExamples.sessions.responses.getBySession.success
					},
					users: {
						getById: () => undefined
					}
				}
			}
		}))

		const request = new Request({
			url: 'https://example-host.ru/api/v1/users/10',
			method: HttpMethod.Get,
			headers: {
				Cookie: `${AUTHORIZATION_HEADER}=session-test-example`
			}
		})

		const response = await mainRequestHandler(request)

		expect(response.status).toBe(ErrorStatusEnum.BadRequest)
	})

	test('Если передать токен пользователя с ролью SuperAdmin, метод вернет список пользователей', async () => {
		mock.module('@/repository', () => ({
			default: {
				main: {
					sessions: {
						getBySession: () => mainExamples.sessions.responses.getBySession.success
					},
					users: {
						getById: () => mainExamples.users.responses.getById.superAdminActiveSuccess
					}
				}
			}
		}))

		const request = new Request({
			url: 'https://example-host.ru/api/v1/users/10',
			method: HttpMethod.Get,
			headers: {
				Cookie: `${AUTHORIZATION_HEADER}=session-test-example`
			}
		})

		const response = await mainRequestHandler(request)
		const responseJson = await response.json()

		expect(responseJson).toMatchObject(examples.users.responses.getById.superAdminActiveSuccess)
	})
})
