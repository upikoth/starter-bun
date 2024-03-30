import {
	expect, test, describe, mock
} from 'bun:test'
import examples from '@docs/examples'

import { AUTHORIZATION_HEADER, HttpMethod, ErorrStatusEnum } from '@/constants'

import { random } from '@/utils'

import mainExamples from '@/repository/main/docs/examples'

import { mainRequestHandler } from '@/app'

describe('/api/v1/users - Post', () => {
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
			method: HttpMethod.Post,
			headers: {
				Cookie: `${AUTHORIZATION_HEADER}=session-test-example`
			},
			body: JSON.stringify(examples.users.requests.create)
		})

		const response = await mainRequestHandler(request)
		const responseJson = await response.json()

		expect(responseJson).toMatchObject(examples.default.responses.forbidden)
	})

	test('Если передать токен пользователя с ролью Admin, метод вернет ответ что недостаточно прав', async () => {
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
			url: 'https://example-host.ru/api/v1/users',
			method: HttpMethod.Post,
			headers: {
				Cookie: `${AUTHORIZATION_HEADER}=session-test-example`
			},
			body: JSON.stringify(examples.users.requests.create)
		})

		const response = await mainRequestHandler(request)
		const responseJson = await response.json()

		expect(responseJson).toMatchObject(examples.default.responses.forbidden)
	})

	test(`Если передать токен пользователя с ролью SuperAdmin и запрос на создание с существующей почтой в системе,
			метод вернет ошибку, что пользователь уже существует`, async () => {
		mock.module('@/repository', () => ({
			default: {
				main: {
					sessions: {
						getBySession: () => mainExamples.sessions.responses.getBySession.success
					},
					users: {
						getById: () => mainExamples.users.responses.getById.superAdminActiveSuccess,
						getByEmail: () => mainExamples.users.responses.getByEmail.userActiveSuccess
					}
				}
			}
		}))

		const request = new Request({
			url: 'https://example-host.ru/api/v1/users',
			method: HttpMethod.Post,
			headers: {
				Cookie: `${AUTHORIZATION_HEADER}=session-test-example`
			},
			body: JSON.stringify(examples.users.requests.create.valid)
		})

		const response = await mainRequestHandler(request)
		const responseJson = await response.json()

		expect(responseJson).toMatchObject(examples.users.responses.create.userAlreadyExist)
	})

	test(`Если передать токен пользователя с ролью SuperAdmin и валидный запрос,
				новый пользователь будет успешно создан`, async () => {
		mock.module('@/repository', () => ({
			default: {
				main: {
					sessions: {
						getBySession: () => mainExamples.sessions.responses.getBySession.success
					},
					users: {
						getById: () => mainExamples.users.responses.getById.superAdminActiveSuccess,
						getByEmail: () => undefined,
						create: () => mainExamples.users.responses.create.userActiveSuccess
					}
				}
			}
		}))

		const request = new Request({
			url: 'https://example-host.ru/api/v1/users',
			method: HttpMethod.Post,
			headers: {
				Cookie: `${AUTHORIZATION_HEADER}=session-test-example`
			},
			body: JSON.stringify(examples.users.requests.create.valid)
		})

		const response = await mainRequestHandler(request)
		const responseJson = await response.json()

		expect(responseJson).toMatchObject(examples.users.responses.create.success)
	})

	test('Если не передать одно из обязательных полей, вернется ошибка', async () => {
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

		const bodyJson = structuredClone(examples.users.requests.create.valid)
		const requiredFieldNames = ['email', 'password'] as const

		delete bodyJson[requiredFieldNames[random(1)]]

		const request = new Request({
			url: 'https://example-host.ru/api/v1/users',
			method: HttpMethod.Post,
			headers: {
				Cookie: `${AUTHORIZATION_HEADER}=session-test-example`
			},
			body: JSON.stringify(bodyJson)
		})

		const response = await mainRequestHandler(request)

		expect(response.status).toBe(ErorrStatusEnum.BadRequest)
	})

	test('Если не передать body запроса, вернется ошибка', async () => {
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
			url: 'https://example-host.ru/api/v1/users',
			method: HttpMethod.Post,
			headers: {
				Cookie: `${AUTHORIZATION_HEADER}=session-test-example`
			}
		})

		const response = await mainRequestHandler(request)

		expect(response.status).toBe(ErorrStatusEnum.BadRequest)
	})
})
