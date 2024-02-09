import { db } from '../../sqlite'
import { files } from '../../sqlite/schema'
import type {
	IMainCreateRequest,
	IMainCreateResponse
} from '../../models'

export default async function create(
	data: IMainCreateRequest
): Promise<IMainCreateResponse> {
	const res = await db
		.insert(files)
		.values(data)
		.returning()

	return res[0]
}
