import getCurrentSessionSuccessResponse from './get-current-session/response-success.json'
import getAllSessionsSuccessResponse from './get-all/response-success.json'
import getAllSessionsWrongRequest from './get-all/request-wrong.json'
import createSessionEmailPasswordRequest from './create/request-email-password.json'
import createSessionSuccessResponse from './create/response-success.json'
import createSessionWrongDataResponse from './create/response-wrong-data.json'

const responses = {
	getCurrentSession: {
		success: getCurrentSessionSuccessResponse
	},
	getAll: {
		success: getAllSessionsSuccessResponse
	},
	create: {
		success: createSessionSuccessResponse,
		wrongData: createSessionWrongDataResponse
	}
}

const requests = {
	create: {
		emailPassword: createSessionEmailPasswordRequest
	},
	getAll: {
		wrong: getAllSessionsWrongRequest
	}
}

export default {
	responses,
	requests
}
