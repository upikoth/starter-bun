import {
	expect, test, describe
} from 'bun:test'
import defaultNotAuthorized from '@docs/examples/default/401.json'

import { mainRequestHandler } from '@/app'

describe('/api/v1/session', () => {
	test('Пользователь не авторизован', async () => {
		const request = new Request({
			url: 'https://example-host.ru/api/v1/session'
		})

		const response = await mainRequestHandler(request)
		const responseJson = await response.json()

		expect(responseJson).toMatchObject(defaultNotAuthorized)
	})
})
