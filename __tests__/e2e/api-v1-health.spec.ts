import { expect, test } from 'bun:test'

import { getActiveServer } from '../index'
import defaultSuccess from '../../docs/examples/default/200.json'

test('/api/v1/health', async () => {
	const server = getActiveServer()

	const response = await server.fetch(`${server.url.origin}/api/v1/health`)
	const responseJson = await response.json()

	expect(responseJson).toMatchObject(defaultSuccess)
})
