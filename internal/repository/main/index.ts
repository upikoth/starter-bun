import users from './service/users'
import sessions from './service/sessions'
import registrations from './service/registrations'
import files from './service/files'
import { migrateIfNeeded } from './sqlite/index'

export default {
	users,
	sessions,
	registrations,
	files,
	utils: {
		migrateIfNeeded
	}
}
