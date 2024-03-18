import getBySessionSuccessResponse from './get-by-session/response-success.json'
import getByIdSuccessResponse from './get-by-id/response-success.json'
import getAllSessionsSuccessResponse from './get-all/response-success.json'
import createSessionSuccessResponse from './create/response-success.json'

const responses = {
	getBySession: {
		success: getBySessionSuccessResponse
	},
	getById: {
		success: getByIdSuccessResponse
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
