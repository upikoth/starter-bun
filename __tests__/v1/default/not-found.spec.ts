import { expect, test } from 'bun:test'
import examples from '@docs/examples'

import { mainRequestHandler } from '@/app'

test('Проверка ответа на неизвестный запрос', async () => {
	const request = new Request({
		url: 'https://example-host.ru/api/v1/404'
	})

	const response = await mainRequestHandler(request)
	const responseJson = await response.json()

	expect(responseJson).toMatchObject(examples.responses.default.notFound)
})
