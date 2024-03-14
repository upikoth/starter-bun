import sessionsGetBySessionSuccessResponse from './sessions/get-by-session/response-success.json'
import usersCreateSessionSuccessResponse from './sessions/create/response-success.json'
import usersGetByIdActiveUserSuccessResponse from './users/get-by-id/response-active-user-success.json'
import usersGetByEmailActiveUserSuccessResponse from './users/get-by-email/response-active-user-success.json'
import usersGetByEmailBlockedUserSuccessResponse from './users/get-by-email/response-blocked-user-success.json'

const responses = {
	sessions: {
		getBySession: {
			success: sessionsGetBySessionSuccessResponse
		},
		create: {
			success: usersCreateSessionSuccessResponse
		}
	},
	users: {
		getById: {
			userActiveSuccess: usersGetByIdActiveUserSuccessResponse
		},
		getByEmail: {
			userActiveSuccess: usersGetByEmailActiveUserSuccessResponse,
			userBlockedSuccess: usersGetByEmailBlockedUserSuccessResponse
		}
	}
}

export default {
	responses
}
