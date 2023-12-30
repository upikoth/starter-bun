import type { IResposeError } from '@internal/models'
import { ErorrStatusEnum } from '@internal/constants'

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
