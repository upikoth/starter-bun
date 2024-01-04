import { getSuccessResponse } from '@/controller/http.utils'

import { deleteRegistration as deleteRegistrationFromService } from '@/service/registrations'

import type { IDeleteRegistrationRequest } from '@/models'

export default async function deleteRegistration(_: Request, params: Record<string, string>): Promise<Response> {
	const deleteRegistrationRequestData: IDeleteRegistrationRequest = { id: Number.parseInt(params.id || '0') }

	await deleteRegistrationFromService(deleteRegistrationRequestData)

	return getSuccessResponse({})
}
