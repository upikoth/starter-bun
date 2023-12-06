import { HttpMethod } from '@internal/controller/http.types'
import { responseNotFound } from '@internal/controller/http.cont'

function getHealth(): Response {
	return Response.json({
		data: {},
		success: true,
	});
}

export default function(req: Request): Response {
	switch (req.method) {
		case HttpMethod.Get: {
			return getHealth()
		}
	}

	return responseNotFound
}
