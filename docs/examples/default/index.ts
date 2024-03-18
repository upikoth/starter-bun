import successResponse from './200.json'
import notAuthorizedResponse from './401.json'
import forbiddenResponse from './403.json'
import notFoundResponse from './404.json'

const responses = {
	success: successResponse,
	notAuthorized: notAuthorizedResponse,
	forbidden: forbiddenResponse,
	notFound: notFoundResponse
}

export default {
	responses
}
