import defaultSuccessResponse from './default/200.json'
import defaultNotAuthorizedResponse from './default/401.json'
import defaultNotFoundResponse from './default/404.json'
import sessionsGetCurrentSessionSuccessResponse from './sessions/get-current-session/response-success.json'

const responses = {
	default: {
		success: defaultSuccessResponse,
		notAuthorized: defaultNotAuthorizedResponse,
		notFound: defaultNotFoundResponse
	},
	sessions: {
		getCurrentSession: {
			success: sessionsGetCurrentSessionSuccessResponse
		}
	}
}

export default {
	responses
}
