import { expect, test } from 'bun:test'
import defaultNotFound from '@docs/examples/default/404.json'

import { mainRequestHandler } from '@/app'

test('Проверка ответа на неизвестный запрос', async () => {
	const request = new Request({
		url: 'https://example-host.ru/api/v1/404'
	})

	const response = await mainRequestHandler(request)
	const responseJson = await response.json()

	expect(responseJson).toMatchObject(defaultNotFound)
})
