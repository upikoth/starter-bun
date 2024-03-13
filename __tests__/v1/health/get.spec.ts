import { expect, test } from 'bun:test'
import examples from '@docs/examples'

import { HttpMethod } from '@/constants'

import { mainRequestHandler } from '@/app'

test('/api/v1/health - Get', async () => {
	const request = new Request({
		url: 'https://example-host.ru/api/v1/health',
		method: HttpMethod.Get
	})

	const response = await mainRequestHandler(request)
	const responseJson = await response.json()

	expect(responseJson).toMatchObject(examples.responses.default.success)
})
