import { expect, test } from 'bun:test'
import defaultSuccess from '@docs/examples/default/200.json'

import { mainRequestHandler } from '@/app'

test('/api/v1/health', async () => {
	const request = new Request({
		url: 'https://example-host.ru/api/v1/health'
	})

	const response = await mainRequestHandler(request)
	const responseJson = await response.json()

	expect(responseJson).toMatchObject(defaultSuccess)
})
