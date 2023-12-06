import { getAll as getAllUsers } from '@internal/repository/users'

import type { IUser } from '@internal/models/users'

export function getAll(): IUser[] {
	return getAllUsers()
}
