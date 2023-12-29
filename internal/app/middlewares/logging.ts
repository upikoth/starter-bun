
import { logger } from '@internal/packages'

import type { IResponseInfo } from '@internal/models'

export default async function logging(req: Request, res: Promise<IResponseInfo>) {
	const url = new URL(req.url)
	const query = url.search
	const body = await req.clone().text()

	logger.info(`request: ${url.pathname}`, {
		query,
		body
	})

	const responseInfo = await res

	if (responseInfo.error) {
		logger.error(`response: ${url.pathname}`, responseInfo.error)
	} else {
		logger.info(`response: ${url.pathname}`, { responseData: responseInfo.data })
	}
}
