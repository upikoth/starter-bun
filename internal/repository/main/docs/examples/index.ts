import sessionsGetBySessionSuccessResponse from './sessions/get-by-session/response-success.json'
import usersGetByIdActiveUserSuccessResponse from './users/get-by-id/response-active-user-success.json'

const responses = {
	sessions: {
		getBySession: {
			success: sessionsGetBySessionSuccessResponse
		}
	},
	users: {
		getById: {
			userActiveSuccess: usersGetByIdActiveUserSuccessResponse
		}
	}
}

export default {
	responses
}
