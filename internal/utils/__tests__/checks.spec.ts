import { expect, test } from 'bun:test'

import { ErrorStatusEnum, ErrorCodeEnum } from '@/constants'

import { checkIsCustomError } from '@/utils'

import type { ICustomError } from '@/models'

test('Проверяет что checkIsCustomError возвращает true, если ошибка соответствует ICustomError', () => {
	const error: ICustomError = {
		description: 'test@test.ru',
		code: ErrorCodeEnum.ValidationError,
		status: ErrorStatusEnum.BadRequest
	}

	expect(checkIsCustomError(error)).toBe(true)
})

test('Проверяет что checkIsCustomError возвращает false, если ошибка не соответствует ICustomError', () => {
	const error = {
		field: 'value'
	}

	expect(checkIsCustomError(error)).toBe(false)
})
