import type {
	UserRoleEnum
} from '@/models'

import { db } from '../sqlite'
import { users } from '../sqlite/schema'
import type { IDbUser } from '../sqlite/schema'

export default async function create(
	data: {
		email: string;
		role: UserRoleEnum;
		passwordHash: string;
		passwordSalt: string;
	}
): Promise<IDbUser> {
	const res: IDbUser[] = await db
		.insert(users)
		.values(data)
		.returning()

	return res[0]
}
