import { expect, test } from 'bun:test'

import { getActiveServer } from '../index'
import defaultNotFound from '../../docs/examples/default/404.json'

test('Проверка ответа на неизвестный запрос', async () => {
	const server = getActiveServer()

	const response = await server.fetch(`${server.url.origin}/api/v1/404`)
	const responseJson = await response.json()

	expect(responseJson).toMatchObject(defaultNotFound)
})
