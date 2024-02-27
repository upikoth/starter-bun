import { db } from '../../sqlite'
import { files } from '../../sqlite/schema'
import type {
	IMainCreateFileRequest,
	IMainCreateFileResponse
} from '../../models'

export default async function create(
	data: IMainCreateFileRequest
): Promise<IMainCreateFileResponse> {
	const res = await db
		.insert(files)
		.values(data)
		.returning()

	return res[0]
}
