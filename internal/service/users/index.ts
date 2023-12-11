import { getUsers as getUsersDb } from '@internal/repository/users'

import type { IUser, IGetUsersRequest } from '@internal/models/users'

export function getUsers(data: IGetUsersRequest): Promise<IUser[]> {
	return getUsersDb(data)
}
