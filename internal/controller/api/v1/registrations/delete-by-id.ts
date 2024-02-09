import { getSuccessResponse } from '@/controller/http.utils'

import service from '@/service'

import type { IDeleteRegistrationRequest } from '@/models'

export default async function deleteById(_: Request, params: Record<string, string>): Promise<Response> {
	const deleteRegistrationRequestData: IDeleteRegistrationRequest = { id: Number.parseInt(params.id || '0') }

	await service.registrations.deletById(deleteRegistrationRequestData.id)

	return getSuccessResponse({})
}
