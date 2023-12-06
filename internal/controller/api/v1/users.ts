import { HttpMethod } from '@internal/controller/http.types'
import { responseNotFound } from '@internal/controller/http.cont'

import { getAll as getAllUsers } from '@internal/service/users';

function getUsers(): Response {
	const users = getAllUsers()

	return Response.json({
		data: {
			users,
		},
		success: true,
	});
}

export default function(req: Request): Response {
	switch (req.method) {
		case HttpMethod.Get: {
			return getUsers()
		}
	}

	return responseNotFound
}
