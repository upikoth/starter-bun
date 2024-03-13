import defaultSuccessResponse from './default/200.json'
import defaultNotAuthorizedResponse from './default/401.json'
import defaultNotFoundResponse from './default/404.json'
import sessionsGetCurrentSessionSuccessResponse from './sessions/get-current-session/response-success.json'
import sessionsCreateSessionEmailPasswordRequest from './sessions/create/request-email-password.json'
import sessionsCreateSessionSuccessResponse from './sessions/create/response-success.json'
import sessionsCreateSessionWrongDataResponse from './sessions/create/response-wrong-data.json'

const responses = {
	default: {
		success: defaultSuccessResponse,
		notAuthorized: defaultNotAuthorizedResponse,
		notFound: defaultNotFoundResponse
	},
	sessions: {
		getCurrentSession: {
			success: sessionsGetCurrentSessionSuccessResponse
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
		}
	}
}

export default {
	responses,
	requests
}
