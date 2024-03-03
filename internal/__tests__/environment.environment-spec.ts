import { expect, test } from 'bun:test'

import { loadEnvironmentVariables } from '@/environment'

test('Проверяет что переменные окружения установлены', async () => {
	let isEnvironmentVariablesLoadedWithoutErrors = true

	try {
		await loadEnvironmentVariables()
	} catch {
		isEnvironmentVariablesLoadedWithoutErrors = false
	}

	expect(isEnvironmentVariablesLoadedWithoutErrors).toBeTrue()
})
