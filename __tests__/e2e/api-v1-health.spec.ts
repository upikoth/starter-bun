import { expect, test } from 'bun:test'

import { getActiveServer } from '../index'
import successResponse from '../../docs/examples/success-response.json'

test('/api/v1/health', async () => {
	const server = getActiveServer()

	const response = await server.fetch(`${server.url.origin}/api/v1/health`)
	const responseJson = await response.json()

	expect(responseJson).toMatchObject(successResponse)
})
