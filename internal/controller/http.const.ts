import { ErorrStatusEnum } from '@internal/constants'

import { ErrorCodeEnum } from '@internal/constants'

interface IResposeError {
	code: ErrorCodeEnum,
	description: string
}


export const getSuccessResponse = (data: unknown) => Response.json(
	{
		data,
		success: true
	},
	{ status: 200 }
)

export const getErrorResponse = (error: IResposeError, status: ErorrStatusEnum) => Response.json(
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
