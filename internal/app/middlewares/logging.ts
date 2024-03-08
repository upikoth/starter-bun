import { logger } from '@/packages'

export default async function logging(req: Request, res: Promise<Response>) {
	const url = new URL(req.url)
	const query = url.search
	const body = await req.clone().text()

	logger.info(`request: ${url.pathname}`, {
		query,
		body
	})

	const response = await res

	let responseJson = { success: true, data: {}, error: {} }

	try {
		responseJson = await response.clone().json()
	} catch {
		// Дополнительная обработка не нужна.
	}

	if (responseJson.success) {
		logger.info(`response: ${url.pathname}`, { responseData: responseJson.data })
	} else {
		logger.error(`response: ${url.pathname}`, responseJson.error)
	}
}
