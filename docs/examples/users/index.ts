import getAllUsersSuccessResponse from './get-all/response-success.json'
import getAllSUsersWrongRequest from './get-all/request-wrong.json'
import getByIdActiveUserSuccessResponse from './get-by-id/response-success-user-active.json'
import getByIdActiveAdminSuccessResponse from './get-by-id/response-success-admin-active.json'
import getByIdActiveSuperAdminSuccessResponse from './get-by-id/response-success-super-admin-active.json'
import createUserUserAlreadyExistResponse from './create/response-wrong-data-user-exist.json'
import createUserWrongEmailResponse from './create/response-wrong-email.json'
import createUserWrongPasswordResponse from './create/response-wrong-password.json'
import createUserSuccessResponse from './create/response-success.json'
import createUserRequest from './create/request-email-password.json'

const responses = {
	getAll: {
		success: getAllUsersSuccessResponse
	},
	getById: {
		userActiveSuccess: getByIdActiveUserSuccessResponse,
		adminActiveSuccess: getByIdActiveAdminSuccessResponse,
		superAdminActiveSuccess: getByIdActiveSuperAdminSuccessResponse
	},
	create: {
		userAlreadyExist: createUserUserAlreadyExistResponse,
		wrongEmail: createUserWrongEmailResponse,
		wrongPassword: createUserWrongPasswordResponse,
		success: createUserSuccessResponse
	}
}

const requests = {
	getAll: {
		wrong: getAllSUsersWrongRequest
	},
	create: {
		valid: createUserRequest
	}
}

export default {
	responses,
	requests
}
