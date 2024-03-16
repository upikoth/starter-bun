import { expect, test } from 'bun:test'
import examples from '@docs/examples'

import { HttpMethod } from '@/constants'

import { mainRequestHandler } from '@/app'

test('Если передать несуществующий запрос, вернется 404 ошибка', async () => {
	const request = new Request({
		url: 'https://example-host.ru/api/v1/404',
		method: HttpMethod.Get
	})

	const response = await mainRequestHandler(request)
	const responseJson = await response.json()

	expect(responseJson).toMatchObject(examples.responses.default.notFound)
})
