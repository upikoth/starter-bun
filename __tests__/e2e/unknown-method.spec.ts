import { expect, test } from 'bun:test'

import { getActiveServer } from '../index'
import unknownMethodResponse from '../../docs/examples/responses/common/unknown-method.json'

test('Проверка ответа на неизвестный запрос', async () => {
	const server = getActiveServer()

	const response = await server.fetch(`${server.url.origin}/api/v1/unknown-method`)
	const responseJson = await response.json()

	expect(responseJson).toMatchObject(unknownMethodResponse)
})
