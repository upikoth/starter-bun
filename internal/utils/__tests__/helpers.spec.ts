import { expect, test } from 'bun:test'

import { random } from '@/utils'

test('Проверяет что random возвращает число и оно в заданном диапазоне', () => {
	const maxValue = 5
	const result = random(maxValue)

	expect(result).toBeNumber()
	expect(result).toBeGreaterThanOrEqual(0)
	expect(result).toBeLessThanOrEqual(maxValue)
})
