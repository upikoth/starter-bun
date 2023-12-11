import type { IError } from './http.types'
import { ErorrStatusEnum } from './http.types'

import { ErrorCodeEnum } from '@internal/constants'

export const getSuccessResponse = (data: unknown) => Response.json(
	{
		data,
		success: true
	},
	{ status: 200 }
)

export const getErrorResponse = (error: IError, status: ErorrStatusEnum) => Response.json(
	{
		error,
		data: {},
		success: false
	},
	{ status }
)

export const responseNotFound = getErrorResponse(
	{
		code: ErrorCodeEnum.NotFound,
		description: 'Метод не найден'
	},
	ErorrStatusEnum.NotFound
)
