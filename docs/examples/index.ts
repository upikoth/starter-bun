import defaultSuccessResponse from './default/200.json'
import defaultNotAuthorizedResponse from './default/401.json'
import defaultForbiddenResponse from './default/403.json'
import defaultNotFoundResponse from './default/404.json'
import sessionsGetCurrentSessionSuccessResponse from './sessions/get-current-session/response-success.json'
import sessionsGetAllSessionsSuccessResponse from './sessions/get-all/response-success.json'
import sessionsGetAllSessionsWrongRequest from './sessions/get-all/request-wrong.json'
import sessionsCreateSessionEmailPasswordRequest from './sessions/create/request-email-password.json'
import sessionsCreateSessionSuccessResponse from './sessions/create/response-success.json'
import sessionsCreateSessionWrongDataResponse from './sessions/create/response-wrong-data.json'

const responses = {
	default: {
		success: defaultSuccessResponse,
		notAuthorized: defaultNotAuthorizedResponse,
		forbidden: defaultForbiddenResponse,
		notFound: defaultNotFoundResponse
	},
	sessions: {
		getCurrentSession: {
			success: sessionsGetCurrentSessionSuccessResponse
		},
		getAll: {
			success: sessionsGetAllSessionsSuccessResponse
		},
		create: {
			success: sessionsCreateSessionSuccessResponse,
			wrongData: sessionsCreateSessionWrongDataResponse
		}
	}
}

const requests = {
	sessions: {
		create: {
			emailPassword: sessionsCreateSessionEmailPasswordRequest
		},
		getAll: {
			wrong: sessionsGetAllSessionsWrongRequest
		}
	}
}

export default {
	responses,
	requests
}
