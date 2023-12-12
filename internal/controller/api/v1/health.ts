import { HttpMethod } from '@internal/constants'
import type { ICustomError } from '@internal/models'
import { ErrorCodeEnum, ErorrStatusEnum } from '@internal/constants'

function getHealth(): Response {
	return Response.json({
		data: {},
		success: true
	})
}

export default function(req: Request): Response {
	switch (req.method) {
		case HttpMethod.Get: {
			return getHealth()
		}
	}

	throw {
		code: ErrorCodeEnum.UrlNotFound,
		status: ErorrStatusEnum.NotFound,
		description: 'Метод не найден'
	} satisfies ICustomError
}
