import getBySessionSuccessResponse from './get-by-session/response-success.json'
import getAllSessionsSuccessResponse from './get-all/response-success.json'
import createSessionSuccessResponse from './create/response-success.json'

const responses = {
	getBySession: {
		success: getBySessionSuccessResponse
	},
	getAll: {
		success: getAllSessionsSuccessResponse
	},
	create: {
		success: createSessionSuccessResponse
	}
}

export default {
	responses
}
