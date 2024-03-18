import getByIdActiveUserSuccessResponse from './get-by-id/response-active-user-success.json'
import getByIdActiveAdminSuccessResponse from './get-by-id/response-active-admin-success.json'
import getByIdActiveSuperAdminSuccessResponse from './get-by-id/response-active-super-admin-success.json'
import getByEmailActiveUserSuccessResponse from './get-by-email/response-active-user-success.json'
import getByEmailBlockedUserSuccessResponse from './get-by-email/response-blocked-user-success.json'

const responses = {
	getById: {
		userActiveSuccess: getByIdActiveUserSuccessResponse,
		adminActiveSuccess: getByIdActiveAdminSuccessResponse,
		superAdminActiveSuccess: getByIdActiveSuperAdminSuccessResponse
	},
	getByEmail: {
		userActiveSuccess: getByEmailActiveUserSuccessResponse,
		userBlockedSuccess: getByEmailBlockedUserSuccessResponse
	}
}

export default {
	responses
}
