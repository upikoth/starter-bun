import getAllUsersSuccessResponse from './get-all/response-success.json'
import getAllSUsersWrongRequest from './get-all/request-wrong.json'
import getByIdActiveUserSuccessResponse from './get-by-id/response-success-user-active.json'
import getByIdActiveAdminSuccessResponse from './get-by-id/response-success-admin-active.json'
import getByIdActiveSuperAdminSuccessResponse from './get-by-id/response-success-super-admin-active.json'

const responses = {
	getAll: {
		success: getAllUsersSuccessResponse
	},
	getById: {
		userActiveSuccess: getByIdActiveUserSuccessResponse,
		adminActiveSuccess: getByIdActiveAdminSuccessResponse,
		superAdminActiveSuccess: getByIdActiveSuperAdminSuccessResponse
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
