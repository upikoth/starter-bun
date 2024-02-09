import { db } from '../../sqlite'
import { sessions } from '../../sqlite/schema'
import type {
	IMainSession,
	IMainCreateSessionRequest
} from '../../models'

export default async function create(
	data: IMainCreateSessionRequest
): Promise<IMainSession> {
	const res: IMainSession[] = await db
		.insert(sessions)
		.values(data)
		.returning()

	return res[0]
}
