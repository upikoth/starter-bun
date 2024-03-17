import sessionsGetBySessionSuccessResponse from './sessions/get-by-session/response-success.json'
import sessionsGetAllSessionsSuccessResponse from './sessions/get-all/response-success.json'
import usersCreateSessionSuccessResponse from './sessions/create/response-success.json'
import usersGetByIdActiveUserSuccessResponse from './users/get-by-id/response-active-user-success.json'
import usersGetByIdActiveAdminSuccessResponse from './users/get-by-id/response-active-admin-success.json'
import usersGetByIdActiveSuperAdminSuccessResponse from './users/get-by-id/response-active-super-admin-success.json'
import usersGetByEmailActiveUserSuccessResponse from './users/get-by-email/response-active-user-success.json'
import usersGetByEmailBlockedUserSuccessResponse from './users/get-by-email/response-blocked-user-success.json'

const responses = {
	sessions: {
		getBySession: {
			success: sessionsGetBySessionSuccessResponse
		},
		getAll: {
			success: sessionsGetAllSessionsSuccessResponse
		},
		create: {
			success: usersCreateSessionSuccessResponse
		}
	},
	users: {
		getById: {
			userActiveSuccess: usersGetByIdActiveUserSuccessResponse,
			adminActiveSuccess: usersGetByIdActiveAdminSuccessResponse,
			superAdminActiveSuccess: usersGetByIdActiveSuperAdminSuccessResponse
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
