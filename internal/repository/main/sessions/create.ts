import { db } from '../sqlite'
import { sessions } from '../sqlite/schema'
import type { IDbSession } from '../sqlite/schema'

export default async function create(
	data: { userId: number, session: string }
): Promise<IDbSession> {
	const res: IDbSession[] = await db
		.insert(sessions)
		.values(data)
		.returning()

	return res[0]
}
