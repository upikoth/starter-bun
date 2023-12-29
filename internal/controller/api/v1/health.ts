import { HttpMethod } from '@internal/constants'
import { errorNotFound } from '@internal/controller/http.const'

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

	throw errorNotFound
}
