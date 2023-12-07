import type { IUser } from '@internal/models/users'
import { db } from '@internal/repository/sqlite'

export function getAll(): IUser[] {
	const res = db.query('select * from users').run()

	console.log(res)
	return []
}
