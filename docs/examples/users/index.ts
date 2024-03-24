import getAllUsersSuccessResponse from './get-all/response-success.json'
import getAllSUsersWrongRequest from './get-all/request-wrong.json'

const responses = {
	getAll: {
		success: getAllUsersSuccessResponse
	}
}

const requests = {
	getAll: {
		wrong: getAllSUsersWrongRequest
	}
}

export default {
	responses,
	requests
}
