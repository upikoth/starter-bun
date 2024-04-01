import { ErrorStatusEnum } from '@/constants'

import type { IResponseError } from '@/models'

export const getSuccessResponse = (data: unknown) => Response.json(
	{
		data,
		success: true
	},
	{ status: 200 }
)

export const getErrorResponse = (error: IResponseError, status: ErrorStatusEnum) => Response.json(
	{
		error,
		data: {},
		success: false
	},
	{ status }
)
