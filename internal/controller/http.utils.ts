import type { IResposeError } from '@/models'
import { ErorrStatusEnum } from '@/constants'

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
