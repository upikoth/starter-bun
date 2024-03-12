import { expect, test } from 'bun:test'

import { AUTHORIZATION_HEADER } from '@/constants'

import { getSessionFromRequest } from '@/utils'

test('Проверяет что getSessionFromRequest возвращает значение сессии, если передать ее в cookie', () => {
	const sessionValue = 'sessionValueDummy'

	const req = new Request({
		url: 'http://localhost:8080/dummy-url',
		headers: {
			Cookie: `${AUTHORIZATION_HEADER}=${sessionValue}`
		}
	})

	expect(getSessionFromRequest(req)).toBe(sessionValue)
})

test(`Проверяет что getSessionFromRequest возвращает значение сессии,
			если передать ее в header SwaggerAuthorization`, () => {
	const sessionValue = 'sessionValueDummy'

	const req = new Request({
		url: 'http://localhost:8080/dummy-url',
		headers: {
			SwaggerAuthorization: sessionValue
		}
	})

	expect(getSessionFromRequest(req)).toBe(sessionValue)
})
