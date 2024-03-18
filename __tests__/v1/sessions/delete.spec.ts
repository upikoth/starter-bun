import {
	expect, test, describe, mock
} from 'bun:test'
import examples from '@docs/examples'

import { AUTHORIZATION_HEADER, ErorrStatusEnum, HttpMethod } from '@/constants'

import mainExamples from '@/repository/main/docs/examples'

import { mainRequestHandler } from '@/app'

describe('/api/v1/sessions/{id} - Delete', () => {
	test('Если не передать сессионный токен, метод вернет ответ что пользователь не авторизован', async () => {
		const request = new Request({
			url: 'https://example-host.ru/api/v1/sessions/1',
			method: HttpMethod.Delete
		})

		const response = await mainRequestHandler(request)
		const responseJson = await response.json()

		expect(response.status).toBe(ErorrStatusEnum.Unauthorized)
		expect(responseJson).toMatchObject(examples.default.responses.notAuthorized)
	})

	test('Если передать несуществующий id, метод вернет ответ что сессия не найдена', async () => {
		mock.module('@/repository', () => ({
			default: {
				main: {
					sessions: {
						getBySession: () => mainExamples.sessions.responses.getBySession.success,
						getById: () => undefined
					},
					users: {
						getById: () => mainExamples.users.responses.getById.userActiveSuccess
					}
				}
			}
		}))

		const request = new Request({
			url: 'https://example-host.ru/api/v1/sessions/1',
			method: HttpMethod.Delete,
			headers: {
				Cookie: `${AUTHORIZATION_HEADER}=session-test-example`
			}
		})

		const response = await mainRequestHandler(request)
		const responseJson = await response.json()

		expect(response.status).toBe(ErorrStatusEnum.BadRequest)
		expect(responseJson).toMatchObject(examples.sessions.responses.delete.notFound)
	})

	test('Если передать некорректную сессию, метод вернет ошибку валидации', async () => {
		mock.module('@/repository', () => ({
			default: {
				main: {
					sessions: {
						getBySession: () => mainExamples.sessions.responses.getBySession.success,
						getById: () => mainExamples.sessions.responses.getById.success
					},
					users: {
						getById: () => mainExamples.users.responses.getById.userActiveSuccess
					}
				}
			}
		}))

		const request = new Request({
			url: 'https://example-host.ru/api/v1/sessions/ddd',
			method: HttpMethod.Delete,
			headers: {
				Cookie: `${AUTHORIZATION_HEADER}=session-test-example`
			}
		})

		const response = await mainRequestHandler(request)

		expect(response.status).toBe(ErorrStatusEnum.BadRequest)
	})

	test(`Если передать токен пользователя с ролью User и свою сессию,
				метод вернет ответ что сессия удалена`, async () => {
		mock.module('@/repository', () => ({
			default: {
				main: {
					sessions: {
						getBySession: () => mainExamples.sessions.responses.getBySession.success,
						getById: () => mainExamples.sessions.responses.getById.success,
						deleteById: () => undefined
					},
					users: {
						getById: () => mainExamples.users.responses.getById.userActiveSuccess
					}
				}
			}
		}))

		const request = new Request({
			url: 'https://example-host.ru/api/v1/sessions/1',
			method: HttpMethod.Delete,
			headers: {
				Cookie: `${AUTHORIZATION_HEADER}=session-test-example`
			}
		})

		const response = await mainRequestHandler(request)
		const responseJson = await response.json()

		expect(response.status).toBe(ErorrStatusEnum.Success)
		expect(responseJson).toMatchObject(examples.default.responses.success)
	})

	test(`Если передать токен пользователя с ролью User и чужую сессию,
				метод вернет ответ что недостаточно прав`, async () => {
		mock.module('@/repository', () => ({
			default: {
				main: {
					sessions: {
						getBySession: () => mainExamples.sessions.responses.getBySession.success,
						getById: () => ({
							...mainExamples.sessions.responses.getById.success,
							userId: 2
						})
					},
					users: {
						getById: () => mainExamples.users.responses.getById.userActiveSuccess
					}
				}
			}
		}))

		const request = new Request({
			url: 'https://example-host.ru/api/v1/sessions/1',
			method: HttpMethod.Delete,
			headers: {
				Cookie: `${AUTHORIZATION_HEADER}=session-test-example`
			}
		})

		const response = await mainRequestHandler(request)
		const responseJson = await response.json()

		expect(response.status).toBe(ErorrStatusEnum.Forbidden)
		expect(responseJson).toMatchObject(examples.default.responses.forbidden)
	})

	test(`Если передать токен пользователя с ролью Admin и свою сессию,
				метод вернет ответ что сессия удалена`, async () => {
		mock.module('@/repository', () => ({
			default: {
				main: {
					sessions: {
						getBySession: () => mainExamples.sessions.responses.getBySession.success,
						getById: () => mainExamples.sessions.responses.getById.success,
						deleteById: () => undefined
					},
					users: {
						getById: () => mainExamples.users.responses.getById.adminActiveSuccess
					}
				}
			}
		}))

		const request = new Request({
			url: 'https://example-host.ru/api/v1/sessions/1',
			method: HttpMethod.Delete,
			headers: {
				Cookie: `${AUTHORIZATION_HEADER}=session-test-example`
			}
		})

		const response = await mainRequestHandler(request)
		const responseJson = await response.json()

		expect(response.status).toBe(ErorrStatusEnum.Success)
		expect(responseJson).toMatchObject(examples.default.responses.success)
	})

	test(`Если передать токен пользователя с ролью Admin и чужую сессию,
				метод вернет ответ что сессия удалена`, async () => {
		mock.module('@/repository', () => ({
			default: {
				main: {
					sessions: {
						getBySession: () => mainExamples.sessions.responses.getBySession.success,
						getById: () => ({
							...mainExamples.sessions.responses.getById.success,
							userId: 2
						}),
						deleteById: () => undefined
					},
					users: {
						getById: () => mainExamples.users.responses.getById.adminActiveSuccess
					}
				}
			}
		}))

		const request = new Request({
			url: 'https://example-host.ru/api/v1/sessions/1',
			method: HttpMethod.Delete,
			headers: {
				Cookie: `${AUTHORIZATION_HEADER}=session-test-example`
			}
		})

		const response = await mainRequestHandler(request)
		const responseJson = await response.json()

		expect(response.status).toBe(ErorrStatusEnum.Success)
		expect(responseJson).toMatchObject(examples.default.responses.success)
	})

	test(`Если передать токен пользователя с ролью SuperAdmin и свою сессию,
			метод вернет ответ что сессия удалена`, async () => {
		mock.module('@/repository', () => ({
			default: {
				main: {
					sessions: {
						getBySession: () => mainExamples.sessions.responses.getBySession.success,
						getById: () => mainExamples.sessions.responses.getById.success,
						deleteById: () => undefined
					},
					users: {
						getById: () => mainExamples.users.responses.getById.superAdminActiveSuccess
					}
				}
			}
		}))

		const request = new Request({
			url: 'https://example-host.ru/api/v1/sessions/1',
			method: HttpMethod.Delete,
			headers: {
				Cookie: `${AUTHORIZATION_HEADER}=session-test-example`
			}
		})

		const response = await mainRequestHandler(request)
		const responseJson = await response.json()

		expect(response.status).toBe(ErorrStatusEnum.Success)
		expect(responseJson).toMatchObject(examples.default.responses.success)
	})

	test(`Если передать токен пользователя с ролью SuperAdmin и чужую сессию,
			метод вернет ответ что сессия удалена`, async () => {
		mock.module('@/repository', () => ({
			default: {
				main: {
					sessions: {
						getBySession: () => mainExamples.sessions.responses.getBySession.success,
						getById: () => ({
							...mainExamples.sessions.responses.getById.success,
							userId: 2
						}),
						deleteById: () => undefined
					},
					users: {
						getById: () => mainExamples.users.responses.getById.superAdminActiveSuccess
					}
				}
			}
		}))

		const request = new Request({
			url: 'https://example-host.ru/api/v1/sessions/1',
			method: HttpMethod.Delete,
			headers: {
				Cookie: `${AUTHORIZATION_HEADER}=session-test-example`
			}
		})

		const response = await mainRequestHandler(request)
		const responseJson = await response.json()

		expect(response.status).toBe(ErorrStatusEnum.Success)
		expect(responseJson).toMatchObject(examples.default.responses.success)
	})
})
