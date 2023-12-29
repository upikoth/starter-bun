import { ErorrStatusEnum, ErrorCodeEnum } from '@internal/constants'
import { ICustomError } from '@internal/models'

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

export const errorNotFound = {
	code: ErrorCodeEnum.UrlNotFound,
	status: ErorrStatusEnum.NotFound,
	description: 'Метод не найден'
} satisfies ICustomError
