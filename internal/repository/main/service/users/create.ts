import { db } from '../../sqlite'
import { users } from '../../sqlite/schema'
import type {
	IMainUser,
	IMainCreateUserRequest
} from '../../models'

export default async function create(
	data: IMainCreateUserRequest
): Promise<IMainUser> {
	const res: IMainUser[] = await db
		.insert(users)
		.values(data)
		.returning()

	return res[0]
}
